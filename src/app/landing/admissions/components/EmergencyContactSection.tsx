"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import InputComponent from "@/components/shared/input/InputComponent";
import { AdmissionApplicationFormData } from "./AdmissionApplicationsForm";

export default function EmergencyContactSection() {
  const { register, formState: { errors } } = useFormContext<AdmissionApplicationFormData>();

  return (
    <div className="grid grid-cols-2 gap-4">
      <InputComponent
        label="Nombre completo"
        placeholder="Nombre del contacto"
        name="emergencyContact.fullName"
        typeInput="text"
        register={register("emergencyContact.fullName")}
        required
        error={errors.emergencyContact?.fullName?.message}
      />

      <InputComponent
        label="Parentesco"
        placeholder="Ej: Tío, Hermano..."
        name="emergencyContact.relationship"
        typeInput="text"
        register={register("emergencyContact.relationship")}
        required
        error={errors.emergencyContact?.relationship?.message}
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
