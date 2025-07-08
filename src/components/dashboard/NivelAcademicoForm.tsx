"use client";

import React, { useState } from "react";
import { useUI } from "@/providers/ui-context";
import InputComponent from "../shared/input/InputComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nivelAcademicoShema } from "@/types/forms-academic-shemas";
import { formatCurrency, unformatCurrency } from "@/utils/format-number";
import ErrorAlert from "../ui/ErrorAlert";
import ButtonComponent from "../shared/button/ButtonComponent";

const NivelAcademicoForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm({ resolver: zodResolver(nivelAcademicoShema) });
  const { toggleModalNivel } = useUI();
  const [blockForm, setBlockForm] = useState(true);

  const onSubmit = (data: any) => {
    toggleModalNivel();
    reset();
  };

  const handlerFortmat = (e: any) => {
    setValue("valor_nivel", formatCurrency(e));
    if (
      getValues("name_nivel") !== "" &&
      getValues("valor_nivel") !== "" &&
      getValues("periodo") !== ""
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
                label="Nombre nivel académico"
                name="name_nivel"
                typeInput="text"
                placeholder="Nivel Academico"
                register={register("name_nivel")}
              />
              {errors.name_nivel && (
                <ErrorAlert>{errors.name_nivel.message}</ErrorAlert>
              )}
            </div>
            <div>
              <InputComponent
                label="Periodo académico"
                name="periodo"
                typeInput="date"
                placeholder="Periodo Académico"
                register={register("periodo")}
              />
              {errors.periodo && (
                <ErrorAlert>{errors.periodo.message}</ErrorAlert>
              )}
            </div>
            <div>
              <InputComponent
                label="Sede"
                name="sede"
                typeInput="text"
                placeholder="Sede"
                register={register("sede")}
              />
              {errors.sede && <ErrorAlert>{errors.sede.message}</ErrorAlert>}
            </div>
            <div>
              <InputComponent
                label="Valor nivel académico"
                name="valor_nivel"
                typeInput="text"
                placeholder="Nivel Academico"
                register={register("valor_nivel", {
                  onChange: (e) => handlerFortmat(e.target.value),
                })}
              />
              {errors.valor_nivel && (
                <ErrorAlert>{errors.valor_nivel.message}</ErrorAlert>
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
                toggleModalNivel();
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

export default NivelAcademicoForm;
