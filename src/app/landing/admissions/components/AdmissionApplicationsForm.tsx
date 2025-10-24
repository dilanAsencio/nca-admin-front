"use client";

import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
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

export type AdmissionApplicationFormData = z.infer<typeof AdmissionApplicationSchema>;

interface formApplicationProps {
    applicatino: any;
}

export default function AdmissionApplicationForm({applicatino}: formApplicationProps) {
  const methods = useAdmissionApplicationForm();
  const [activeTabForm, setActiveTabForm] = useState<number>(0);
  const [currentApplication, setCurrentApplication] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const onSubmit = (data: any) => {
    console.log("📦 FORM SUBMIT:", data);
    showToast("Formulario enviado correctamente", "success");
  };
  
  const getApplicationsById = async (item: any) => {
    const applicationId = item.applicationId;
    try {
      const response = await AdmissionsLandingService.getApplicationsById(applicationId);
      console.log("APPLICATION BY ID", response);
      
      if (response.applicationId) {
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
  
  const tabs = [
    { label: "Formulario" },
    { label: "Documentación"},
  ];

  useEffect(() => {
    getApplicationsById(applicatino);
  }, [applicatino]);
  return (
    <FormProvider {...methods}>
      <div>
        {/* Tabs Sections */}
        <div className="flex shadow-[0_7px_21px_0_#451A1A0A]">
          { tabs.map((tab, index) => (
            <TabsComponent
              key={index}
              handleClick={() => setActiveTab(index)}
              label={tab.label}
              isActive={activeTab === index}
              icon={{ path: `/assets/icon/${activeTab === index ? "file-check-02-red" : "file-check-02"}.svg`, alt: "icon-file-check" }}
            />
          ))}
        </div>
        <div className="p-[1rem] bg-white rounded-tr-[0.5rem] rounded-b-[0.5rem]">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-[1rem]"
          >
            { activeTab === 0 ?(<>
              {/* TabsForms Header */}
              <div className="flex gap-[0.5rem]">
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
              <div className="min-h-[200px]">{tabsForms[activeTabForm].component}</div>
              
              {/* Footer */}
              <div className="flex justify-end">
                <ButtonComponent type="submit" className="primary" label="Guardar" />
              </div></>)
              :
              <AdmissionUpDocuments infoApplication={currentApplication} />
            }
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
