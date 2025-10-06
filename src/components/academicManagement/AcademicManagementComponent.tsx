"use client";

import React, { useState } from "react";
import { useUI } from "@/providers/ui-context";
import clsx from "clsx";
import style from "@/app/font.module.css";
import Image from "next/image";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import StepComponent from "@/components/shared/stepByStep/StepComponent";
import BasicDataForm from "./campusForms/BasicDataComponent";
import BranchesComponent from "./campusForms/BranchesComponent";
import CertifiedAndProgramsForm from "./campusForms/Certified&ProgramsComponent";

const AcademicManagementFormsComponent: React.FC<{ onBack: () => void, title: string, isEditCampus: boolean }> = ({
  onBack, title, isEditCampus
}) => {
  const { stepsCreateSchool, resetForm, handleDownChecks } = useUI();
  const [currentStep, setCurrentStep] = useState(1);
  const handleBack = () => {
    handleDownChecks();
    onBack();
    resetForm();
  };
  return (
    <div className={clsx(`${style["font-outfit"]}`, `flex flex-col relative`)}>
      <div className={clsx("flex justify-between items-center py-[0.81rem]")}>
        <div className={clsx("flex gap-[0.75rem]")}>
          <Image
            onClick={onBack}
            className="cursor-pointer"
            src="/assets/icon/arrow-left.svg"
            alt="logo-curriculum"
            width={24}
            height={24}
          ></Image>
          <h5 className="text-[1.25rem] leading-[120%] font-medium m-0">
            {`${title} - ${stepsCreateSchool[currentStep - 1].label}`}
          </h5>
        </div>
        <BreadcumbComponent items={[{ label: title }]} />
      </div>
      <div
        className={
          "p-[1rem] flex flex-col gap-[1rem] bg-white rounded-[0.5rem] overflow-y-auto h-[82vh]"
        }
      >
        <StepComponent
          steps={stepsCreateSchool}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
        <hr className="my-[0.5rem]" />
        {currentStep === 1 && (
          <BasicDataForm isEdit={isEditCampus} onBack={handleBack} onNext={() => {setCurrentStep(currentStep + 1)}} />
        )}
        {currentStep === 2 && <BranchesComponent onBack={handleBack} onNext={() => {setCurrentStep(currentStep + 1)}} />}
        {currentStep === 3 && <CertifiedAndProgramsForm onClose={handleBack} />}
      </div>
    </div>
  );
};

export default AcademicManagementFormsComponent;
