"use client";

import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";

import style from "@/app/font.module.css";
import { useEffect, useState } from "react";
import CardActionComponent from "@/components/shared/cardAction/CardActionComponent";
import TableComponent from "@/components/shared/table/TableComponent";
import { useUI } from "@/providers/ui-context";
import { ButtonActions } from "../../core/interfaces/tables-interfaces";
import { showConfirm, showToast } from "@/utils/alerts";
import { PaymentsConceptsService } from "@/services/admin/payments/paymentsConcepts-service";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import { Controller, useForm } from "react-hook-form";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import ModalConceptForm from "./components/ModalConceptsForm";
import { PaymentConceptResponse } from "./core/interfaces/paymentsConcepts-interfaces";
import { formatCurrency } from "@/utils/format-number";
import { DateUtils } from "@/utils/date-utils";

const ConceptPage: React.FC = () => {
  const { toggleLoading, iconsActions, toggleModule } = useUI();
  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState<{
    open: boolean;
    data: any;
    op: "view" | "edit" | "add";
  }>({ open: false, data: null, op: "add" });
  const [paymentConcept, setPaymentConcept] = useState<PaymentConceptResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const iconEdit = iconsActions.edit;
  const iconReject = iconsActions.reject;
  const iconApprove = iconsActions.approve;

  const columns: any = [
    { key: "name", nameField: "Nombre" },
    { key: "paymentPurposeName", nameField: "Tipo" },
    { key: "ammountFormat", nameField: "Monto" },
    { key: "academicYear", nameField: "Año" },
    { key: "campusName", nameField: "Colegio" },
    { key: "gradeName", nameField: "Grado" },
    { key: "dateUntilFormat", nameField: "Fecha de vencimiento" },
    {
      key: "statusName",
      nameField: "Estado",
      render: (row: any) => (
        <div
          className={`m-0 font-semibold text-center max-w-[80%] py-[0.25rem] px-[0.75rem] rounded-[0.5rem] ${
            row.statusName === "Activo"
              ? "text-green-600 bg-[#00ff0042] border-2 border-solid border-[#00ff00]"
              : "text-red-600 bg-[#ff000042] border-2 border-solid border-[#ff0000]"
          }`}
        >
          {row.statusName ?? "N/A"}
        </div>
      ),
    },
  ];
  const btnActions = (item: any): ButtonActions[] => {
    return [
      {
        tooltip: "Editar Concepto de Pago",
        action: () => {
          setOpenModal({ open: true, data: item, op: "edit" });
        },
        icon: iconEdit,
      },
      {
        tooltip: `${item.statusName === "Activo" ? "Desactivar" : "Activar"} Concepto de Pago`,
        action: () => {
          confirmToggleStatus(item);
        },
        icon: item.statusName === "Activo" ? iconReject : iconApprove,
      },
    ];
  };
  const getPaymentConcept = async (
    page: number = 1,
    size: number = 5,
    academicYear: number = 0,
    isActive: boolean | null = null,
    isVigente: boolean | null = null
  ) => {
    toggleLoading(true);
    const resp = await PaymentsConceptsService.getPaymentConcept(
      academicYear,
      isActive,
      isVigente,
      { page: page - 1, size: size }
    );
    if (resp?.success) {
      const data = resp.data.content as PaymentConceptResponse[];

      setPaymentConcept(data.map((item) => ({
        ...item,
        ammountFormat: formatCurrency(item.amount?.toString() ?? "0") ?? 0,
        dateUntilFormat: DateUtils.formatDate(item.paymentUntil),
      })));
      setTotalItems(resp.data.totalElements);
      toggleLoading(false);
    } else {
      showToast("Error al obtener los procesos de admision", "error");
    }
    toggleLoading(false);
  };

  const confirmToggleStatus = async (row: any) => {
    const confirm = await showConfirm(
      "Precaucion!",
      `¿Estás seguro de ${row.statusName === "Activo" ? "desactivar" : "activar"} este concepto de pago?`,
      "warning"
    );
    if (confirm) {
      toggleLoading(true);
      const status = row.statusName === "Activo" ? "INACTIVE" : "ACTIVE";
      try {
        const resp = await PaymentsConceptsService.updatePaymentConceptStatus(row.id, status);
        if (resp?.success) {
          showToast(`Concepto de pago ${row.statusName === "Activo" ? "desactivado" : "activado"} con exito`, "success");
          getPaymentConcept();
        } else {
          showToast(`Error al ${row.statusName === "Activo" ? "desactivar" : "activar"} el concepto de pago`, "error");
        }
      } catch (error) {
        
      }
    }
    toggleLoading(false);
  }

  const toggleModalConceptsForm = () => {
    setOpenModal({ open: !openModal.open, data: null, op: "add" });
    getPaymentConcept();
  };

  useEffect(() => {
    toggleModule("payments-concepts");
    getPaymentConcept();
  }, []);

  useEffect(() => {
    getPaymentConcept(currentPage, itemsPerPage, getValues("academicYear"), getValues("isActive"), getValues("isVigente"));
  }, [currentPage, itemsPerPage, watch("isActive"), watch("isVigente"), watch("academicYear")]);

  return (
    <>
      <div
        className={clsx(
          `${style["font-outfit"]}`,
          "flex flex-col gap-[1.5rem]"
        )}
      >
        <div
          className={clsx(`flex md:justify-between items-center h-[3.125rem]`)}
        >
          <span className="font-semibold text-[1.25rem] text-gray-900">
            Gestión de conceptos de pago
          </span>
          <BreadcumbComponent items={[{ label: "Conceptos de pago" }]} />
        </div>
        <div className="flex flex-row gap-[1.5rem]">
          <div
            className={clsx(
              "grid grid-cols-4 items-center basis-1/2 gap-[1rem] px-[1.25rem] py-[1rem] w-full",
              "bg-white rounded-[0.5rem] shadow-[0_4px_12px_0px_rgba(17,62,47,0.07)]"
            )}
          >
            <InputComponent
              typeInput="number"
              placeholder="Año académico"
              className="text-right"
              name="academicYear"
              register={register("academicYear", {
                valueAsNumber: true,
                onChange: (e) => {
                  const value = e.target.value;
                  setValue("academicYear", value);
                },
              })}
            />
            <Controller
              name="isActive"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CheckBoxComponent
                  {...field}
                  checked={getValues("isActive")}
                  onChange={() => {
                    setValue(
                      "isActive",
                      !getValues("isActive")
                    );
                  }}
                  label="Activos"
                />
              )}
            />
            <Controller
              name="isVigente"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CheckBoxComponent
                  {...field}
                  checked={getValues("isVigente")}
                  onChange={() => {
                    setValue(
                      "isVigente",
                      !getValues("isVigente")
                    );
                  }}
                  label="Vigentes"
                />
              )}
            />
            <div className="flex justify-center items-center mt-[0.75rem]">
              <ButtonComponent
                className="primary"
                onClick={() => {
                  reset();
                  getPaymentConcept();
                }}
                label={"Limpiar"}
              />
            </div>
          </div>
          <CardActionComponent
            checked={paymentConcept.length > 0}
            labelButton="Crear Concepto"
            handleClick={() => {
              setOpenModal({ open: true, data: null, op: "add" });
            }}
            img={{
              path: "/assets/img/logo-curriculum.png",
              alt: "icon-school",
              w: 64,
              h: 56,
            }}
          />
        </div>
        <div className="p-2 bg-white rounded-[1rem] shadow-[0_7px_21px_0_#451A1A0A]">
          <TableComponent
            columns={columns}
            btnActions={btnActions}
            data={paymentConcept}
            paginate={{
              perPageOptions: [5],
              totalItems: totalItems,
              itemsPerPage: itemsPerPage,
              currentPage: currentPage,
              onPageChange: setCurrentPage,
              onItemsPerPageChange: (size) => {
                setItemsPerPage(size);
              },
            }}
          />
        </div>
      </div>

      {openModal.open && (
        <ModalConceptForm
          toggleModal={toggleModalConceptsForm}
          writeData={openModal}
        />
      )}
    </>
  );
};

export default ConceptPage;
