"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import { AdmissionApplicationFormData } from "./AdmissionApplicationsForm";
interface Props {
  disabled?: boolean
}
export default function AdditionalInfoSection({disabled = false}: Props) {
  const { control, register, getValues, setValue, formState: { errors } } = useFormContext<AdmissionApplicationFormData>();

  return (
    <div className="flex flex-col gap-4">
      <TextAreaComponent
        label="¿Cómo supo de nosotros?"
        placeholder="Ej: Recomendación, redes sociales..."
        name="howDidYouKnow"
        rows={3}
        required={true}
        register={register("howDidYouKnow")}
        disabled={disabled}
        error={errors.howDidYouKnow?.message}
      />

      <TextAreaComponent
        label="Condiciones especiales"
        placeholder="Ej: Alergias, TDAH, dislexia..."
        name="specialConditions"
        rows={3}
        register={register("specialConditions")}
        disabled={disabled}
        error={errors.specialConditions?.message}
      />

      <TextAreaComponent
        label="Observaciones adicionales"
        placeholder="Comentarios relevantes..."
        name="observations"
        rows={3}
        register={register("observations")}
        disabled={disabled}
        error={errors.observations?.message}
      />

      {/* Checkboxes */}
      <div className="flex flex-col gap-2 mt-4">
        <Controller
          name="saveAsDraft"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxComponent
                {...field}
                checked={getValues("saveAsDraft")}
                disabled={disabled}
                setChecked={() => {
                    setValue("saveAsDraft", !getValues("saveAsDraft"));
                }}
                label="Guardar como borrador"
                error={errors.saveAsDraft?.message}
            />
          )}
        />

        <Controller
          name="acceptTerms"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxComponent
                {...field}
                checked={getValues("acceptTerms")}
                disabled={disabled}
                setChecked={() => {
                    setValue("acceptTerms", !getValues("acceptTerms"));
                }}
                label="Acepto los términos y condiciones"
                error={errors.acceptTerms?.message}
            />
          )}
        />

        <Controller
          name="acceptDataProcessing"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxComponent
                {...field}
                checked={getValues("acceptDataProcessing")}
                disabled={disabled}
                setChecked={() => {
                    setValue("acceptDataProcessing", !getValues("acceptDataProcessing"));
                }}
                label="Autorizo el tratamiento de datos personales"
                error={errors.acceptDataProcessing?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
