"use client";

import React, { useEffect, useState } from "react";
import { DateUtils } from "@/utils/date-utils";
import TableComponent from "@/components/shared/table/TableComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { Statuses } from "@/app/core/enums/academic-enums";

const CardPaymentRegistrations: React.FC<{
  title: string;
  grades: any[];
  periodRegistration: string[];
  isSubmittingPayment: boolean;
  selectedRegistation: (process: any) => void;
}> = ({ title, periodRegistration = [], grades = [], selectedRegistation, isSubmittingPayment = false }) => {
  const columns = [
    { key: "studentName", nameField: "Estudiante" },
    { key: "campusName", nameField: "Colegio" },
    { key: "campusBranchName", nameField: "Sede" },
    { key: "gradeName", nameField: "Grado" },
    { key: "amount", nameField: "Valor" },
    {
      key: "statusName",
      nameField: "Estado",
      render: (row: any) => (
        <div
          className={`m-0 font-semibold text-center max-w-[80%] py-[0.25rem] px-[0.75rem] w-max rounded-[0.5rem] ${
            row.statusName === "Activo" ||
            row.statusName === "Aprobado" ||
            row.statusName === "Enviado"
              ? "text-green-600 bg-[#00ff0042] border-2 border-solid border-[#2dd42d]"
              : row.statusName === "Bajo revision"
                ? "text-blue-600 bg-[#0000ff42] border-2 border-solid border-[#2727ad]"
                : row.statusName === "Rechazado"
                  ? "text-red-600 bg-[#ff000042] border-2 border-solid border-[#bd2828]"
                  : "text-amber-600 bg-[#ffff0042] border-2 border-solid border-[#caa925]"
          }`}
        >
          {row.statusName ?? "N/A"}
        </div>
      ),
    },
    {
      key: "status",
      nameField: "Acción",
      render: (row: any) => (
        <ButtonComponent
          className="primary"
          icon={isSubmittingPayment ? undefined : {path: `/assets/icon/arrow-right.svg`, alt: "arrow right"}}
          size="small"
          iconPosition="right"
          blockAccess={isSubmittingPayment || row.statusName === "Aprobado"}
          isSpinner={row.statusName === "Aprobado" ? false : true}
          onClick={() => {selectedRegistation(row)}}
          label={"Pagar"}
        />
      ),
    },
  ];

  return (
    <>
      <div className="p-[1rem] border-1 border-solid border-[#610CF4] rounded-[0.5rem] flex flex-col gap-[0.75rem]">
        <span className="m-0 font-medium text-[1.125rem] text-gray-900 flex justify-between">
          <h2 className="m-0 self-center">{title}</h2>
          <div className="flex flex-col justify-center border-2 border-solid border-[#FC5C69] p-[0.5rem] rounded-[1rem]">
            <span className="text-center font-bold">
              Matricula valida
            </span>
            <div className="flex">
              <span>
                <b>Desde el:</b>{" "}
                {DateUtils.formatDate(periodRegistration[0], false, true)}
              </span>
              <span className="ml-1">
                <b>Hasta el:</b>{" "}
                {DateUtils.formatDate(periodRegistration[1], false, true)}
              </span>
            </div>
          </div>
        </span>
        <TableComponent
          columns={columns}
          data={grades}
        />
      </div>
    </>
  );
};

export default CardPaymentRegistrations;
