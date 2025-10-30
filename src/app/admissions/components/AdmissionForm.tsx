"use client";

import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { AdmissionProcessFormData } from "./ModalAdmissionProcess";
import RequiredDocumentsField from "./RequiredDocumentsField";
import SelectCampusAndGrades from "./SelectCampusAndGrade";
import CheckboxGroup from "./CheckboxGroup";
import InputComponent from "@/components/shared/input/InputComponent";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import InputDateComponent from "@/components/shared/input/InputDateComponent";
import clsx from "clsx";
import style from "@/app/font.module.css";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import FormDebug from "@/components/shared/form/FormDebug";
import { useEffect } from "react";

interface Props {
  onSubmit: (data: any) => void;
  currentData?: any;
  isReadOnly: boolean;
  isEdit: boolean;
}

export default function AdmissionForm({ onSubmit, currentData, isReadOnly, isEdit }: Props) {
  const {
    register,
    setValue,
    setError,
    control,
    getValues,
    formState: { errors },
  } = useFormContext<AdmissionProcessFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requiredDocuments",
  });

  const onSubmitForm = (data: any) => {
    // e.preventDefault();
    console.log("SEND DATATA", data);
    
  };

  return (
    <form
      onSubmit={onSubmit}
      className={clsx("space-y-6", style["font-outfit"])}
    >
      {/* Básicos */}
      <div className="grid grid-cols-3 gap-2">
        <InputComponent
          label="Nombre"
          placeholder="Nombre proceso de admision"
          name="name"
          className="capitalize"
          typeInput="text"
          disabled={isReadOnly}
          register={register("name")}
          required
          error={errors.name && errors.name.message}
        />

        <InputComponent
          typeInput="number"
          label="Año académico"
          placeholder="El año académico debe ser mayor o igual al año actual"
          className="text-right"
          name="academicYear"
          disabled={isReadOnly}
          register={register("academicYear", {
            valueAsNumber: true,
            onChange: (e) => {
              const currentYear = new Date().getFullYear();
              const value = e.target.value;
              if (value <= currentYear) {
                setValue("academicYear", currentYear);
                setError("academicYear", {
                  type: "manual",
                  message:
                    "El año académico debe ser mayor o igual al año actual",
                });
              } else {
                setValue("academicYear", value);
                setError("academicYear", { type: "manual", message: "" });
              }
            },
          })}
          required
          error={errors.academicYear && errors.academicYear.message}
        />
        <InputComponent
          typeInput="number"
          label="Máximo de postulaciones"
          placeholder="El numero de postulaciones debe ser mayor a 0"
          className="text-right"
          name="maxApplications"
          disabled={isReadOnly}
          register={register("maxApplications", {
            valueAsNumber: true,
            onChange: (e) => {
              const value = e.target.value;
              if (value === 0) {
                setError("maxApplications", {
                  type: "manual",
                  message:
                    "El número de postulaciones debe ser mayor a 0",
                });
              } else {
                setValue("maxApplications", value);
                setError("maxApplications", { type: "manual", message: "" });
              }
            },
          })}
          required
          error={errors.maxApplications && errors.maxApplications.message}
        />
      </div>

      <div className="basis-[100%]">
        <TextAreaComponent
          name="description"
          rows={3}
          disabled={isReadOnly}
          placeholder="Descripción"
          label="Descripción"
          register={register("description")}
          required
          error={errors.description && errors.description.message}
        />
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-2">
        <InputDateComponent
          label="Fecha de inicio"
          viweType="date"
          required
          disabled={isReadOnly}
          name="startDate"
          control={control}
          error={errors.startDate && errors.startDate.message}
        />

        <InputDateComponent
          label="Fecha de cierre"
          viweType="date"
          control={control}
          disabled={isReadOnly}
          required
          name="endDate"
          error={errors.endDate && errors.endDate.message}
        />
      </div>

      {/* Selección de campus y grados */}
      <SelectCampusAndGrades
        currentData={currentData}
        isReadOnly={isReadOnly}
      />
      <hr className="m-0" />
      {/* Documentos requeridos */}
      <RequiredDocumentsField isReadonly={isReadOnly} fields={fields} append={append} remove={remove} />

      <hr className="mb-[0.5rem]" />
      {/* <FormDebug errors={errors} /> */}
      {/* Checkboxes */}
      <CheckboxGroup isReadOnly={isReadOnly} />

      {/* Envío */}
      <div className="flex justify-end">
        <ButtonComponent
            className="primary"
            type="submit"
            blockAccess={isReadOnly}
            onClick={() => {onSubmitForm(getValues())}}
            label={isEdit ? "Actualizar proceso" : "Crear proceso"}
        />
      </div>
    </form>
  );
}
