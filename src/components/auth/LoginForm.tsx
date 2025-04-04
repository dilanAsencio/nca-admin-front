"use client";

import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "@/providers/store";
import ReCAPTCHA from "react-google-recaptcha";

import { authService } from "@/services/auth-services";
import { useRouter } from "next/navigation";
import { LoginFormData, errorMessage } from "@/types/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import showToast from "@/utils/toast";
import Captcha from "./captcha";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>();
  const dispatch = useDispatch();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showPss, setShowPss] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (e) {
      setIsVerified(false);
    }
  }
  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };
  function handleExpired() {
    setIsVerified(false);
  }

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setValue("username", savedUsername);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData
  ) => {
    showToast(data.username, "info");

    if (showCaptcha && !captchaValue) {
      showToast("Por favor completa el reCAPTCHA", "info");
      return;
    }

    try {
      const user = await authService.login(data.username, data.password);
      dispatch(login(user)); // Dispatch del login
      if (rememberMe) {
        localStorage.setItem("username", data.username);
      } else {
        localStorage.removeItem("username");
      }
      router.push("/dashboard");
    } catch (error: unknown) {
      const errorAsError = error as Error;
      setFailedAttempts((prev) => prev + 1);
      if (failedAttempts + 1 >= 2) {
        setShowCaptcha(true); // Habilitar reCAPTCHA después de 2 intentos fallidos
      }
      showToast("Error de autenticación: " + errorAsError.message, "error"); // Muestra el mensaje de error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-1">
      <div className="input-group mb-3">
        <input
          placeholder="Username"
          type="text"
          className={`px-[0.7rem] py-[0.5rem] w-[100%] ${errors.username ? "is-invalid" : ""} border-[#c6b4b4] border-1 rounded-[28px]`}
          {...register("username", { required: true, minLength: 5 })}
        />
        {errors.username && (
          <div className="invalid-feedback">
            {errorMessage[errors.username?.type.toString()]}
          </div>
        )}
      </div>

      <div className="input-group mb-3">
        <input
          type={`${!showPss ? "password" : "text"}`}
          style={{
            width: "70%",
            border: "1px solid #c6b4b4",
            borderTopLeftRadius: "28px",
            borderBottomLeftRadius: "28px",
            borderRight: "none",
          }}
          placeholder="Password"
          aria-describedby="button-addon2"
          className={`form-control ${errors.password ? "is-invalid" : ""} `}
          {...register("password", {
            required: "Password is required!",
            minLength: 5,
          })}
        />
        <button
          className="btn form-control"
          style={{
            border: "1px solid rgba(198, 180, 180, 1)",
            borderTopRightRadius: "28px",
            borderBottomRightRadius: "28px",
            borderLeft: "none",
            color: "rgba(69, 26, 26, 1)",
          }}
          onClick={() => setShowPss(!showPss)}
          type="button"
          id="button-addon2"
        >
          {!showPss ? (
            <FontAwesomeIcon icon={faEye} />
          ) : (
            <FontAwesomeIcon icon={faEyeSlash} />
          )}
        </button>
        {errors.password && (
          <div className="invalid-feedback">
            {errorMessage[errors.password?.type.toString()]}
          </div>
        )}
      </div>

      <div className="mb-3">
        <button
          type="submit"
          className="mt-3 text-white w-full rounded-[28px_!important] bg-[#eb3751] drop-shadow-[0_4px_15px_0_rgba(235,55,81,0.3)] py-[12px] px-[44px]"
        >
          ingresar
        </button>
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="rememberMe"
          className="form-check-input"
          id="rememberMe"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label className="form-check-label" htmlFor="rememberMe">
          Recordar usuario
        </label>
      </div>

      {showCaptcha && (
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          ref={recaptchaRef}
          onChange={handleChange}
          onExpired={handleExpired}
        />
      )}
    </form>
  );
};

export default LoginForm;
