"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
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
import PasswordStrengthIndicator from "@/components/shared/input/PasswordStrengthIndicator";

import { AppDispatch, publicResetPasswordThunk } from "@/providers/store/public-auth-store";

import "./style.css";

const PublicChangePasswordForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
    watch,
  } = useForm<ChangeFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [blockSubmit, setBlockSubmit] = useState(true);
  const [pssRequeriments, setPssRequeriments] =
    useState(passwordRequeriments);
  const [isValidated, setIsValidated] = useState(false);
  const [resetToken, setResetToken] = useState<string>("");

  // --- Submit con dispatch ---
  const onSubmit: SubmitHandler<ChangeFormData> = async (
    data: ChangeFormData
  ) => {
    const payload = {
      reset_token: resetToken,
      new_password: data.password,
      confirm_password: data.confirmPassword,
    };

    dispatch(publicResetPasswordThunk(payload) as any)
      .unwrap()
      .then((resp: any) => {
        setShowSuccessMessage(true);
      })
      .catch(() => {
        setError("password", {
          type: "manual",
          message: errorMessage["controlAccess"],
        });
        setError("confirmPassword", {
          type: "manual",
          message: errorMessage["controlAccess"],
        });
      }).finally(() => {
      });
  };

  // --- Validación confirmación ---
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

  // --- Validación requisitos ---
  const validatePassword = (password: string = "") => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z][a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%&*.,+-:;]/.test(password);

    pssRequeriments.forEach((req) => {
      if (req.name === "minLength") req.status = minLength;
      if (req.name === "upperCase") req.status = hasUpperCase;
      if (req.name === "number") req.status = hasNumber;
      if (req.name === "specialCharacter") req.status = hasSpecialCharacter;
    });

    setPssRequeriments([...pssRequeriments]);
    if (minLength && hasUpperCase && hasNumber && hasSpecialCharacter) {
      setIsValidated(true);
    }
  };

  // --- Recuperar token ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = new URLSearchParams(window.location.search).get("token") || "";
      setResetToken(token);
    }
  }, []);

  // --- Validaciones dinámicas ---
  useEffect(() => {
    const password = watch("password");
    validatePassword(password);
  }, [watch("password")]);

  useEffect(() => {
    const confirmPassword = watch("confirmPassword");
    mathingPassword(confirmPassword);
  }, [watch("confirmPassword")]);

  // --- Mensaje de éxito ---
  if (showSuccessMessage) {
    return (
      <CardMessage
        label="¡Su cuenta ha sido verificada y su contraseña establecida con éxito!"
        labelButton="Iniciar Sesión"
        path="/landing"
      />
    );
  }

  return (
    <>
      <div className="container grid gap-[2rem] text-center">
        <img src="/assets/img/logo-nexuscore.png" alt="logo-nexuscore" />
        <h5>Escriba su nueva contraseña.</h5>
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
              className={`form-control form-group pass ${
                errors.password ? "is-invalid" : ""
              }`}
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
              placeholder="Confirm Password"
              name="confirmPassword"
              className={`form-control form-group pass ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
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

export default PublicChangePasswordForm;
