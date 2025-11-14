"use client";

import { Controller, useFormContext } from "react-hook-form";
import InputComponent from "@/components/shared/input/InputComponent";
import InputDateComponent from "@/components/shared/input/InputDateComponent";
import { PaymentConfigType } from "../core/schemas/payments-schema";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import { ConceptsTypesService } from "@/services/admin/payments/conceptsTypes-service";
import { useEffect, useState } from "react";
import DropsSelectsGrade from "./SelectedGrade";
import { formatCurrency, unformatCurrency } from "@/utils/format-number";
import { currencyTypes } from "../core/constants/payments-constants";
import FormDebug from "@/components/shared/form/FormDebug";

interface Props {
  currentData?: any;
  isEdit: boolean;
}

export default function ConceptsForm({
  currentData,
  isEdit,
}: Props) {
  const {
    register,
    setValue,
    setError,
    control,
    getValues,
    formState: { errors },
  } = useFormContext<PaymentConfigType>();
  const [conceptsDrop, setConceptsDrop] = useState<any[]>([]);

  const handleFormatCurrency = (value: string) => {
    const formatedValue = formatCurrency(value);
    return formatedValue;
  };
  const getConceptsTypes = async () => {
    try {
      const resp = await ConceptsTypesService.getPaymentConceptTypes();
      if (resp?.success) {
        let concepts: any[] = [];
        for (const item of resp.data) {
          concepts.push({
            value: item.id,
            label: item.name,
          });
        }
        setConceptsDrop(concepts);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConceptsTypes();
  }, []);

  return (
    <>
      {/* Básicos */}
      <div className="grid grid-cols-3 gap-2">
        <InputComponent
          label="Concepto de pago"
          placeholder="Nombre del concepto de pago"
          name="name"
          className="capitalize"
          typeInput="text"
          
          register={register("name")}
          required
          error={errors.name && errors.name.message}
        />

        <InputComponent
          typeInput="number"
          label="Año académico"
          placeholder="El año académico debe ser mayor o igual al año actual"
          className="text-right"
          name="academicYear"
          
          register={register("academicYear", {
            valueAsNumber: true,
            onChange: (e) => {
              const currentYear = new Date().getFullYear();
              const value = e.target.value;
              if (value < currentYear) {
                setValue("academicYear", currentYear);
                setError("academicYear", {
                  type: "manual",
                  message:
                    "El año académico debe ser mayor o igual al año actual",
                });
              } else {
                setValue("academicYear", value);
                setError("academicYear", { type: "manual", message: "" });
              }
            },
          })}
          required
          error={errors.academicYear && errors.academicYear.message}
        />

        <Controller
          name={`paymentPurposeId`}
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="paymentPurposeId"
              label="Tipo de concepto de pago"
              className="primary"
              placeholder="Escoger tipo de concepto"
              options={conceptsDrop}
              onChange={(value) => field.onChange(value)}
              value={field.value}
              required
              error={errors.paymentPurposeId && errors.paymentPurposeId.message}
            />
          )}
        />

        <InputDateComponent
          label="Fecha desde"
          viweType="date"
          required
          
          name="paymentFrom"
          control={control}
          error={errors.paymentFrom && errors.paymentFrom.message}
        />

        <InputDateComponent
          label="Fecha hasta"
          viweType="date"
          required
          
          name="paymentUntil"
          control={control}
          error={errors.paymentUntil && errors.paymentUntil.message}
        />

        <Controller
          name={`currency`}
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="currency"
              label="tipo de moneda"
              className="primary"
              placeholder="Escoger tipo de moneda"
              options={currencyTypes}
              onChange={(value) => field.onChange(value)}
              value={field.value}
              required
              error={errors.currency && errors.currency.message}
            />
          )}
        />

        <InputComponent
          typeInput="text"
          label="Valor grado académico"
          placeholder="Valor grado académico"
          className="text-right"
          name="amount"
          
          register={register("amount", {
            onChange: (e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");              
              if (value === "") {
                setValue("amount", "");
                return;
              }
              if (unformatCurrency(value) === 0) {
                setError("amount", {
                  type: "manual",
                  message: "El valor debe ser mayor a 0",
                });
              } else {
                setError("amount", {
                  type: "manual",
                  message: "",
                });
                setValue("amount", handleFormatCurrency(value));
              }
            },
          })}
          required
          error={errors.amount && errors.amount.message}
        />

        <DropsSelectsGrade currentData={currentData} />
      </div>
    </>
  );
}
