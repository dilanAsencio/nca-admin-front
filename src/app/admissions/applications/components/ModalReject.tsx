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
import InputComponent from "@/components/shared/input/InputComponent";

const ModalReject: React.FC<{
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
        reason: z.string().nonempty("Este campo es requerido!"),
        applicationId: z.string().nonempty("Este campo es requerido!"),
      })
    ),
  });

  const handleSubmitRejected = async (data: any) => {
    const confirm = await showConfirm(
      "Está seguro?",
      "está apunto de rechazar la solicitud",
      "warning"
    );
    if (!confirm) return;
    toggleLoading(true);
    try {
      const resp = await ApplicationsService.admissionApplicationReject(data.applicationId, {comments: data.comments, sendEmail: true, reason: data.reason}) as any;
      if (resp.success) {
        showToast(`Solicitud rechazada con exito`, "success");
        toggleModal();
      } else {
        showToast(resp.message || `Error al rechazar la solicitud`, "error");
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
    return "Rechazar solicitud!";
  };

  useEffect(() => {
    register("applicationId");
    if (applicationId) {
      setValue("applicationId", applicationId); 
    }
  }, [applicationId]);

  return (
    <form onSubmit={handleSubmit(handleSubmitRejected)}>
      <ModalComponent
        title={handleTitleModal()}
        sizeModal="medium"
        handleModal={() => {
          handleCloseModal();
        }}
      >
        <div className={clsx(style["font-outfit"],"flex flex-col gap-[0.5rem]")}>
          <InputComponent
            label="Motivo de rechazo"
            placeholder="Escribe el motivo de rechazo"
            name="reason"
            typeInput="text"
            register={register("reason")}
            error={errors.reason && errors.reason.message as string}
          />
          <TextAreaComponent
            name="comments"
            label="Comentarios"
            rows={4}
            placeholder="..."
            register={register(`comments`)}
            error={errors.comments && errors.comments.message}
          />
        </div>
      </ModalComponent>
    </form>
  );
};

export default ModalReject;
