"use client";

import React, { useEffect, useState } from "react";
import { DateUtils } from "@/utils/date-utils";
import TableComponent from "@/components/shared/table/TableComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { Statuses } from "@/app/core/enums/academic-enums";
import CardPaymentRegistrations from "./CardPaymentRegistrations";
import { PaymentsParentsService } from "@/services/landing/parent/paymentsParents-service";
import { showToast } from "@/utils/alerts";
import { formatCurrency } from "@/utils/format-number";

const TabRegistrations: React.FC<{
  registrationsParent: any[];
  submitPayment: () => void;
}> = ({ registrationsParent, submitPayment }) => {
  const [isSubmittingPayment, setIsSubmittingPayment] =
    useState<boolean>(false);
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
          icon={
            isSubmittingPayment
              ? undefined
              : { path: `/assets/icon/arrow-right.svg`, alt: "arrow right" }
          }
          size="small"
          iconPosition="right"
          blockAccess={isSubmittingPayment}
          isSpinner={true}
          onClick={() => {
            handleSubmitPayment(row);
          }}
          label={"Pagar"}
        />
      ),
    },
  ];
  const handleSubmitPayment = async (row: any) => {
    setIsSubmittingPayment(true);
    try {
      const resp = await PaymentsParentsService.submitPayment(row.id);
      if (resp?.success) {
        showToast("Pago realizado", "success");
        submitPayment();
      }
      setIsSubmittingPayment(false);
    } catch (error: any) {
      setIsSubmittingPayment(false);
      showToast("Error al realizar el pago", "error");
      console.error(error);
    }
  };
  const getGradesRegistration = (registration: any) => {
    let grades: any[] = [];
    grades.push({
      ...registration,
      amount: formatCurrency(registration.amount.toString()),
    });
    return grades;
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      {registrationsParent.map((registration: any, idx: number) => (
        <CardPaymentRegistrations
          key={idx}
          isSubmittingPayment={isSubmittingPayment}
          title={registration.paymentConceptName}
          grades={getGradesRegistration(registration)}
          periodRegistration={[
            registration.paymentFrom,
            registration.paymentUntil,
          ]}
          selectedRegistation={handleSubmitPayment}
        />
      ))}
    </div>
  );
};

export default TabRegistrations;
