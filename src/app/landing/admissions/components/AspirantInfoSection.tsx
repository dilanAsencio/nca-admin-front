import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputComponent from "@/components/shared/input/InputComponent";
import InputDateComponent from "@/components/shared/input/InputDateComponent";
import { AdmissionApplicationFormData } from "./AdmissionApplicationsForm";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import { optDocTypes } from "@/app/core/constants/default-const";

interface Props {
  disabled?: boolean;
}

export default function AspirantInfoSection({ disabled = false }: Props) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AdmissionApplicationFormData>();
  const genderOptions = [
    { label: "Masculino", value: "MALE" },
    { label: "Femenino", value: "FEMALE" },
    { label: "Otro", value: "OTHER" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputComponent
        label="Nombre"
        placeholder="Nombre del aspirante"
        name="aspirant.firstName"
        typeInput="text"
        register={register("aspirant.firstName")}
        required
        disabled={disabled}
        error={errors.aspirant?.firstName?.message}
      />

      <InputComponent
        label="Apellidos"
        placeholder="Apellidos del aspirante"
        name="aspirant.lastName"
        typeInput="text"
        register={register("aspirant.lastName")}
        required
        disabled={disabled}
        error={errors.aspirant?.lastName?.message}
      />

      <InputDateComponent
        label="Fecha de nacimiento"
        name="aspirant.dateOfBirth"
        viweType="date"
        control={control}
        required
        disabled={disabled}
        error={errors.aspirant?.dateOfBirth?.message}
      />

      <Controller
        name="aspirant.documentType"
        control={control}
        render={({ field }) => (
          <DropdownComponent
            name="aspirant.documentType"
            label="Tipo de documento"
            className="primary"
            placeholder="Escoger documento"
            options={optDocTypes}
            onChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
            required
            disabled={disabled}
            error={errors.aspirant?.documentType?.message}
          />
        )}
      />

      <InputComponent
        label="Número de documento"
        placeholder="Documento"
        name="aspirant.documentNumber"
        typeInput="text"
        register={register("aspirant.documentNumber")}
        required
        disabled={disabled}
        error={errors.aspirant?.documentNumber?.message}
      />

      <Controller
        name="aspirant.gender"
        control={control}
        render={({ field }) => (
          <DropdownComponent
            name="aspirant.gender"
            label="Genero"
            className="primary"
            placeholder="Escoger Genero"
            options={genderOptions}
            onChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
            required
            disabled={disabled}
            error={errors.aspirant?.gender?.message}
          />
        )}
      />
    </div>
  );
}
