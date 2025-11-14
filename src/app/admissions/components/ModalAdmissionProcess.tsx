"use client";

import React, { useEffect, useState } from "react";
import { useUI } from "@/providers/ui-context";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as alerts from "@/utils/alerts";
import ModalComponent from "@/components/ui/ModalComponent";
import { LevelService } from "@/services/admin/managementAcademic/level-services";
import { AcademicLevelResponse } from "@/app/core/interfaces/academicManagement/academic-level-interfaces";
import { AdmissionProcessSchema } from "@/app/core/schemas/admissions-schema";
import { z } from "zod";
import AdmissionForm from "./AdmissionForm";
import { AdmissionsServices } from "@/services/admin/admissions/admissions-service";

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
  const [currentPAdmission, setCurrentPAdmission] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const methods = useForm<AdmissionProcessFormData>({
    resolver: zodResolver(AdmissionProcessSchema),
    defaultValues: {
      name: "",
      description: "",
      academicYear: new Date().getFullYear(),
      campuses: "",
      branches: "",
      grades: [],
      requiredDocuments: [],
      requiresInterview: false,
      requiresEvaluation: false,
      maxApplications: 1,
    },
  });
  
  const getAdmissionsProcess = async (admissionProcessId: string) => {
    if (admissionProcessId === "" || admissionProcessId === undefined) return;
    const resp = await AdmissionsServices.getAdmissionsProcessById(admissionProcessId);    
    if (resp?.success) {
      methods.reset(resp.data);
      const campusBrancheIds = resp.data.campusesBranches?.map((c: any) => c.campusBranchId) || [];
      const gradeIds = resp.data.grades?.map((g: any) => g.gradeId) || [];
      const documentsRequired = resp.data.requiredDocuments?.map((doc: any) => {
        return {
          ...doc,
          required: doc.isRequired,
          documentType: doc.documentTypeId
        };
      }) || [];
      methods.setValue("requiredDocuments", documentsRequired);
      methods.setValue("campuses", resp.data.campusId);
      methods.setValue("branches", campusBrancheIds[0]);
      methods.setValue("grades", gradeIds);
      setCurrentPAdmission(resp.data);
      writeData.op === "view" ? setIsReadOnly(true) : setIsReadOnly(false);
      writeData.op === "edit" ? setIsEdit(true) : setIsEdit(false);
    } else {
      showToast("Error al obtener la información del procesos de admision", "error");
    }
  }
  

  const onSubmited = async (data: any) => {
    data.notificationSettings = {
      notifyOnNewApplication: data.notifyOnNewApplication,
      notifyOnDocumentUpload: data.notifyOnDocumentUpload,
      notifyOnStatusChange: data.notifyOnStatusChange
    }
    let branches: string[] = [];
    branches.push(data.branches);
    data.campusBranches = branches;
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
            handleCloseModal();
            toggleLoading(false);
        } else {
            showToast(`Error al ${writeData.op === "add" ? "crear" : "actualizar"} el proceso`, "error");
        }
        toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
      console.error(error);
    }
  };

  const showToast = alerts.showToast;

  const handleCloseModal = () => {
    toggleModal();
    setCurrentPAdmission(null);
    methods.reset();
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
            currentData={writeData.op === "add" ? undefined : currentPAdmission}
            isEdit={isEdit}
            onSubmit={methods.handleSubmit(onSubmited)} />
      </FormProvider>
    </ModalComponent>
  );
};

export default ModalAdmissionsForm;
