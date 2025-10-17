"use client";

import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";

import style from "@/app/font.module.css";
import { useEffect, useState } from "react";
import TableComponent from "@/components/shared/table/TableComponent";
import { useUI } from "@/providers/ui-context";
import { BranchesService } from "@/services/managementAcademic/branches-service";
import { BranchesResponse } from "@/app/core/interfaces/academicManagement/branches-interfaces";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { ButtonActions } from "@/app/core/interfaces/tables-interfaces";
import { AdmissionsServices } from "@/services/admissions/admissions-service";
import { showConfirm, showToast } from "@/utils/alerts";
import { Statuses } from "@/app/core/enums/academic-enums";
import { Tooltip } from "primereact/tooltip";
import Image from "next/image";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { Controller, useForm } from "react-hook-form";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import { CampusService } from "@/services/managementAcademic/campus-services";
import InputDateComponent from "@/components/shared/input/InputDateComponent";

const PreregistrationPage: React.FC = () => {
  const { toggleLoading, iconsActions } = useUI();

  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const statuses = [
    { value: "APPROVED", label: "Aprobado" },
    { value: "UNDER_REVIEW", label: "En revisión" },
    { value: "REJECTED", label: "Rechazado" },
    { value: "PENDING", label: "Pendiente" },
  ];
  const [preRegistrations, setPreRegistrations] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const iconDetail = iconsActions.view;
  const iconReject = {
    path: "/assets/icon/alert-triangle-01.svg",
    alt: "icon-reject",
  };
  const iconApprove = {
    path: "/assets/icon/alert-circle.svg",
    alt: "icon-approve",
  };
  const [campusDrop, setCampusDrop] = useState<any[]>([]);

  const getCampus = async () => {
    try {
      const campusResp = (await CampusService.getCampus({
        page: 0,
        size: 10,
      })) as Response<any>;
      if (campusResp?.success) {
        let campusDrop: any[] = [];
        if (!campusResp.data?.content) {
          showToast("No se encontraron colegios", "warning");
          return;
        }
        for (const campusItem of campusResp.data.content) {
          campusDrop.push({
            value: campusItem.id,
            label: campusItem.name,
          });
        }
        setCampusDrop(campusDrop);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  type StatusesIndex = keyof typeof Statuses;
  const columns = [
    { key: "parentName", nameField: "Nombre del padre" },
    { key: "parentEmail", nameField: "Email" },
    { key: "parentPhone", nameField: "Telefono" },
    { key: "campusName", nameField: "Colegio" },
    {
      key: "statusCode",
      nameField: "Estado",
      render: (row: any) => (
        <span
          className={`m-0 font-semibold py-[0.25rem] px-[0.75rem] rounded-[0.5rem] ${
            row.statusCode === "ACTIVE" || row.statusCode === "APPROVED"
              ? "text-green-600 bg-[#00ff0042] border-2 border-solid border-[#00ff00]"
              : row.statusCode === "UNDER_REVIEW"
                ? "text-blue-600 bg-[#0000ff42] border-2 border-solid border-[#0000ff]"
                : row.statusCode === "REJECTED"
                  ? "text-red-600 bg-[#ff000042] border-2 border-solid border-[#ff0000]"
                  : "text-amber-600 bg-[#ffff0042] border-2 border-solid border-[#ffcd00]"
          }`}
        >
          {Statuses[row.statusCode as StatusesIndex]}
        </span>
      ),
    },
    {
      key: "statusCodeAc",
      nameField: "Acciones",
      render: (row: any) => (
        <div className="flex">
          {Statuses[row.statusCode as StatusesIndex] === "Pendiente" ? (
            <>
              <Tooltip target=".tooltip-target1" />
              <div
                onClick={() => handleReview(row)}
                className="mr-3 cursor-pointer tooltip-target1"
                data-pr-tooltip={"Revisar"}
                data-pr-position="top"
              >
                <Image
                  src={iconDetail.path}
                  alt={iconDetail.alt}
                  width={20}
                  height={20}
                />
              </div>
            </>
          ) : (
            <>
              <Tooltip target=".tooltip-target2" />
              <div
                onClick={() => handleApprove(row)}
                className="mr-3 cursor-pointer tooltip-target2"
                data-pr-tooltip={"Aprobar"}
                data-pr-position="top"
              >
                <Image
                  src={iconApprove.path}
                  alt={iconApprove.alt}
                  width={20}
                  height={20}
                />
              </div>

              <Tooltip target=".tooltip-target3" />
              <div
                onClick={() => handleReject(row)}
                className="mr-3 cursor-pointer tooltip-target3"
                data-pr-tooltip={"Rechazar"}
                data-pr-position="top"
              >
                <Image
                  src={iconReject.path}
                  alt={iconReject.alt}
                  width={20}
                  height={20}
                />
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleReview = async (row: any) => {
    toggleLoading(true);
    const resp = await AdmissionsServices.admissionProcessReview(row.id, {
      status: "UNDER_REVIEW",
    });
    if (resp?.id) {
      showToast("Proceso de admision a revisar", "success");
      getPreregisters(currentPage);
    } else {
      showToast("Error al revisar el proceso de admision", "error");
    }
    toggleLoading(false);
  };
  const handleReject = async (row: any) => {
    const consfirm = await showConfirm(
      "Está seguro?",
      `está apunto de rechazar el pre-registro de ${row.parentName}`,
      "warning"
    );
    if (consfirm) {
      toggleLoading(true);
      const resp = await AdmissionsServices.admissionProcessReject(row.id, {
        reason: "Rechazado",
      });
      if (resp?.id) {
        showToast("Proceso de admision rechazado", "success");
        getPreregisters(currentPage);
      } else {
        showToast("Error al rechazar el proceso de admision", "error");
      }
      toggleLoading(false);
    }
  };
  const handleApprove = async (row: any) => {
    const consfirm = await showConfirm(
      "Está seguro?",
      `está apunto de aprobar el pre-registro de ${row.parentName}`,
      "warning"
    );
    if (consfirm) {
      const resp = await AdmissionsServices.admissionProcessApprove(row.id);
      if (resp?.id) {
        showToast("Proceso de admision aprobado", "success");
        getPreregisters(currentPage);
      } else {
        showToast("Error al aprobar el proceso de admision", "error");
      }
    }
  };

  const getPreregisters = async (
    page?: number,
    campusId: string = "",
    status: string = "",
    dateFrom: string = "",
    dateTo: string = ""
  ) => {
    toggleLoading(true);
    const resp = await AdmissionsServices.getAdmissionsPreRegister(
      { page: page ? page - 1 : 0, size: 10},
      campusId,
      status,
      dateFrom,
      dateTo
    );
    if (resp?.content) {
      const bran = resp.content.map((branch: any) => {
        return {
          ...branch,
          statusCodeAc: branch.statusCode,
        };
      });
      setPreRegistrations(bran);
      setTotalItems(resp.totalElements);
    } else {
      showToast("Error al obtener los procesos de admision", "error");
    }
    toggleLoading(false);
  };

  useEffect(() => {
    getCampus();
  }, []);

  useEffect(() => {
    getPreregisters(currentPage, getValues("campus"), getValues("status"), getValues("dateFrom"), getValues("dateTo"));
  }, [watch("campus"), watch("status"), watch("dateFrom"), watch("dateTo")]);

  useEffect(() => {
    getPreregisters(currentPage);
  }, [currentPage]);

  return (
    <>
      <div
        className={clsx(
          `${style["font-outfit"]}`,
          "flex flex-col gap-[1.5rem]"
        )}
      >
        <div className={clsx(`flex justify-between items-center h-[3.125rem]`)}>
          <span className="font-semibold text-[1.25rem] text-gray-900">
            Pre Registros
          </span>
          <BreadcumbComponent items={[{ label: "Pre Registros" }]} />
        </div>
        <div  className={clsx(
            "grid grid-cols-5 gap-[1rem] px-[1.25rem] py-[1rem] w-full",
            "bg-white rounded-[1rem]"
          )}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <DropdownComponent
                name="status"
                label="Estado"
                className="primary"
                placeholder="Escoger estado"
                options={statuses}
                onChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              />
            )}
          />

          <Controller
            name="campus"
            control={control}
            render={({ field }) => (
              <DropdownComponent
                name="campus"
                label="Colegios"
                className="primary"
                placeholder="Escoger colegio"
                options={campusDrop}
                onChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
              />
            )}
          />

          <InputDateComponent
            label="Desde.."
            viweType="date"
            name="dateFrom"
            control={control}
          />

          <InputDateComponent
            label="Hasta.."
            viweType="date"
            control={control}
            name="dateTo"
          />
          <div className="flex justify-center items-center mt-[0.75rem]">
          <ButtonComponent
              className="primary"
              onClick={() => {reset(); getPreregisters();}}
              label={"Limpiar"}
          /></div>
        </div>
        <div className="p-2 bg-white rounded-[1rem]">
          <TableComponent
            title="Procesos de Admisiones"
            columns={columns}
            data={preRegistrations}
            paginate={{
              totalItems: totalItems,
              itemsPerPage: 10,
              currentPage: currentPage,
              onPageChange: (newPage: number) => {
                setCurrentPage(newPage);
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PreregistrationPage;
