"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputComponent from "@/components/shared/input/InputComponent";
import { AdmissionApplicationFormData } from "./AdmissionApplicationsForm";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";

export default function EmergencyContactSection() {
  const { register, control, formState: { errors } } = useFormContext<AdmissionApplicationFormData>();
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
        label="Nombre completo"
        placeholder="Nombre del contacto"
        name="emergencyContact.fullName"
        className="capitalize"
        typeInput="text"
        register={register("emergencyContact.fullName")}
        required
        error={errors.emergencyContact?.fullName?.message}
      />

      <Controller
        name="emergencyContact.relationship"
        control={control}
        render={({ field }) => (
          <DropdownComponent
            name="emergencyContact.relationship"
            label="Parentesco"
            className="primary"
            placeholder="Escoger Parentesco"
            options={relationshipOptions}
            onChange={(value) => {field.onChange(value)}}
            value={field.value}
            required
            error={errors.emergencyContact?.relationship?.message}
          />
        )}
      />

      <InputComponent
        label="Teléfono"
        placeholder="+57 300 000 0000"
        name="emergencyContact.phone"
        typeInput="text"
        register={register("emergencyContact.phone")}
        required
        error={errors.emergencyContact?.phone?.message}
      />
    </div>
  );
}
