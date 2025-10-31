"use client";

import React, { useEffect } from "react";
import { useAdmissionForm } from "../hook/useAdmissionForm";
import InputComponent from "@/components/shared/input/InputComponent";
import InputDateComponent from "@/components/shared/input/InputDateComponent";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { showToast } from "@/utils/alerts";
import { AdmissionsLandingService } from "@/services/landing/admissions/admissions-service";
import { useUI } from "@/providers/ui-context";
import { useRouter } from "next/navigation";

interface NewApplicationAdmissionProps {
  infoIds: { processId: string; campusId: string; gradeId: string };
  onClose: () => void;
}

export default function NewApplicationAdmissionForm({
  infoIds,
  onClose,
}: NewApplicationAdmissionProps) {
  const {
    control,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useAdmissionForm();
  const route = useRouter();
  const { toggleLoading } = useUI();

  const onSubmit = async (data: any) => {
    toggleLoading(true);
    try {
      const resp = await AdmissionsLandingService.newAdmissionApplication(data);
      if (resp.applicationId) {
        toggleLoading(false);
        showToast(`Solicitud enviada con exito`, "success");
        route.push("/landing/admissions");
        onClose();
      } else {
        toggleLoading(false);
        showToast(
          `Error al enviar la solicitud: ${resp.message || "Error desconocido"}`,
          "error"
        );
      }
    } catch (error) {
      toggleLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("admissionProcessId", infoIds.processId);
    setValue("campusId", infoIds.campusId);
    setValue("gradeId", infoIds.gradeId);
    setValue("yearRequested", new Date().getFullYear());
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[0.75rem] p-4 border-1 border-solid border-[#610CF4] rounded-[0.5rem]"
    >
      <div className="grid grid-cols-3 gap-x-[0.75rem]">
        <InputComponent
          label="Nombres del aspirante"
          placeholder="Nombres del aspirante"
          name="aspirantFirstName"
          className="capitalize"
          typeInput="text"
          register={register("aspirantFirstName")}
          required
          error={errors.aspirantFirstName && errors.aspirantFirstName.message}
        />

        <InputComponent
          label="Apellidos del aspirante"
          placeholder="Apellidos del aspirante"
          name="aspirantLastName"
          className="capitalize"
          typeInput="text"
          register={register("aspirantLastName")}
          required
          error={errors.aspirantLastName && errors.aspirantLastName.message}
        />

        <InputDateComponent
          label="Fecha de nacimiento"
          viweType="date"
          required
          name="aspirantDateOfBirth"
          control={control}
          error={
            errors.aspirantDateOfBirth && errors.aspirantDateOfBirth.message
          }
        />
      </div>

      <TextAreaComponent
        name="comments"
        rows={3}
        placeholder="Descripción"
        className="form-control"
        label="Descripción"
        register={register("comments")}
        required
        error={errors.comments && errors.comments.message}
      />

      <ButtonComponent
        className="primary"
        type="submit"
        label={"Enviar solicitud"}
      />
    </form>
  );
}
