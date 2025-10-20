"use client";

import React, { useEffect, useState } from "react";
import ModalComponent from "@/components/ui/ModalComponent";
import clsx from "clsx";
import style from "@/app/font.module.css";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showToast } from "@/utils/alerts";
import { useUI } from "@/providers/ui-context";
import { ApplicationsService } from "@/services/admissions/applications-service";

const ModalComments: React.FC<{
  toggleModal: () => void;
  applicationId: string | null;
}> = ({ toggleModal, applicationId }) => {
  const { toggleLoading } = useUI();
  const {
    register,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        description: z.string().nonempty("Este campo es requerido!"),
        applicationId: z.string().nonempty("Este campo es requerido!"),
      })
    ),
  });

  const handleSubmitComment = async (data: any) => {
    toggleLoading(true);
    try {
      const resp = await ApplicationsService.admissionApplicationComment(data.applicationId, {comment: data.description}) as any;
      if (resp.success) {
        showToast(`Comentario agregado con exito`, "success");
        toggleModal();
      } else {
        showToast(resp.message || `Error al crear el comentario`, "error");
      }
      toggleLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    toggleModal();
  };

  const handleTitleModal = () => {
    return "Agregar comentario!";
  };

  useEffect(() => {
    register("applicationId");
    if (applicationId) {
      setValue("applicationId", applicationId); 
    }
  }, [applicationId]);

  return (
    <form onSubmit={handleSubmit(handleSubmitComment)}>
      <ModalComponent
        title={handleTitleModal()}
        sizeModal="medium"
        handleModal={() => {
          handleCloseModal();
        }}
      >
        <div className={clsx(style["font-outfit"])}>
          <div>
            <TextAreaComponent
              name="description"
              rows={6}
              placeholder="..."
              register={register(`description`)}
              error={errors.description && errors.description.message}
            />
          </div>
        </div>
      </ModalComponent>
    </form>
  );
};

export default ModalComments;
