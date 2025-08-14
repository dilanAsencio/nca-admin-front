"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { AppDispatch, loginThunk } from "@/providers/store";

import { LoginFormData, errorMessage } from "@/types/auth";
import { loginSchema } from "@/types/auth-schemas";
import showToast from "@/utils/toast";

import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import ErrorAlert from "@/components/ui/ErrorAlert";
import PasswordInput from "@/components/shared/input/PasswordInput";
import AuthButton from "@/components/shared/button/AuthButton";

import "./style.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    getValues,
    clearErrors,
  } = useForm({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [rememberMe, setRememberMe] = useState(false);
  const [blockAccess, setBlockAccess] = useState(false);
  const [trys, setTrys] = useState(3);
  const [failedTry, setFailedTry] = useState(trys);
  const [showTry, setShowTry] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    const payload = {
      username: data.username,
      password: data.password,
      rememberMe: rememberMe,
    };
    dispatch(loginThunk(payload))
      .unwrap()
      .then((resp: any) => {
        localStorage.setItem("username", data.username);

        if (resp?.status === 202) {
          showToast(resp?.message, "info");
          setValue("password", "");
        }
        
        if (localStorage.getItem("first_login") !== "true") {
          router.push('/');
        }else{
          router.push('/reset-password');
        }
        setLoading(false);
      })
      .catch((error) => {
        setShowTry(true);
        setFailedTry((prev) => {
          if (prev === 1) {
            setBlockAccess(true);
            setError("username", {
              type: "manual",
              message: errorMessage["blockedUsername"],
            });
            setError("password", {
              type: "manual",
              message: errorMessage["blockedPassword"],
            });
          }
          return prev === 0 ? 0 : prev - 1;
        });
        const errorCode = error?.code || error?.error?.code;
        if (!error.success) {
          if (errorCode === "ACCOUNT_LOCKED") {
            setBlockAccess(true);
            setFailedTry(0);
            setError("username", {
              type: "manual",
              message: errorMessage["blockedUsername"],
            });
            setError("password", {
              type: "manual",
              message: errorMessage["blockedPassword"],
            });
          } else if (errorCode === "INVALID_CREDENTIALS") {            
            setError("username", {
              type: "manual",
              message: errorMessage["controlAccess"],
            });
            setError("password", {
              type: "manual",
              message: errorMessage["controlAccess"],
            });
          }
        }
      });
  };

  const getLabelTry = () => {
    return failedTry < 1 || blockAccess
      ? `3 intentos fallidos. esperar 15min para volver intentarlo`
      : `Intento fallido, quedan ${failedTry}/${trys} intentos`;
  };
  // const useLocalStorage = (key: string, initialValue: string): any => {
  //   const [value, setValu] = useState(initialValue);

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const saved = localStorage.getItem(key);
  //       if (saved) {
  //         setValue("username", saved);
  //         setValu(saved);
  //         setRememberMe(true);
  //       }
  //     }
  //   }, [key]);
  //   return [value, setValu];
  // };
  // const [savedUsername, setSavedUsername] = useLocalStorage("username", "");

  useEffect(() => {
    if(rememberMe){
      localStorage.setItem("username", getValues("username"));
    }
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setValue("username", savedUsername);
      setRememberMe(true);
    } else {
      setValue("username", "");
      localStorage.removeItem("username");
    }
  }, [getValues("username")]);

  return (
    <>
      <div className="container grid gap-[2rem] text-center">
        <img src="/assets/img/logo-nexuscore.png" alt="logo-nexuscore" />
        <p className="text-[1rem] font-normal">Iniciar sesión</p>
      </div>
      <div className="card-content">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[1.5rem]"
      >
        <div className="content-inputs">
          <InputComponent
            placeholder="Username"
            name="username"
            typeInput="text"
            disabled={blockAccess}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            register={register("username")}
          />
          {errors.username && (
            <ErrorAlert>{errors.username.message}</ErrorAlert>
          )}
        </div>

        <div className="content-inputs">
          <PasswordInput
            disabled={blockAccess}
            placeholder="Password"
            name="password"
            className={`form-control form-group pass ${errors.password ? "is-invalid" : ""}`}
            register={register("password")}
          />
          {errors.password && (
            <ErrorAlert>{errors.password.message}</ErrorAlert>
          )}
        </div>

        <div className="flex flex-col items-center gap-[1rem]">
          <AuthButton
            className="tertiary w-full"
            blockAccess={blockAccess}
            type="submit"
            label="Ingresar"
          />
          
          {/* texto de intentos */}
          {showTry && 
            <ErrorAlert>{getLabelTry()}</ErrorAlert>
          }
          <div className="form-check self-center">
            <CheckBoxComponent
              name="rememberMe"
              checked={rememberMe}
              setChecked={() => setRememberMe(!rememberMe)}
              label="Recordar usuario"
            />
          </div>
          <p className="text-center">
            Olvidaste tu contraseña? Recupérala{" "}
            <a href="/forgot-password" className="linked-forgotpass">
              aquí
            </a>
          </p>
        </div>
      </form></div>
    </>
  );
};

export default LoginForm;
