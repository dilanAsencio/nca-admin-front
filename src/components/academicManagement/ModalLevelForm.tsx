"use client";

import React, { useEffect, useState } from "react";
import { useUI } from "@/providers/ui-context";
import InputComponent from "../shared/input/InputComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nivelAcademicoSchema } from "@/app/core/schemas/forms-academic-schemas";
import * as alerts from "@/utils/alerts";
import ModalComponent from "../ui/ModalComponent";
import { LevelService } from "@/services/admin/managementAcademic/level-services";
import TextAreaComponent from "../shared/input/TextAreaComponent";
import { AcademicLevelResponse } from "@/app/core/interfaces/academicManagement/academic-level-interfaces";

const ModalLevelForm: React.FC<{
  campusBranchId: string | null,
  onSubmit: () => void
}> = ({
  campusBranchId,
  onSubmit
}) => {
  const { toggleModalNivel, isOpenModalNivel, toggleLoading } = useUI();

  const {
      control: controlLevel,
      register: registerLevel,
      handleSubmit: handleSubmitLevel,
      formState: { errors: errorsLevel },
      reset: resetLevel,
      watch: watchLevel,
      setError: setErrorLevel,
      setValue: setValueLevel,
      getValues: getValuesLevel,
  } = useForm({
    resolver: zodResolver(nivelAcademicoSchema),
    defaultValues: isOpenModalNivel.data || {},
  });

  const showToast = alerts.showToast;
  
  const onSubmitLevel = (data: any) => {
    if(!getValuesLevel("campusBranchId")) return showToast("No hay sede asociada", "warning");
    if(!data.levelOrder) {
      setErrorLevel("levelOrder", {
        type: "manual",
        message: "Este campo es requerido!",
      });
      return;
    }
    const dat: AcademicLevelResponse = {
      campusBranchId: getValuesLevel("campusBranchId"),
      description: data.description,
      name: data.name,
      code: data.code,
      levelOrder: data.levelOrder,
      periodoAcademico: "",
    }
    toggleLoading(true);
    if(isOpenModalNivel.op === "edit") {
      data.id = getValuesLevel("id");
      if(!data.id) return showToast("No hay identificador de nivel asociado", "warning");
      try {
        LevelService.updateLevel(dat, data.id)
          .then((response: any) => {
            if (response.id) {
              showToast(`Nivel ${response?.name}, Actualizado con exito!`, "success");
              onSubmit();
              handleCloseModal();
              toggleLoading(false);
            } else {
              showToast(`Error al actualizar el nivel: ${response.message}`, "error");
              toggleLoading(false);
            }
          })
          .catch((error) => {
            console.error(error); 
            toggleLoading(false);
        });
      } catch (error: any) {
        console.error(error);
        toggleLoading(false);
      }
    } else {
      try {
        LevelService.createLevel(dat)
          .then((response: any) => {
            if (response.id) {
              showToast(`Nivel ${response?.name}, creado con exito!`, "success");
              onSubmit();
              handleCloseModal();
              toggleLoading(false);
            } else {
              showToast(`Error al crear el nivel: ${response.message}`, "error");
              toggleLoading(false);
            }
          })
          .catch((error) => {
            console.error(error); 
            toggleLoading(false);
        });
      } catch (error: any) {
        console.error(error);
        toggleLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    toggleModalNivel(false, "add", null);
    resetLevel();
  };

  const handleTitleModal = () => {
    if(isOpenModalNivel.op === "add") return "Crear nivel académico";
    if(isOpenModalNivel.op === "edit") return "Editar nivel académico";
    if(isOpenModalNivel.op === "view") return "Detalle nivel académico";
    return "Nivel académico";
  }

  useEffect(() => {
    if(campusBranchId === null) return;
    registerLevel("campusBranchId");
    setValueLevel("campusBranchId", campusBranchId);
  }, [campusBranchId]);

  useEffect(() => {
    if(isOpenModalNivel.data !== null && isOpenModalNivel.data !== undefined) {
      registerLevel("id" );
    }
  }, [isOpenModalNivel]);

  return (
    <>
        <ModalComponent
          title={handleTitleModal()}
          labelBtnAccept={`${isOpenModalNivel.op === "add" ? "Crear" : "Actualizar"}`}
          buttonAcceptVisible={isOpenModalNivel.op !== "view"}
          sizeModal="medium"
          handleSubmit={handleSubmitLevel(onSubmitLevel)}
          handleModal={() => {handleCloseModal()}}
        >
          <>
            <div className="grid grid-cols-4 gap-y-[1rem] gap-x-[1rem] pb-[1rem] items-baseline">
              <InputComponent
                label="Nombre nivel académico"
                placeholder="Nombre de nivel académico"
                name="name"
                className="capitalize"
                typeInput="text"
                readOnly={isOpenModalNivel.op === "view"}
                register={registerLevel("name", {
                  disabled: isOpenModalNivel.op === "view",
                })}
                required
                error={errorsLevel.description && errorsLevel.description.message}
              />
              <InputComponent
                typeInput="number"
                label="Orden"
                placeholder="Orden del nivel académico (+)"
                name="levelOrder"
                readOnly={isOpenModalNivel.op === "view"}
                register={registerLevel("levelOrder", {
                  valueAsNumber: true,
                  disabled: isOpenModalNivel.op === "view",
                })}
                required
                error={errorsLevel.levelOrder && errorsLevel.levelOrder.message}
              />
                <InputComponent
                  typeInput="text"
                  label="Codigo nivel académico"
                  placeholder="Codigo nivel académico"
                  name="code"
                  readOnly={isOpenModalNivel.op === "view"}
                  register={registerLevel("code",{
                    onChange: (e) => {
                      const value = e.target.value.toUpperCase();
                      setValueLevel("code", value);
                    },
                    disabled: isOpenModalNivel.op === "view",
                  })}
                  required
                  error={errorsLevel.code && errorsLevel.code.message}
                />
            </div>
            <div className="basis-3/4">
              <TextAreaComponent
                  name="description"
                  rows={4}
                  placeholder="Descripción"
                  label="Descripción"
                  readOnly={isOpenModalNivel.op === "view"}
                  register={registerLevel("description", {
                    disabled: isOpenModalNivel.op === "view",
                  })}
                  required
                  error={errorsLevel.description && errorsLevel.description.message}
                  />
            </div>
          </>
        </ModalComponent> 
    </>
  );
};

export default ModalLevelForm;
