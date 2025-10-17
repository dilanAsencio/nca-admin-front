"use client";

import React, { useEffect, useState } from "react";
import { useUI } from "@/providers/ui-context";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as alerts from "@/utils/alerts";
import ModalComponent from "@/components/ui/ModalComponent";
import { LevelService } from "@/services/managementAcademic/level-services";
import { AcademicLevelResponse } from "@/app/core/interfaces/academicManagement/academic-level-interfaces";
import { AdmissionProcessSchema } from "@/app/core/schemas/admissions-schema";
import { z } from "zod";
import AdmissionForm from "./AdmissionForm";
import { AdmissionsServices } from "@/services/admissions/admissions-service";

export type AdmissionProcessFormData = z.infer<typeof AdmissionProcessSchema>;

const ModalAdmissionsForm: React.FC<{
  toggleModal: () => void;
}> = ({ toggleModal }) => {
  const { toggleLoading } = useUI();

  const methods = useForm<AdmissionProcessFormData>({
    resolver: zodResolver(AdmissionProcessSchema),
    defaultValues: {
      name: "",
      description: "",
      academicYear: new Date().getFullYear(),
      campuses: [],
      grades: [],
      requiredDocuments: [],
      requiresInterview: false,
      requiresEvaluation: false,
      maxApplications: 1,
      notifyOnNewApplication: false,
      notifyOnDocumentUpload: false,
      notifyOnStatusChange: false,
    },
  });

  const onSubmited = (data: any) => {
    
    console.log("✅ Formulario válido #1:", data);
  };

  const onSubmitedForm = async (data: any) => {
    data.grades = data.grades.map((grade: any) => grade.gradeId);
    data.notificationSettings = {
      notifyOnNewApplication: data.notifyOnNewApplication,
      notifyOnDocumentUpload: data.notifyOnDocumentUpload,
      notifyOnStatusChange: data.notifyOnStatusChange
    }
    const monthStart = (new Date(data.startDate).getMonth()) >= 9 ? (new Date(data.startDate).getMonth() + 1) : "0"+(new Date(data.startDate).getMonth() + 1);
    const dayStart = (new Date(data.startDate).getDate()) >= 10 ? (new Date(data.startDate).getDate()) : "0"+(new Date(data.startDate).getDate());
    const monthEnd = (new Date(data.endDate).getMonth()) >= 9 ? (new Date(data.endDate).getMonth() + 1) : "0"+(new Date(data.endDate).getMonth() + 1);
    const dayEnd = (new Date(data.endDate).getDate()) >= 10 ? (new Date(data.endDate).getDate()) : "0"+(new Date(data.endDate).getDate());
    data.startDate = new Date(data.startDate).getFullYear()+'-'+monthStart+'-'+dayStart;
    data.endDate = new Date(data.endDate).getFullYear()+'-'+monthEnd+'-'+dayEnd;
    delete data.notifyOnNewApplication;
    delete data.notifyOnDocumentUpload;
    delete data.notifyOnStatusChange;
    console.log("✅ Formulario válido #12:", data);
    toggleLoading(true);
    try {
        const resp = await AdmissionsServices.createAdmissionProcess(data) as any;        
        if (resp.success) {
            showToast("Proceso creado con exito", "success");
            toggleModal();
            toggleLoading(false);
        } else {
            showToast("Error al crear el proceso", "error");
        }
        toggleLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const showToast = alerts.showToast;

  const handleCloseModal = () => {
    toggleModal();
  };

  const handleTitleModal = () => {
    return "Crear proceso de admisión";
  };

  return (
    <ModalComponent
      title={handleTitleModal()}
      sizeModal="large"
      buttonAcceptVisible={false}
      handleModal={() => {
        handleCloseModal();
      }}
    >
      <FormProvider {...methods}>
        <AdmissionForm 
            onSubmitForm={(data) => onSubmitedForm(data)}
            onSubmit={methods.handleSubmit(onSubmited)} />
      </FormProvider>
    </ModalComponent>
  );
};

export default ModalAdmissionsForm;
