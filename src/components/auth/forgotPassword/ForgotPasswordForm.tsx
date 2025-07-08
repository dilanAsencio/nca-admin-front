"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "@/services/auth-services";
import { forgotPasswordFormData } from "@/types/auth";
import { forgotPasswordSchema } from "@/types/auth-schemas";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import ErrorAlert from "@/components/ui/ErrorAlert";
import CardMessage from "@/components/auth/CardMessage";

import "./style.css";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    getValues,
    clearErrors,
  } = useForm({resolver: zodResolver(forgotPasswordSchema)});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // TODO: Replace with actual token retrieval logic
  const resetToken = localStorage.getItem("auth_token") || "";
  const onSubmit: SubmitHandler<forgotPasswordFormData> = async (
    data: forgotPasswordFormData
  ) => {
    try {
      // Use password and password2 for newPassword and confirmPassword
      const response = await authService.forgotPassword(data.email, resetToken);
      if (response.success) {
        setShowSuccessMessage(true);
      }
    } catch (error: any) {
      
    }
  };

  // --- Aquí el render condicional ---
  if (showSuccessMessage) {
    return (
      <CardMessage
        label="¡Enviamos un enlace al email que ingresaste para solicitar el cambio de contraseña!"
        labelButton="Regresar"
        path="/login"
      />
    );
  }

  return (
    <>
      <div className="container grid gap-[2rem] text-center">
        <img src="/assets/img/logo-nexuscore.png" alt="logo-nexuscore" />
        <h5>Escribe el correo para hacer el cambio de contraseña.</h5>
      </div>
      <div className="card-content">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[1.5rem]"
        >
          <div className="content-inputs">
            <InputComponent
              placeholder="Email"
              name="email"
              typeInput="text"
              className={`form-control inputs-form`}
              register={register("email")}
            />
            {errors.email && (
              <ErrorAlert>
                {errors.email.message}
              </ErrorAlert>
            )}
          </div>

          <div className="flex flex-col items-center gap-[1rem]">
            <ButtonComponent 
              className="tertiary w-full" type="submit" label="Enviar" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
