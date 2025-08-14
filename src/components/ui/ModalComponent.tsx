"use client";

import React from "react";
import { useUI } from "@/providers/ui-context";
import clsx from "clsx";
import ButtonComponent from "../shared/button/ButtonComponent";

const ModalComponent: React.FC<{
  title: string;
  children: React.ReactNode;
  handlerModal: () => void;
  handlerSubmit: () => void;
  labelBtnAccept?: string;
}> = ({ title, children, handlerModal, handlerSubmit, labelBtnAccept }) => {

  return (
    <>
      <div
        tabIndex={-1}
        className="fixed inset-0 z-20 flex justify-center items-center w-full h-full bg-[#6c757d7a]"
      >
        <div className={clsx(
          "relative bg-white rounded-[0.5rem]",
          "max-w-1/2 w-full"
        )}>
          {/* Modal header */}
          <div className="flex items-center justify-between pt-[1.5rem] px-[1.5rem]">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              type="button"
              onClick={() => {
                handlerModal();
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
          {children}
          <div className="flex justify-end gap-[0.75rem] px-[1.5rem] py-[0.5rem]">
            <ButtonComponent
              className="secondary"
              label="Cancelar"
              onClick={handlerModal}
            />
            <ButtonComponent
              className="primary"
              label={labelBtnAccept || "Agregar"}
              onClick={handlerSubmit}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="bg-[#FC4554] h-3 w-[85%] rounded-bl-[0.5rem]"></div>
            <div className="bg-[#FFD464] h-3 w-[15%] rounded-br-[0.5rem]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
