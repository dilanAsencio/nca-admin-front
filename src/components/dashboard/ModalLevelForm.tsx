"use client";

import React, { useEffect, useState } from "react";
import { useUI } from "@/providers/ui-context";
import InputComponent from "../shared/input/InputComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nivelAcademicoSchema } from "@/app/core/schemas/forms-academic-schemas";
import ErrorAlert from "../ui/ErrorAlert";
import * as alerts from "@/utils/alerts";
import ModalComponent from "../ui/ModalComponent";
import { LevelService } from "@/services/managementAcademic/level-services";
import TextAreaComponent from "../shared/input/TextAreaComponent";
import { AcademicLevelForm, AcademicLevelResponse } from "@/app/core/interfaces/academicManagement/academic-level-interfaces";

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
    toggleLoading(true);
    if(!getValuesLevel("campusBranchId")) return showToast("No hay sede asociada", "warning");

    const dat: AcademicLevelResponse = {
      campusBranchId: getValuesLevel("campusBranchId"),
      description: data.description,
      name: data.name,
      code: data.code,
      levelOrder: parseInt(data.levelOrder),
      periodoAcademico: data.periodoAcademico
    }
    if(isOpenModalNivel.op === 1) {
      data.id = getValuesLevel("id");
      try {
        LevelService.updateLevel(dat, data.id)
          .then((response: any) => {
            if (response) {
              showToast(`Nivel ${response?.name}, Actualizado con exito!`, "success");
              onSubmit();
              handleCloseModal();
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
            if (response) {
              showToast(`Nivel ${response?.name}, creado con exito!`, "success");
              onSubmit();
              handleCloseModal();
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
    toggleModalNivel(false, 0, null);
    resetLevel();
  };

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
          title={`${isOpenModalNivel.op === 0 ? "Crear" : "Editar"} nivel académico`}
          labelBtnAccept={`${isOpenModalNivel.op === 0 ? "Crear" : "Actualizar"}`}
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
                register={registerLevel("name")}
                required
                error={errorsLevel.description && errorsLevel.description.message}
              />
              <InputComponent
                typeInput="number"
                label="Orden"
                placeholder="Orden del nivel académico (+)"
                name="levelOrder"
                register={registerLevel("levelOrder",{
                  valueAsNumber: true,
                })}
                required
                error={errorsLevel.levelOrder && errorsLevel.levelOrder.message}
              />
                <InputComponent
                  typeInput="text"
                  label="Codigo nivel académico"
                  placeholder="Codigo nivel académico"
                  name="code"
                  register={registerLevel("code",{
                    onChange: (e) => {
                      const value = e.target.value.toUpperCase();
                      setValueLevel("code", value);
                    }
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
                  register={registerLevel("description")}
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
