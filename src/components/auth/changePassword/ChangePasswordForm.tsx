"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ChangeFormData,
  errorMessage,
  passwordRequeriments,
} from "@/types/auth";
import { changePasswordSchema } from "@/types/auth-schemas";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import ErrorAlert from "@/components/ui/ErrorAlert";
import CardMessage from "@/components/auth/CardMessage";
import PasswordInput from "@/components/shared/input/PasswordInput";

import "./style.css";
import PasswordStrengthIndicator from "@/components/shared/input/PasswordStrengthIndicator";
import { authService } from "@/services/auth/auth-services";

const ChangePasswordForm = () => {
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
  } = useForm({ resolver: zodResolver(changePasswordSchema) });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [blockSubmit, setBlockSubmit] = useState(true);
  const [pssRequeriments, setPssRequeriments] = useState(passwordRequeriments);
  const [isValidated, setIsValidated] = useState(false);

  // TODO: Replace with actual token retrieval logic
  const [resetToken, setResetToken] = useState<string>("");
  const onSubmit: SubmitHandler<ChangeFormData> = async (
    data: ChangeFormData
  ) => {
      try {
        // Use password and confirmPassword for newPassword and confirmPassword
        const response = await authService.resetPassword(
          resetToken,
          data.password,
          data.confirmPassword
        );
        if(response.success){
          setShowSuccessMessage(true);
        }
      } catch (error: any) {
  
        setError("password", { type: "controlAccess" });
        setError("confirmPassword", { type: "controlAccess" });
      }
  };

  const mathingPassword = (confirmPassword: string) => {
    const password = getValues("password");
    if (password !== confirmPassword) {
      setBlockSubmit(true);
      setError("password", {
        type: "custom",
        message: errorMessage["matchPassword"],
      });
      setError("confirmPassword", {
        type: "custom",
        message: errorMessage["matchPassword"],
      });
    } else {
      if (isValidated) {
        setBlockSubmit(false);
      }
      clearErrors(["password", "confirmPassword"]);
    }
  };

  const validatePassword = (password: string = "") => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z][a-z]/.test(password);
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
    if (minLength && hasUpperCase && hasNumber && hasSpecialCharacter) {
      setIsValidated(true);
    }
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("reset_token") ||
        new URLSearchParams(window.location.search).get("token") ||
        "";        
      setResetToken(token);
    }
  }, []);

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
        label="¡Su contraseña ha sido reestablecida con exito!!"
        labelButton="Iniciar Sesión"
        path="/login"
      />
    );
  }
  
  return (
    <>
      <div className="container grid gap-[2rem] text-center">
        <img src="/assets/img/logo-nexuscore.png" alt="logo-nexuscore" />
        <h5>Escribe su nueva contraseña.</h5>
      </div>
      <div className="card-content">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[1.5rem]"
        >
          <div className="content-inputs">
            <PasswordInput
              disabled={false}
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
              disabled={false}
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
              className="tertiary w-full"
              blockAccess={blockSubmit}
              type="submit"
              label="Enviar"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordForm;
