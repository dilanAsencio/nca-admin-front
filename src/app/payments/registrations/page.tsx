"use client";

import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";

import style from "@/app/font.module.css";
import { useEffect, useState } from "react";
import CardActionComponent from "@/components/shared/cardAction/CardActionComponent";
import { AdmissionsServices } from "@/services/admissions/admissions-service";
import TableComponent from "@/components/shared/table/TableComponent";
import { useUI } from "@/providers/ui-context";
import { ButtonActions } from "../../core/interfaces/tables-interfaces";
import { showToast } from "@/utils/alerts";
import { RegistrationsService } from "@/services/registrations/registrations-service";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import { Controller, useForm } from "react-hook-form";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";

const RegistrationsPage: React.FC = () => {
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
  const [admissionsProcess, setAdmissionsProcess] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const iconEdit = iconsActions.edit;
  const iconDetail = iconsActions.view;

  const columns = [
    { key: "name", nameField: "Estudiante" },
    { key: "academicYear", nameField: "Colegio" },
    { key: "startDate", nameField: "Grados" },
    { key: "endDate", nameField: "Fechas" },
    { key: "2", nameField: "Acuerdo de pago" },
    {
      key: "3",
      nameField: "Estado",
      render: (row: any) => (
        <div
          className={`m-0 font-semibold text-center max-w-[80%] py-[0.25rem] px-[0.75rem] rounded-[0.5rem] ${
            row.status === "Activo"
              ? "text-green-600 bg-[#00ff0042] border-2 border-solid border-[#00ff00]"
              : "text-red-600 bg-[#ff000042] border-2 border-solid border-[#ff0000]"
          }`}
        >
          {row.status ?? "Pendiente de pago"}
        </div>
      ),
    },
  ];
  const btnActions = (item: any): ButtonActions[] => {
    return [
      {
        tooltip: "Detalle Proceso de Admision",
        action: () => {
          setOpenModal({ open: true, data: item, op: "view" });
        },
        icon: iconDetail,
      },
      {
        tooltip: "Editar Proceso de Admision",
        action: () => {
          setOpenModal({ open: true, data: item, op: "edit" });
        },
        icon: iconEdit,
      },
    ];
  };
  const getRegistrations = async (
    page: number = 1,
    size: number = 5,
    academicYear: number = 0,
    isActive: boolean = true,
    isVigente: boolean = true
  ) => {
    toggleLoading(true);
    const resp = await RegistrationsService.getPaymentConcept(
      academicYear,
      isActive,
      isVigente,
      { page: page - 1, size: size }
    );
    if (resp?.success && resp.data?.content) {
      setAdmissionsProcess(resp.data.content);
      setTotalItems(resp.data.totalElements);
      toggleLoading(false);
    } else {
      showToast("Error al obtener los procesos de admision", "error");
    }
    toggleLoading(false);
  };

  useEffect(() => {
    toggleModule("payments-registrations");
    getRegistrations();
  }, []);

  useEffect(() => {
    getRegistrations(currentPage, itemsPerPage, getValues("academicYear"), getValues("isActive"), getValues("isVigente"));
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
            Pagos - Matriculas
          </span>
          <BreadcumbComponent items={[{ label: "Pagos-Matriculas" }]} />
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
                  setChecked={() => {
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
                  setChecked={() => {
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
                  getRegistrations();
                }}
                label={"Limpiar"}
              />
            </div>
          </div>
          <CardActionComponent
            checked={admissionsProcess.length > 0}
            labelButton="Crear Matricula"
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
            title="Matriculas"
            columns={columns}
            btnActions={btnActions}
            data={admissionsProcess}
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
    </>
  );
};

export default RegistrationsPage;
