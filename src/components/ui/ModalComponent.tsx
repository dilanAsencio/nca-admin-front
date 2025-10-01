"use client";

import React from "react";
import { useUI } from "@/providers/ui-context";
import clsx from "clsx";
import ButtonComponent from "../shared/button/ButtonComponent";

const ModalComponent: React.FC<{
  title: string;
  children: React.ReactNode;
  handleModal: () => void;
  handleSubmit: () => void;
  labelBtnAccept?: string;
  sizeModal?: 'small' | 'medium' | 'large';
}> = ({ title, children, handleModal, handleSubmit, labelBtnAccept, sizeModal }) => {

  return (
    <>
      <div
        tabIndex={-1}
        className="fixed inset-0 z-20 flex justify-center items-center w-full h-full bg-[#6c757d7a]"
      >
        <div className={clsx(
          "relative bg-white rounded-[0.5rem]",
          "h-[90vh] w-full",
          sizeModal === 'small' && "max-w-[30rem] max-h-[20rem]",
          sizeModal === 'medium' && "max-w-[50rem] max-h-[30rem]",
          sizeModal === 'large' && "max-w-[70rem] max-h-[65rem]",
          !sizeModal && "max-w-[50rem]",
          "flex flex-col justify-between",
        )}>
          {/* Modal header */}
          <div className="flex items-center justify-between pt-[1.5rem] px-[1.5rem]">
            <span className="m-0 text-[1.25rem] font-medium text-[#262626]">{title}</span>
            <button
              type="button"
              onClick={() => {
                handleModal();
              }}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="pt-[1.5rem] p-[1rem] overflow-auto">
            {children}
          </div>
          <div className="flex justify-end gap-[0.75rem] px-[1rem] py-[1rem]">
            <ButtonComponent
              className="secondary"
              label="Cancelar"
              onClick={handleModal}
            />
            <ButtonComponent
              className="primary"
              label={labelBtnAccept || "Agregar"}
              onClick={handleSubmit}
            />
          </div>
          <div className="flex flex-row gap-[1rem]">
            <div className="bg-[#FC4554] h-[0.5rem] w-[64%] rounded-bl-[0.5rem]"></div>
            <div className="bg-[#FFD464] h-[0.5rem] w-[18%]"></div>
            <div className="bg-[#610CF4] h-[0.5rem] w-[18%] rounded-br-[0.5rem]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
