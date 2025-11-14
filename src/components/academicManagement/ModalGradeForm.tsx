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
import { GradeService } from "@/services/admin/managementAcademic/grade-service";
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
      if(isOpenModalGrado.op === "edit") {
        dat.id = isOpenModalGrado.data?.id;
        if(!dat.id) return showToast("No hay identificador de grado asociado", "warning");
        GradeService.updateGrade(dat,dat.id)
          .then((response: any) => {
            if (response.id) {
              showToast(`Grado ${response.name}, creado con exito!`, "success");
              toggleModalGrado(false, "add", null);
              resetGrade();
              onSubmit();
              toggleLoading(false);
            } else {
              showToast(`Error al actualizar el grado: ${response.message}`, "error");
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
            if (response.id) {
              showToast(`Grado ${response.name}, creado con exito!`, "success");
              toggleModalGrado(false, "add", null);
              resetGrade();
              onSubmit();
              toggleLoading(false);
            } else {
              showToast(`Error al crear el grado: ${response.message}`, "error");
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
    toggleModalGrado(false, "add", null);
    resetGrade();
    setSelectLevel(null);
  }
  const handleTitleModal = () => {
    if(isOpenModalGrado.op === "add") return "Crear grado académico";
    if(isOpenModalGrado.op === "edit") return "Editar grado académico";
    if(isOpenModalGrado.op === "view") return "Detalle grado académico";
    return "Grado académico";
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
        title={handleTitleModal()}
        labelBtnAccept={`${isOpenModalGrado.op === "add" ? "Crear" : "Actualizar"}`}
        buttonAcceptVisible={isOpenModalGrado.op !== "view"}
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
              readOnly={isOpenModalGrado.op === "view"}
              disabled={isOpenModalGrado.op === "view"}
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
              readOnly={isOpenModalGrado.op === "view"}
              disabled={isOpenModalGrado.op === "view"}
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
              readOnly={isOpenModalGrado.op === "view"}
              disabled={isOpenModalGrado.op === "view"}
              register={registerGrade("maxCapacity", {
                valueAsNumber: true,
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
              readOnly={isOpenModalGrado.op === "view"}
              disabled={isOpenModalGrado.op === "view"}
              register={registerGrade("gradeOrder", {
                valueAsNumber: true,
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
                  readOnly={isOpenModalGrado.op === "view"}
              disabled={isOpenModalGrado.op === "view"}
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
              readOnly={isOpenModalGrado.op === "view"}
              disabled={isOpenModalGrado.op === "view"}
              register={registerGrade("valorString", {
                onChange: (e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  if (value === '') {
                    setValueGrade("valorString", "");
                    return;
                  }                  
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
                }
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
              readOnly={isOpenModalGrado.op === "view"}
              disabled={isOpenModalGrado.op === "view"}
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
