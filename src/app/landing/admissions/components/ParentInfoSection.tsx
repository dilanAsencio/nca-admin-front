"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputComponent from "@/components/shared/input/InputComponent";
import { AdmissionApplicationFormData } from "./AdmissionApplicationsForm";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import { optDocTypes, optDocTypes2 } from "@/app/core/constants/default-const";

interface ParentInfoSectionProps {
  disabled?: boolean;
}
export default function ParentInfoSection({ disabled = false }: ParentInfoSectionProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AdmissionApplicationFormData>();
  const [relationshipOptions, setRelationshipOptions] = useState<
    { label: string; value: string }[]
  >([
    { label: "Padre", value: "Padre" },
    { label: "Madre", value: "Madre" },
    { label: "Tio", value: "Tio" },
    { label: "Tia", value: "Tia" },
    { label: "Abuelo", value: "Abuelo" },
    { label: "Abuela", value: "Abuela" },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputComponent
        label="Nombre del acudiente"
        placeholder="Nombre"
        name="parent.firstName"
        typeInput="text"
        register={register("parent.firstName")}
        required
        disabled={disabled}
        error={errors.parent?.firstName?.message}
      />

      <InputComponent
        label="Apellidos del acudiente"
        placeholder="Apellidos"
        name="parent.lastName"
        typeInput="text"
        register={register("parent.lastName")}
        required
        disabled={disabled}
        error={errors.parent?.lastName?.message}
      />

      <Controller
        name="parent.relationship"
        control={control}
        render={({ field }) => (
          <DropdownComponent
            name="parent.relationship"
            label="Parentesco"
            className="primary"
            placeholder="Escoger Parentesco"
            options={relationshipOptions}
            onChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
            required
            disabled={disabled}
            error={errors.parent?.relationship?.message}
          />
        )}
      />

      <Controller
        name="parent.documentType"
        control={control}
        render={({ field }) => (
          <DropdownComponent
            name="parent.documentType"
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
            error={errors.parent?.documentType?.message}
          />
        )}
      />

      <InputComponent
        label="Número de documento"
        placeholder="Documento"
        name="parent.documentNumber"
        typeInput="text"
        register={register("parent.documentNumber")}
        required
        disabled={disabled}
        error={errors.parent?.documentNumber?.message}
      />

      <InputComponent
        label="Teléfono"
        placeholder="+57 300 000 0000"
        name="parent.phone"
        typeInput="text"
        register={register("parent.phone")}
        required
        disabled={disabled}
        error={errors.parent?.phone?.message}
      />

      <InputComponent
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        name="parent.email"
        typeInput="email"
        register={register("parent.email")}
        required
        disabled={disabled}
        error={errors.parent?.email?.message}
      />

      {/* Dirección */}
      <InputComponent
        label="Calle / Dirección principal"
        placeholder="Ej: Calle 123 #45-67"
        name="parent.address.street"
        typeInput="text"
        className="capitalize"
        register={register("parent.address.street")}
        required
        disabled={disabled}
        error={errors.parent?.address?.street?.message}
      />

      <InputComponent
        label="Barrio"
        placeholder="Barrio"
        name="parent.address.neighborhood"
        typeInput="text"
        className="capitalize"
        register={register("parent.address.neighborhood")}
        required
        disabled={disabled}
        error={errors.parent?.address?.neighborhood?.message}
      />

      <InputComponent
        label="Ciudad"
        placeholder="Ciudad"
        name="parent.address.city"
        typeInput="text"
        className="capitalize"
        register={register("parent.address.city")}
        required
        disabled={disabled}
        error={errors.parent?.address?.city?.message}
      />

      <InputComponent
        label="Departamento"
        placeholder="Departamento"
        name="parent.address.department"
        typeInput="text"
        className="capitalize"
        register={register("parent.address.department")}
        required
        disabled={disabled}
        error={errors.parent?.address?.department?.message}
      />

      <InputComponent
        label="Código postal"
        placeholder="050021"
        name="parent.address.postalCode"
        typeInput="text"
        register={register("parent.address.postalCode")}
        required
        disabled={disabled}
        error={errors.parent?.address?.postalCode?.message}
      />
    </div>
  );
}
