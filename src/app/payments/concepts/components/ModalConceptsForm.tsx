"use client";

import React, { useEffect, useState } from "react";
import { useUI } from "@/providers/ui-context";
import { FormProvider, useForm } from "react-hook-form";
import ModalComponent from "@/components/ui/ModalComponent";
import style from "@/app/font.module.css";
import ConceptsForm from "./ConceptsForm";
import clsx from "clsx";
import { PaymentConfigSchema, PaymentConfigType } from "../core/schemas/payments-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentsConceptsService } from "@/services/admin/payments/paymentsConcepts-service";
import { PaymentConfig } from "../core/interfaces/paymentsConcepts-interfaces";
import { formatCurrency, unformatCurrency } from "@/utils/format-number";
import { showToast } from "@/utils/alerts";

const ModalConceptForm: React.FC<{
  toggleModal: () => void;
  writeData: {
    open: boolean;
    data: any;
    op: "view" | "edit" | "add";
  };
}> = ({ toggleModal, writeData }) => {
  const { toggleLoading } = useUI();
  const [currentConceptPayment, setCurrentConceptPayment] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const methods = useForm<PaymentConfigType>({
    resolver: zodResolver(PaymentConfigSchema),
  });

  const getPaymentConceptsById = async (paymentConceptId: string) => {
    if (paymentConceptId === "" || paymentConceptId === undefined) return;
    const resp =
      await PaymentsConceptsService.getPaymentConceptById(paymentConceptId);
    if (resp?.success) {
      methods.reset(resp.data);
      methods.setValue("amount", formatCurrency(resp.data.amount));
      setCurrentConceptPayment(resp.data);
    } else {
      showToast(
        "Error al obtener la información del concepto de pago",
        "error"
      );
    }
  };

  const onSubmited = async (data: PaymentConfigType) => {
    toggleLoading(true);
    const dto: PaymentConfig = { 
      ...data,
      amounts: [{
        gradeId: data.gradeId,
        amount: unformatCurrency(data.amount),
        currency: data.currency
      }],
      active: true
    };
    
    try {
      let resp: any;
      if (isEdit) {
        resp = await PaymentsConceptsService.updatePaymentConcept(dto, currentConceptPayment.id);
      } else {
        resp = await PaymentsConceptsService.createPaymentConcept(dto);
      }
      if (resp.success) {
        showToast(
          `Concepto de pago ${writeData.op === "add" ? "creado" : "actualizado"} con exito`,
          "success"
        );
        handleCloseModal();
        toggleLoading(false);
      } else {
        showToast(
          `Error al ${writeData.op === "add" ? "crear" : "actualizar"} el Concepto de pago`,
          "error"
        );
      }
      toggleLoading(false);
    } catch (error: any) {
      showToast(
        `Error al ${writeData.op === "add" ? "crear" : "actualizar"} el Concepto de pago: ${error?.error?.details?.message}`,
        "error"
      )
      toggleLoading(false);
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    toggleModal();
    setCurrentConceptPayment(null);
    methods.reset();
  };

  const handleTitleModal = () => {
    if (writeData.op === "edit") {
      return "Editar Concepto de Pago";
    }
    if (writeData.op === "view") {
      return "Detalle Concepto de Pago";
    }
    return "Crear Concepto de Pago";
  };

  useEffect(() => {
    if (writeData.open && writeData.data) {
      methods.reset(writeData.data);
      writeData.op === "edit" ? setIsEdit(true) : setIsEdit(false);
      getPaymentConceptsById(writeData.data.id);
    }
  }, [writeData.open]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmited)}
        className={clsx("space-y-6", style["font-outfit"])}
      >
        <ModalComponent
          title={handleTitleModal()}
          sizeModal="large"
          labelBtnAccept={isEdit ? "Actualizar concepto" : "Crear concepto"}
          handleModal={() => {
            handleCloseModal();
          }}
        >
          <ConceptsForm
            currentData={writeData.op === "add" ? undefined : currentConceptPayment}
            isEdit={isEdit}
          />
          {/* <FormDebug errors={methods.formState.errors} /> */}
        </ModalComponent>
      </form>
    </FormProvider>
  );
};

export default ModalConceptForm;
