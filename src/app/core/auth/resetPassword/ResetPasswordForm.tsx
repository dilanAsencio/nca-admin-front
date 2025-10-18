"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "@/services/auth/auth-services";
import { errorMessage, passwordRequeriments, ResetFormData } from "@/app/core/interfaces/auth-interfaces";
import { resetPasswordSchema } from "@/app/core/schemas/auth-schemas";
import { useUI } from "@/providers/ui-context";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import ErrorAlert from "@/components/ui/ErrorAlert";
import PasswordInput from "@/components/shared/input/PasswordInput";
import PasswordStrengthIndicator from "@/components/shared/input/PasswordStrengthIndicator";
import CardMessage from "@/app/core/auth/CardMessage";

import "./style.css";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    getValues,
    clearErrors,
    watch,
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });
  const [blockSubmit, setBlockSubmit] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pssRequeriments, setPssRequeriments] = useState(passwordRequeriments);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { toggleCardMessage } = useUI();

  const onSubmit = async (data: ResetFormData) => {
    setLoading(true);
    try {
      const response = await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword:data.password,
        confirmPassword: data.confirmPassword}
      );
      if(response.success){
        setShowSuccessMessage(true);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("first_login");
        document.cookie =
          "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "first_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    } catch (error: any) {

      setError("password", { type: "controlAccess" });
      setError("confirmPassword", { type: "controlAccess" });
    }
  };
  const validatePassword = (password: string = "") => {
    const minLength = password.length >= 8;
    const hasUpperCase = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%&*.,+-:;]/.test(password);

    pssRequeriments.map((requeriment) => {
      if (requeriment.name === "minLength") {
        requeriment.status = minLength;
      }
      if (requeriment.name === "upperCase") {
        requeriment.status = hasUpperCase;
      }
      if (requeriment.name === "number") {
        requeriment.status = hasNumber;
      }
      if (requeriment.name === "specialCharacter") {
        requeriment.status = hasSpecialCharacter;
      }
    });
    setPssRequeriments([...pssRequeriments]);
  };

  const mathingPassword = (confirmPassword: string) => {
    const password = getValues("password");
    if (password !== confirmPassword) {
      setBlockSubmit(true);
      setError("password", {
        type: "manual",
        message: errorMessage["matchPassword"],
      });
      setError("confirmPassword", {
        type: "manual",
        message: errorMessage["matchPassword"],
      });
    } else {
      errors.password = undefined;
      errors.confirmPassword = undefined;
      const requeriments = pssRequeriments.find((item) => {
        return item.status === false;
      });

      if (requeriments !== undefined) {
        setBlockSubmit(true);
      } else {
        setBlockSubmit(false);
      }
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setValue("username", savedUsername);
      setRememberMe(true);
    } else {
      setValue("username", "");
      localStorage.removeItem("username");
    }
  }, [setValue]);

  useEffect(() => {
    if (showSuccessMessage) {
      toggleCardMessage();
    }
  }, [showSuccessMessage]);

  useEffect(() => {
    const password = watch("password");
    validatePassword(password);
  }, [watch("password")]);
  
  useEffect(() => {
    const confirmPassword = watch("confirmPassword");
    mathingPassword(confirmPassword);
  }, [watch("confirmPassword")]);

  // --- Aquí el render condicional ---
  if (showSuccessMessage) {
    return (
      <CardMessage
        label="¡Creación de usuario y cambio de contraseña exitoso!"
        subLabel="Ya puedes inicar sesión"
        labelButton="Iniciar sesión"
        path="/login"
      />
    );
  }

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
            disabled={true}
            className={`form-control inputs-form disabled`}
            register={register("username")}
          />
          {errors.username && (
            <ErrorAlert>{errors.username.message}</ErrorAlert>
          )}
        </div>
          
        <div className="content-inputs">
          <PasswordInput
            placeholder="Password"
            name="currentPassword"
            className={`form-control form-group pass ${errors.currentPassword ? "is-invalid" : ""}`}
            register={register("currentPassword")}
          />
          {errors.currentPassword ? (
            <ErrorAlert>{errors.currentPassword.message}</ErrorAlert>
          ) : (
            blockSubmit && (
              <p className="m-0 font-normal text-[0.875rem]">
                Escriba la contraseña temporal con la cual ingresó!
              </p>
            )
          )}
        </div>

        <div className="content-inputs">
          <PasswordInput
            placeholder="Password"
            name="password"
            className={`form-control form-group pass ${errors.password ? "is-invalid" : ""}`}
            register={register("password")}
          />
          {errors.password ? (
            <ErrorAlert>{errors.password.message}</ErrorAlert>
          ) : (
            blockSubmit && (
              <p className="m-0 font-normal text-[0.875rem]">
                Escriba su nueva contraseña!
              </p>
            )
          )}
        </div>

        <div className="content-inputs">
          <PasswordInput
            placeholder="Password"
            name="confirmPassword"
            className={`form-control form-group pass ${errors.confirmPassword ? "is-invalid" : ""}`}
            register={register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <ErrorAlert>{errors.confirmPassword.message}</ErrorAlert>
          ) : (
            blockSubmit && (
              <p className="m-0 font-normal text-[0.875rem]">
                Vuelva a escribir su nueva contraseña!
              </p>
            )
          )}
        </div>

        <PasswordStrengthIndicator password={getValues("password") || ""} />

        <div className="flex flex-col items-center gap-[1rem]">
          <ButtonComponent 
              className="primary w-full" type="submit" label="Ingresar" />
          <div className="form-check self-center">
            <CheckBoxComponent
              name="rememberMe"
              checked={rememberMe}
              onChange={() =>  setRememberMe(prev => !prev)}
              label="Recordar usuario"
            />
          </div>
          <p className="text-center">
            Olvidaste tu contraseña? Recupérala{" "}
            <a href="#" className="linked-forgotpass">
              aquí
            </a>
          </p>
        </div>
      </form></div>
    </>
  );
};

export default ResetPasswordForm;
