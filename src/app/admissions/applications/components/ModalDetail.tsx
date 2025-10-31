"use client";

import React, { useEffect, useState } from "react";
import { FieldPath, FormProvider } from "react-hook-form";
import { useAdmissionApplicationForm } from "@/app/landing/admissions/hook/useAdmissionApplicationsForm";
import AspirantInfoSection from "@/app/landing/admissions/components/AspirantInfoSection";
import ParentInfoSection from "@/app/landing/admissions/components/ParentInfoSection";
import EmergencyContactSection from "@/app/landing/admissions/components/EmergencyContactSection";
import AdditionalInfoSection from "@/app/landing/admissions/components/AdditionalInfoSection";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { showToast } from "@/utils/alerts";
import { z } from "zod";
import { AdmissionApplicationSchema } from "@/app/core/schemas/admissions-landing-schema";
import { AdmissionsLandingService } from "@/services/landing/admissions/admissions-service";
import TabsComponent from "@/components/shared/tabs/TabsComponent";
import AdmissionUpDocuments from "@/app/landing/admissions/components/AdmissionUpDocuments";
import { useUI } from "@/providers/ui-context";
import ModalComponent from "@/components/ui/ModalComponent";
import { ApplicationsService } from "@/services/admissions/applications-service";

export type AdmissionApplicationFormData = z.infer<
  typeof AdmissionApplicationSchema
>;

interface formApplicationProps {
  applicatinoId: any;
  toggleModal: () => void;
}

export default function ModalDetail({
  applicatinoId,
  toggleModal,
}: formApplicationProps) {
  const methods = useAdmissionApplicationForm();
  const [activeTabForm, setActiveTabForm] = useState<number>(0);
  const [currentApplication, setCurrentApplication] = useState<any>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const { toggleLoading } = useUI();

  const onSubmit = async (data: any) => {
    toggleLoading(true);
    try {
      const resp = await AdmissionsLandingService.updateApplication(
        currentApplication.applicationId,
        data
      );
      if (resp.applicationId) {
        getApplicationsById(resp);
        showToast("La solicitud se actualizo con exito", "success");
      } else {
        showToast("Error al actualizar la solicitud", "error");
      }
      toggleLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getApplicationsById = async (applicationId: string) => {
    try {
      const response =
        await ApplicationsService.getAdmissionsApplicationsById(applicationId);

      if (response?.success) {
        methods.reset(response.data);
        setCurrentApplication(response.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const tabsForms = [
    { label: "Aspirante", component: <AspirantInfoSection disabled={true} /> },
    { label: "Acudiente", component: <ParentInfoSection disabled={true} /> },
    { label: "Emergencia", component: <EmergencyContactSection disabled={true} /> },
    { label: "Adicional", component: <AdditionalInfoSection disabled={true} /> },
  ];

  const tabs = [{ label: "Formulario" }, { label: "Documentación" }];

  const handleCloseModal = () => {
    toggleModal();
  };

  useEffect(() => {
    if (applicatinoId) {
      getApplicationsById(applicatinoId);
    }
  }, [applicatinoId]);

  return (
    <ModalComponent
      title={"Informacion de la Solicitud"}
      sizeModal="large"
      buttonAcceptVisible={false}
      handleModal={() => {
        handleCloseModal();
      }}
    >
      <FormProvider {...methods}>
        <div className="flex flex-col gap-[1.25rem]">
          <div className="max-w-[100%]">
            {/* Tabs Sections */}
            <div className="flex flex-1 shadow-[0_7px_21px_0_#451A1A0A]">
              {tabs.map((tab, index) => (
                <TabsComponent
                  key={index}
                  handleClick={() => setActiveTab(index)}
                  label={tab.label}
                  isActive={activeTab === index}
                  icon={{
                    path: `/assets/icon/${activeTab === index ? "file-check-02-red" : "file-check-02"}.svg`,
                    alt: "icon-file-check",
                  }}
                />
              ))}
            </div>
            <div className="p-[1rem] bg-white rounded-tr-[0.5rem] rounded-b-[0.5rem]">
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-[1rem] overflow-hidden"
              >
                {activeTab === 0 ? (
                  <>
                    {/* TabsForms Header */}
                    <div className="flex gap-[0.5rem] overflow-x-auto">
                      {tabsForms.map((tab, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveTabForm(index)}
                          className={`px-3 py-2 rounded-t-md ${
                            activeTabForm === index
                              ? "bg-[#F4F4F4] text-gray-900"
                              : "bg-[#FFFFFF] text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[200px]">
                      {tabsForms[activeTabForm].component}
                    </div>
                  </>
                ) : (
                  <AdmissionUpDocuments
                    isView={true}
                    deleteDocument={() => {
                      getApplicationsById(currentApplication);
                    }}
                    saveDocument={() => {
                      getApplicationsById(currentApplication);
                    }}
                    infoApplication={currentApplication}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </FormProvider>
    </ModalComponent>
  );
}
