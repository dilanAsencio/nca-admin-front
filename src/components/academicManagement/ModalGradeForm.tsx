"use client";

import React, { useEffect, useState } from "react";
import { useUI } from "@/providers/ui-context";
import InputComponent from "../shared/input/InputComponent";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gradoAcademicoSchema } from "@/app/core/schemas/forms-academic-schemas";
import { formatCurrency, unformatCurrency } from "@/utils/format-number";
import * as alerts from "@/utils/alerts";
import ModalComponent from "../ui/ModalComponent";
import TextAreaComponent from "../shared/input/TextAreaComponent";
import DropdownComponent from "../shared/dropdown/DropdownComponent";
import { GradeService } from "@/services/managementAcademic/grade-service";
import { AcademicGradeResponse } from "@/app/core/interfaces/academicManagement/academic-grade-interfaces";

const ModalGradeForm: React.FC<{
  onSubmit: () => void;
}> = ({
  onSubmit
}) => {
  const { toggleModalGrado, isOpenModalGrado, toggleLoading, optionsLevels } = useUI();
  const {
      control: controlGrade,
      register: registerGrade,
      handleSubmit: handleSubmitGrade,
      formState: { errors: errorsGrade },
      reset: resetGrade,
      watch: watchGrade,
      setError: setErrorGrade,
      setValue: setValueGrade,
      getValues: getValuesGrade,
  } = useForm({
    resolver: zodResolver(gradoAcademicoSchema),
    defaultValues: isOpenModalGrado.data || {},
  });
  
  const [selectLevel, setSelectLevel] = useState<any | null>(null);
  const showToast = alerts.showToast;
    
  const onSubmitGrade = (data: any) => {
    toggleLoading(true);
    try {
      const dat: AcademicGradeResponse = {
        academicLevelId: data.academicLevelId,
        description: data.description,
        maxCapacity: parseInt(data.maxCapacity),
        name: data.name,
        code: data.code,
        valor: unformatCurrency(data.valorString) || 0,
        gradeOrder: parseInt(data.gradeOrder),
      }
      if(isOpenModalGrado.op === 1) {
        dat.id = isOpenModalGrado.data?.id;
        if(!dat.id) return showToast("No hay identificador de grado asociado", "warning");
        GradeService.updateLevel(dat,dat.id)
          .then((response: any) => {
            if (response) {
              showToast(`Grado ${response.name}, creado con exito!`, "success");
              toggleModalGrado(false, 0, null);
              resetGrade();
              onSubmit();
              toggleLoading(false);
            }
          })
          .catch((error) => {
            console.error(error); 
            toggleLoading(false);
        });
      } else {
        GradeService.createGrade(dat)
          .then((response: any) => {
            if (response) {
              showToast(`Grado ${response.name}, creado con exito!`, "success");
              toggleModalGrado(false, 0, null);
              resetGrade();
              onSubmit();
              toggleLoading(false);
            }
          })
          .catch((error) => {
            console.error(error); 
            toggleLoading(false);
        });
      }
    } catch (error: any) {
      console.error(error);
      toggleLoading(false);
    }
  };

  const handleFormatCurrency = (value: string) => {
    const formatedValue = formatCurrency(value);
    return formatedValue;
  }
  
  const selectedLevel = (e: any) => {
      setValueGrade("academicLevelId", e.value);
      setSelectLevel(e);
  }

  const handleCloseModal = () => {
    toggleModalGrado(false, 0, null);
    resetGrade();
    setSelectLevel(null);
  }

  useEffect(() => {
    registerGrade("academicLevelId");;
  }, []);

  useEffect(() => {
    if (isOpenModalGrado.data !== null && isOpenModalGrado.data !== undefined) {
      registerGrade("id");
      setValueGrade("id", isOpenModalGrado.data.id);
      setValueGrade("valorString", formatCurrency(isOpenModalGrado.data.valor.toString()));
    }

  }, [isOpenModalGrado]);

  return (
    <>
      <ModalComponent
        title={`${isOpenModalGrado.op === 0 ? "Crear" : "Editar"} grado académico`}
        labelBtnAccept={`${isOpenModalGrado.op === 0 ? "Crear" : "Actualizar"}`}
        sizeModal="medium"
        handleSubmit={handleSubmitGrade(onSubmitGrade)}
        handleModal={() => handleCloseModal()}
      >
        <>
          <div className="grid grid-cols-3 items-baseline gap-y-[1rem] gap-x-[1rem] pb-[1rem]">
            <InputComponent
              label="Nombre grado académico"
              placeholder="Nombre de grado académico"
              name="name"
              className="capitalize"
              typeInput="text"
              register={registerGrade("name")}
              required
              error={errorsGrade.name && errorsGrade.name.message}
            />
            <InputComponent
              label="Codigo grado académico"
              placeholder="Codigo grado académico"
              name="code"
              className="capitalize"
              typeInput="text"
              register={registerGrade("code")}
              required
              error={errorsGrade.code && errorsGrade.code.message}
            />
            <InputComponent
              typeInput="number"
              className="text-right"
              label="Capacidad mx. de estudiantes"
              placeholder="Ingrese cantidad de estudiantes"
              name="maxCapacity"
              register={registerGrade("maxCapacity", {
                valueAsNumber: true,
                onChange(event) {
                  const value = parseInt(event.target.value);
                  if (value < 1) {
                    setErrorGrade("maxCapacity", {
                      type: "manual",
                      message: "La capacidad debe ser mayor a 0",
                    });
                  } else {
                    setErrorGrade("maxCapacity", {
                      type: "manual",
                      message: "",
                    });
                    setValueGrade("maxCapacity", value);
                  }
                },
              })}
              required
              error={errorsGrade.maxCapacity && errorsGrade.maxCapacity.message}
            />
            <InputComponent
              typeInput="number"
              label="Orden"
              placeholder="Orden del grado académico (+)"
              className="text-right"
              name="gradeOrder"
              register={registerGrade("gradeOrder", {
                valueAsNumber: true,
                onChange: (e) => {
                  const value = parseInt(e.target.value);
                  if (value < 1) {
                    setErrorGrade("gradeOrder", {
                      type: "manual",
                      message: "El orden debe ser mayor a 0",
                    });
                  } else {
                    setErrorGrade("gradeOrder", {
                      type: "manual",
                      message: "",
                    });
                    setValueGrade("gradeOrder", value);
                  }
                },
              })}
              required
              error={errorsGrade.gradeOrder && errorsGrade.gradeOrder.message}
            />
            <Controller
              name="academicLevelId"
              control={controlGrade}
              render={({ field }) => (
                <DropdownComponent
                  name="academicLevelId"
                  label="Nivel academico"
                  className="primary"
                  placeholder="Escoger nivel academico"
                  options={
                    optionsLevels && optionsLevels.length > 0
                      ? optionsLevels
                      : []
                  }
                  onChange={(value) => {
                    selectedLevel(value);
                    field.onChange(value);
                  }}
                  value={field.value}
                  required
                  error={
                    errorsGrade.academicLevelId &&
                    errorsGrade.academicLevelId.message
                  }
                />
              )}
            />
            <InputComponent
              typeInput="text"
              label="Valor grado académico"
              placeholder="Valor grado académico"
              className="text-right"
              name="valorString"
              register={registerGrade("valorString", {
                onChange: (e) => {
                  const value = e.target.value;
                  if(unformatCurrency(value) === 0) {
                    setErrorGrade("valorString", {
                      type: "manual",
                      message: "El valor debe ser mayor a 0",
                    });
                  } else {
                    setErrorGrade("valorString", {
                      type: "manual",
                      message: "",
                    });
                    setValueGrade("valorString", handleFormatCurrency(value));
                  }
                },
              })}
              required
              error={errorsGrade.valorString && errorsGrade.valorString.message}
            />
          </div>
          <div className="basis-3/4">
            <TextAreaComponent
              name="description"
              rows={4}
              placeholder="Descripción"
              label="Descripción"
              register={registerGrade("description")}
              required
              error={errorsGrade.description && errorsGrade.description.message}
            />
          </div>
        </>
      </ModalComponent>
    </>
  );
};

export default ModalGradeForm;
