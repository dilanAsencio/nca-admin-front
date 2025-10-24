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
  writeData: {
    open: boolean;
    data: any;
    op: "view" | "edit" | "add";
};
}> = ({ toggleModal, writeData }) => {
  const { toggleLoading } = useUI();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

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
  
  const getAdmissionsProcess = async (admissionProcessId: string) => {
    if (admissionProcessId === "" || admissionProcessId === undefined) return;
    const resp = await AdmissionsServices.getAdmissionsProcessById(admissionProcessId);    
    if (resp?.success) {
      methods.reset(resp.data);
      writeData.op === "view" ? setIsReadOnly(true) : setIsReadOnly(false);
      writeData.op === "edit" ? setIsEdit(true) : setIsEdit(false);
    } else {
      showToast("Error al obtener la información del procesos de admision", "error");
    }
  }
  

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
    toggleLoading(true);
    try {
        let resp: any;
        if (data?.admissionProcessId) {
          resp = await AdmissionsServices.updateAdmissionProcess(data.admissionProcessId, data) as any;
        } else {
          resp = await AdmissionsServices.createAdmissionProcess(data) as any;        
        }
        if (resp.success) {
            showToast(`Proceso ${writeData.op === "add" ? "creado" : "actualizado"} con exito`, "success");
            toggleModal();
            toggleLoading(false);
        } else {
            showToast(`Error al ${writeData.op === "add" ? "crear" : "actualizar"} el proceso`, "error");
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
    if (writeData.op === "edit") {
      return "Editar proceso de admisión";
    }
    if (writeData.op === "view") {
      return "Detalle proceso de admisión";
    }
    return "Crear proceso de admisión";
  };

  useEffect(() => {
    if(writeData.open && writeData.data) {
      getAdmissionsProcess(writeData.data.admissionProcessId);
    }
  }, [writeData.open]);

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
            isReadOnly={isReadOnly}
            isEdit={isEdit}
            onSubmitForm={(data) => onSubmitedForm(data)}
            onSubmit={methods.handleSubmit(onSubmited)} />
      </FormProvider>
    </ModalComponent>
  );
};

export default ModalAdmissionsForm;
