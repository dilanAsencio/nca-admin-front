import React from "react";
import { useFormContext } from "react-hook-form";
import InputComponent from "@/components/shared/input/InputComponent";
import InputDateComponent from "@/components/shared/input/InputDateComponent";
import { AdmissionApplicationFormData } from "./AdmissionApplicationsForm";

export default function AspirantInfoSection() {
  const { register, control, formState: { errors } } = useFormContext<AdmissionApplicationFormData>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <InputComponent
        label="Nombre"
        placeholder="Nombre del aspirante"
        name="aspirant.firstName"
        typeInput="text"
        register={register("aspirant.firstName")}
        required
        error={errors.aspirant?.firstName?.message}
      />

      <InputComponent
        label="Apellidos"
        placeholder="Apellidos del aspirante"
        name="aspirant.lastName"
        typeInput="text"
        register={register("aspirant.lastName")}
        required
        error={errors.aspirant?.lastName?.message}
      />

      <InputDateComponent
        label="Fecha de nacimiento"
        name="aspirant.dateOfBirth"
        viweType="date"
        control={control}
        required
        error={errors.aspirant?.dateOfBirth?.message}
      />
    </div>
  );
}
