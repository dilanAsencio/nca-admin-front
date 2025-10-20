"use client";

import React, { useEffect, useState } from "react";
import ModalComponent from "@/components/ui/ModalComponent";
import clsx from "clsx";
import style from "@/app/font.module.css";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showConfirm, showToast } from "@/utils/alerts";
import { useUI } from "@/providers/ui-context";
import { ApplicationsService } from "@/services/admissions/applications-service";

const ModalApproved: React.FC<{
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
        comments: z.string().nonempty("Este campo es requerido!"),
        nextSteps: z.string().nonempty("Este campo es requerido!"),
        applicationId: z.string().nonempty("Este campo es requerido!"),
      })
    ),
  });

  const handleSubmitApproved = async (data: any) => {
    const confirm = await showConfirm(
      "Está seguro?",
      "está apunto de aprobar la solicitud",
      "warning"
    );
    if (!confirm) return;
    toggleLoading(true);
    try {
      const resp = await ApplicationsService.admissionApplicationApprove(data.applicationId, {comments: data.comments, sendEmail: true, nextSteps: data.nextSteps}) as any;
      if (resp.success) {
        showToast(`Solicitud aprobada con exito`, "success");
        toggleModal();
      } else {
        showToast(resp.message || `Error al aprobar la solicitud`, "error");
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
    return "Aprobar solicitud!";
  };

  useEffect(() => {
    register("applicationId");
    if (applicationId) {
      setValue("applicationId", applicationId); 
    }
  }, [applicationId]);

  return (
    <form onSubmit={handleSubmit(handleSubmitApproved)}>
      <ModalComponent
        title={handleTitleModal()}
        sizeModal="medium"
        handleModal={() => {
          handleCloseModal();
        }}
      >
        <div className={clsx(style["font-outfit"],"flex gap-[0.5rem]")}>
          <div className="basis-1/2">
            <TextAreaComponent
              name="comments"
              label="Comentarios"
              rows={6}
              placeholder="..."
              register={register(`comments`)}
              error={errors.comments && errors.comments.message}
            />
          </div>
          <div className="basis-1/2">
            <TextAreaComponent
              name="nextSteps"
              label="Siguiente paso para el aspirante"
              rows={6}
              placeholder="..."
              register={register(`nextSteps`)}
              error={errors.nextSteps && errors.nextSteps.message}
            />
          </div>
        </div>
      </ModalComponent>
    </form>
  );
};

export default ModalApproved;
