"use client";

import React, { useEffect, useState } from "react";
import { FieldPath, FormProvider } from "react-hook-form";
import { useAdmissionApplicationForm } from "../hook/useAdmissionApplicationsForm";
import AspirantInfoSection from "./AspirantInfoSection";
import ParentInfoSection from "./ParentInfoSection";
import EmergencyContactSection from "./EmergencyContactSection";
import AdditionalInfoSection from "./AdditionalInfoSection";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { showToast } from "@/utils/alerts";
import { z } from "zod";
import { AdmissionApplicationSchema } from "@/app/core/schemas/admissions-landing-schema";
import { AdmissionsLandingService } from "@/services/landing/admissions/admissions-service";
import TabsComponent from "@/components/shared/tabs/TabsComponent";
import AdmissionUpDocuments from "./AdmissionUpDocuments";
import CardProgressInfo from "./CardProgressInfo";
import { useUI } from "@/providers/ui-context";

export type AdmissionApplicationFormData = z.infer<
  typeof AdmissionApplicationSchema
>;

interface formApplicationProps {
  applicatino: any;
  onSubmited: () => void;
}

export default function AdmissionApplicationForm({
  applicatino, onSubmited
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
  
  const submittedApplication = async () => {
    toggleLoading(true);
    try {
      const resp = await AdmissionsLandingService.submittedApplication(currentApplication.applicationId);
      if (resp.applicationId) {
        showToast("La solicitud se envió correccamente a revisión", "success");
        onSubmited();
      } else {
        showToast("Error al enviar la solicitud", "error");
      }
      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
      console.error(error);
    }
  }

  const getApplicationsById = async (item: any) => {
    const applicationId = item.applicationId;
    try {
      const response =
        await AdmissionsLandingService.getApplicationsById(applicationId);

      if (response.applicationId) {        
        methods.reset(response);
        methods.setValue("aspirant.documentType", response.aspirant.documentTypeId);
        methods.setValue("parent.documentType", response.parent.documentTypeId);
        methods.setValue("emergencyContact.fullName", response.emergencyContact.firstName + " " + response.emergencyContact.lastName);
        const progress = response.completionPercentage;
        setPercentage(progress);
        setCurrentApplication(response);        
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const tabsForms = [
    { label: "Aspirante", component: <AspirantInfoSection /> },
    { label: "Acudiente", component: <ParentInfoSection /> },
    { label: "Emergencia", component: <EmergencyContactSection /> },
    { label: "Adicional", component: <AdditionalInfoSection /> },
  ];

  const tabs = [{ label: "Formulario" }, { label: "Documentación" }];

  const handleContinue = async () => {
    
    const {formState: { isValid }} = methods;
    // Si pasa la validación, avanza
    if (!isValid) {
      showToast(
        `Por favor, completa los campos requeridos antes de continuar`,
        "warning"
      );
    }
  };

  useEffect(() => {
    if (applicatino) {
      getApplicationsById(applicatino);
    }
  }, [applicatino]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-[1.25rem]">
        <CardProgressInfo
          swIsNeeded={() => {}}
          aspirantName={`${currentApplication && currentApplication.aspirant.firstName} ${currentApplication && currentApplication.aspirant.lastName}`}
          campusLogo={{
            path: "/assets/landing/img/df-checker.png",
            alt: "logo",
          }}
          campusName={currentApplication?.campus?.name ?? ""}
          progress={percentage}
        />
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

                  {/* Footer */}
                  <div className="flex justify-end">
                    <ButtonComponent
                      type="submit"
                      className="primary"
                      label="Continuar"
                      onClick={() => handleContinue()}
                    />
                  </div>
                </>
              ) : (
                <AdmissionUpDocuments
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
          <div className="w-full flex justify-center">
            <ButtonComponent
              type="button"
              className="primary"
              label="Enviar a revisión"
              icon={{
                path: "/assets/icon/arrow-right.svg", alt: "arrow right"
              }}
              blockAccess={percentage < 100}
              onClick={() => {submittedApplication();}}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
