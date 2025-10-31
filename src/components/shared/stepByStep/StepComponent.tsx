"use client";

import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface StepItem {
  label: string;
  value: number;
  formChecked: boolean;
  navCheck: boolean;
}

interface StepIndicatorProps {
  steps: StepItem[];
  currentStep: number; // comienza en 1
  onStepClick: (step: number) => void;
}

const StepComponent: React.FC<StepIndicatorProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="flex items-center justify-center relative w-full">
      {steps.map((step, index) => {
        const isActive = step.value === currentStep;
        const isCompleted = step.value < currentStep;

        return (
          <div key={step.value} className="relative flex flex-col items-center flex-1 max-w-[8.6563rem] p-[0.5rem]">
            {index <= steps.length - 1 && (
              <div
                className={clsx(
                  "absolute top-[25%] h-1",
                  index === 0 ? "left-[75%] w-[calc(100%/2)]" : index === steps.length - 1 ? "left-[25%] w-[calc(100%/2)]" : "left-[50%] w-full",
                  "z-0 transition-all duration-300",
                  isCompleted || isActive ? "bg-[#610CF4]" : "bg-gray-200"
                )}
                style={{
                  transform: "translateX(-50%)",
                }}
              />
            )}
            <div
              onClick={() => {step.navCheck && onStepClick(step.value)}}
              className={clsx(
                "w-8 h-8 rounded-full z-10 flex items-center justify-center border-2 text-sm font-bold cursor-pointer",
                isActive || isCompleted && !step.formChecked
                  ? "bg-[#5409D5] border-[#A06DF8] text-white"
                  : step.formChecked ? "bg-[#00D369] border-0" : "bg-white border-[#A06DF8] text-purple-600"
              )}
            >
              { step.formChecked ? <FontAwesomeIcon color="white" icon={faCheck} /> : step.value }
            </div>
            <div className="flex justify-center items-center w-full h-[2.5rem]">
              <span
                className={clsx(
                  "text-xs mt-2 text-center max-w-[90%]",
                  isActive || isCompleted
                    ? "text-[#5409D5] font-semibold"
                    : "text-gray-600"
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepComponent;