"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import {
  publicRegisterThunk,
  AppDispatch,
} from "@/providers/store/public-auth-store";
import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CardMessage from "@/app/core/auth/CardMessage";
import { showToast } from "@/utils/alerts";
import { useSearchParams } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { preRegister } from "@/app/core/interfaces/public/register-interfaces";
import { PreRegisterType, PreResgisterSchema } from "@/app/core/schemas/landing/register-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "@/components/shared/input/InputComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";


export default function PublicRegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const campusId = searchParams.get('campusId') || '';

  const methods = useForm<PreRegisterType>({
    resolver: zodResolver(PreResgisterSchema),
  });
  const { control, register, getValues, handleSubmit, formState: { errors } } = methods;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkPolicy, setCheckPolicy] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);


  const onSubmit = async (data: preRegister) => {
    setIsLoading(true);
    const payload = {
      username: data.username,
      firstName: data.firstName,
      first_name: data.firstName,
      last_name: data.lastName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: "aa123456!!qawfsaaa",
      passwordConfirmation: "aa123456!!qawfsaaa",
      campusId: campusId
    };

    dispatch(publicRegisterThunk(payload) as any)
      .unwrap()
      .then((resp: any) => {
        setShowSuccessMessage(true);
        methods.reset();
      })
      .catch((error: any) => {        
        showToast(`Error al registrar el usuario: ${error.error.message || ""}` , "error");
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  const isValidForm = () => {
    const values = getValues();
    return (
      values.username !== "" &&
      values.firstName !== "" &&
      values.lastName !== "" &&
      values.email !== "" &&
      values.phone !== ""
    );
  }

  if (showSuccessMessage) {
    return (
      <CardMessage
        label="¡Registro exitoso, tu cuenta está en proceso de validación y sera informado por correo!"
        labelButton="Página de inicio"
        path="/landing"
      />
    );
  }

  return (
    <div className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <Link
        href="/landing"
        className="absolute top-4 left-4 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 text-gray-700" />
      </Link>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/img/logo-nexuscore.png"
            alt="logo-nexuscore"
            className="h-10 sm:h-12"
          />
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <InputComponent
              label="Nombres"
              placeholder="Nombres"
              name="firstName"
              typeInput="text"
              register={register("firstName")}
              required
              disabled={isLoading}
              error={errors?.firstName?.message}
            />

            <InputComponent
              label="Apellidos"
              placeholder="Apellidos"
              name="lastName"
              typeInput="text"
              register={register("lastName")}
              required
              disabled={isLoading}
              error={errors?.lastName?.message}
            />

            <InputComponent
              label="Correo electrónico"
              placeholder="Correo electrónico"
              name="email"
              typeInput="email"
              register={register("email")}
              required
              disabled={isLoading}
              error={errors?.email?.message}
            />

            <InputComponent
              label="Teléfono"
              placeholder="Teléfono"
              name="phone"
              typeInput="tel"
              register={register("phone")}
              required
              disabled={isLoading}
              error={errors?.phone?.message}
            />

            <InputComponent
              label="Usuario"
              placeholder="Nombre de usuario"
              name="username"
              typeInput="text"
              register={register("username")}
              required
              disabled={isLoading}
              error={errors?.username?.message}
            />

            {/* Botón + Política */}
            <div className="flex flex-col items-center gap-2 sm:col-span-2 mt-4">
              <ButtonComponent
                type="submit"
                label={isLoading ? "Registrando..." : "Registrarse"}
                blockAccess={checkPolicy || !isValidForm() }
                className="primary w-full"
              />

              <div className="flex items-center gap-2 text-sm">
                <Controller
                  name="acceptedPolicy"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <CheckBoxComponent
                        {...field}
                        checked={checkPolicy}
                        disabled={isLoading}
                        onChange={(e) => {
                            setCheckPolicy(e.target.checked);
                            methods.setValue("acceptedPolicy", e.target.checked);
                        }}
                        label="Aceptar política y tratamiento de datos"
                        error={errors?.acceptedPolicy?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* Google & Facebook */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:col-span-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faGoogle} size="lg" /> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  size="lg"
                  style={{ color: "#1877F2" }}
                />
                Facebook
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
