"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserRegular, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { publicLoginThunk, AppDispatch } from "@/providers/store/public-auth-store";
import * as alerts from "@/utils/alerts";
import { useLanding } from "@/providers/landing-context";

interface LoginFormData {
  username: string;
  password: string;
}

interface PublicLoginFormProps {
  onClose: () => void;
}

const errorMessage = {
  blockedUsername: "Tu cuenta ha sido bloqueada",
  blockedPassword: "Demasiados intentos fallidos",
  controlAccess: "Usuario o contraseña incorrectos",
};

export default function PublicLoginForm({ onClose }: PublicLoginFormProps) {
  const router = useRouter();
  const { handleMenu } = useLanding();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = alerts.showToast;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const payload = {
      username: data.username,
      password: data.password,
      rememberMe: false,
    };

    dispatch(publicLoginThunk(payload) as any)
      .unwrap()
      .then((resp: any) => {
        localStorage.setItem("username", data.username);
        showToast(resp?.message, "info");
        reset()
        onClose();
        router.push("/landing");
        handleMenu("home");
      })
      .catch(() => {
        setError("username", {
          type: "manual",
          message: errorMessage["controlAccess"],
        });
        setError("password", {
          type: "manual",
          message: errorMessage["controlAccess"],
        });
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-[320px] sm:w-[360px]">
      <h3 className="text-center font-semibold text-lg mb-6">
        <FontAwesomeIcon icon={faUserRegular} className="mr-1"/>
        Iniciar sesión
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/* Username */}
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "El username es requerido" })}
            className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            className={`w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} className="w-4 h-4" />
            ) : (
              <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-custom transition-colors py-2 w-full bg-gray-300 hover:bg-gray-400 text-white font-medium mb-3"
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>

        {/* <button
          type="button"
          onClick={() => {
            onClose();
            router.push("/auth/register");
          }}
          className="btn-custom transition-colors py-2 w-full border-2 border-red-500 hover:bg-red-50 font-medium mb-2"
        >
          Registrarte
        </button> */}

        {/* Recuperar contraseña */}
        <div className="text-center text-sm text-black">
          ¿Olvidaste tu contraseña?{" "}
          <br />
          Recupérala{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/forgot-password");
            }}
            className="text-red-500 underline"
          >
            aquí
          </button>
        </div>
      </form>
    </div>
  );
}
