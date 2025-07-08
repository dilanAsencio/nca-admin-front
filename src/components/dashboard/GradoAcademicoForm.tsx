"use client";

import React, { useState } from "react";
import { useUI } from "@/providers/ui-context";
import InputComponent from "../shared/input/InputComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gradoAcademicoShema } from "@/types/forms-academic-shemas";
import { formatCurrency, unformatCurrency } from "@/utils/format-number";
import ErrorAlert from "../ui/ErrorAlert";
import ButtonComponent from "../shared/button/ButtonComponent";

const GradoAcademicoForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm({ resolver: zodResolver(gradoAcademicoShema) });
  const { toggleModalGrado } = useUI();
  const [blockForm, setBlockForm] = useState(true);

  const onSubmit = (data: any) => {
    toggleModalGrado();
    reset();
  };

  const handlerFortmat = (e: any) => {
    setValue("valor_grado", formatCurrency(e));
    if (
      getValues("name_grado") !== "" &&
      getValues("capacidad") > 0 &&
      getValues("valor_grado") !== ""
    )
      setBlockForm(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-6 flex flex-col gap-2">
          <div className="flex px-4 gap-4 h-32">
            <div>
              <InputComponent
                label="Nombre grado académico"
                name="name_grado"
                typeInput="text"
                placeholder="Nivel Academico"
                register={register("name_grado")}
              />
              {errors.name_grado && (
                <ErrorAlert>{errors.name_grado.message}</ErrorAlert>
              )}
            </div>
            <div>
              <InputComponent
                label="Capacidad máxima de estudiantes"
                name="capacidad"
                typeInput="number"
                placeholder="Periodo Académico"
                register={register("capacidad")}
              />
              {errors.capacidad && (
                <ErrorAlert>{errors.capacidad.message}</ErrorAlert>
              )}
            </div>
            <div>
              <InputComponent
                label="Valor nivel académico"
                name="valor_grado"
                typeInput="text"
                placeholder="Nivel Academico"
                register={register("valor_grado")}
              />
              {errors.valor_grado && (
                <ErrorAlert>{errors.valor_grado.message}</ErrorAlert>
              )}
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="flex justify-end py-6 px-4 gap-4 border-t border-gray-200">
          <div className="flex flex-row gap-2">
            <ButtonComponent
              label="Cancelar"
              type="button"
              className="tertiary-outline"
              onClick={() => {
                toggleModalGrado();
                reset();
              }}
            />
            <ButtonComponent
              label="Crear"
              type="submit"
              blockAccess={blockForm}
              className="tertiary"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default GradoAcademicoForm;
