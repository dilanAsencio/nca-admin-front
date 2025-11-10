"use client";

import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";

import style from "@/app/font.module.css";
import { useEffect, useState } from "react";
import { AdmissionsServices } from "@/services/admissions/admissions-service";
import ModalAdmissionsForm from "../components/ModalAdmissionProcess";
import TableComponent from "@/components/shared/table/TableComponent";
import { useUI } from "@/providers/ui-context";
import { ButtonActions } from "../../core/interfaces/tables-interfaces";
import { showToast } from "@/utils/alerts";
import SearchComponent from "@/app/admissions/components/Search";
import TabsComponent from "@/components/shared/tabs/TabsComponent";
import { BranchesService } from "@/services/managementAcademic/branches-service";
import { BranchesResponse } from "@/app/core/interfaces/academicManagement/branches-interfaces";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { ApplicationsService } from "@/services/admissions/applications-service";
import { DateUtils } from "@/utils/date-utils";
import { Tooltip } from "primereact/tooltip";
import Image from "next/image";
import ModalComments from "./components/ModalComments";
import ModalApproved from "./components/ModalApprove";
import ModalReject from "./components/ModalReject";
import ModalDetail from "./components/ModalDetail";
import ButtonPopUpComponent from "@/components/shared/button/ButtonPopUp";

const AdmissionsProcessesPage: React.FC = () => {
  const { toggleLoading, iconsActions, toggleModule } = useUI();
  const [applications, setApplications] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [openComments, setOpenComments] = useState<{
    isOpen: boolean;
    applicationId: string | null;
  }>({ isOpen: false, applicationId: null });
  const [openApproved, setOpenApproved] = useState<{
    isOpen: boolean;
    applicationId: string | null;
  }>({ isOpen: false, applicationId: null });
  const [openReject, setOpenReject] = useState<{
    isOpen: boolean;
    applicationId: string | null;
  }>({ isOpen: false, applicationId: null });
  const [openDetail, setOpenDetail] = useState<{
    isOpen: boolean;
    applicationId: string | null;
  }>({ isOpen: false, applicationId: null });
  const iconApprove = iconsActions.approve;
  const iconReject = iconsActions.reject;
  const iconComment = iconsActions.comment;
  const iconDetail = iconsActions.view;

  const iconSchool = {
    path: "/assets/landing/icon/cards/school-icon-01.svg",
    alt: "icon-school",
  };

  const optionsActions = (row: any): { label: string; onClick: () => void, icon: {path: string; alt: string} }[] =>{
    return [
      {
        label: "Detalle solicitud",
        onClick: () => {
          setOpenDetail({ isOpen: true, applicationId: row.applicationId });
        },
        icon: iconDetail,
      },
      {
        label: "Aprobar solicitud",
        onClick: () => {
          setOpenApproved({
            isOpen: true,
            applicationId: row.applicationId,
          })
        },
        icon: iconApprove,
      },
      {
        label: "Rechazar solicitud",
        onClick: () => {
          setOpenReject({ isOpen: true, applicationId: row.applicationId })
        },
        icon: iconReject,
      },
      {
        label: "Agregar comentario",
        onClick: () => {
          setOpenComments({
            isOpen: true,
            applicationId: row.applicationId,
          });
        },
        icon: iconComment,
      },
    ]
  }
  const columns = [
    { key: "parentName", nameField: "Nombre Padre" },
    { key: "aspirantName", nameField: "Nombre Aspirante" },
    { key: "applicationNumber", nameField: "No. Solicitud" },
    { key: "campusName", nameField: "Colegio", render: (row: any) => (
        <span className="m-0">{row.campusName.toUpperCase()}</span>
    ) },
    { key: "gradeName", nameField: "Grado" },
    { key: "dateCr", nameField: "Fecha Creación", width: "w-[10rem]" },
    {
      key: "status",
      nameField: "Estado",
      render: (row: any) => (
        <span
          className={`m-0 font-semibold text-center max-w-[80%] py-[0.25rem] px-[0.75rem] rounded-[0.5rem] ${
            row.status === "Activo" || row.status === "Enviada"
              ? "text-green-600 bg-[#00ff0042] border-2 border-solid border-[#00ff00]"
              : "text-amber-600 bg-[#ffff0042] border-2 border-solid border-[#ffcd00]"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "statusR",
      nameField: "Acciones",
      render: (row: any) => (
        <ButtonPopUpComponent
          size="small"
          className="primary-outline"
          label="Acciones"
          options={optionsActions(row)}
        />
      ),
    },
  ];

  const handleSearchChange = (value: {
    campus?: string;
    branche?: string;
    grade?: string;
    status?: string;
  }) => {
    if (
      value.campus === undefined &&
      value.grade === undefined &&
      value.status === undefined &&
      value.branche === undefined
    ) {
      getAdmissionsProcess();
      return;
    }

    getAdmissionsProcess(value.branche, value.status, value.grade);
  };

  const getAdmissionsProcess = async (
    campusBrancheId?: string,
    status?: string,
    gradeId?: string
  ) => {
    toggleLoading(true);
    const resp = await ApplicationsService.getAdmissionsApplications(
      {
        page: currentPage - 1,
        size: itemsPerPage,
        sort: ["createdAt", "DESC"],
      }, 
      campusBrancheId,
      status,
      gradeId
    );

    if (resp.success) {
      const data = resp.data.content.map((item: any) => {
        return {
          ...item,
          parentName: item.parent.fullName,
          aspirantName: item.aspirant.fullName,
          campusName: item.campus.name,
          gradeName: item.grade.name,
          statusR: item.status,
          dateCr: DateUtils.formatDate(item.createdAt),
        };
      });
      
      setApplications(data);
      setTotalItems(resp.data.totalElements);
      toggleLoading(false);
    } else {
      showToast("Error al obtener las solicitudes", "error");
    }
    toggleLoading(false);
  };

  const toggleCommentsModal = () => {
    setOpenComments({ isOpen: false, applicationId: null });
  };
  const toggleApprovedModal = () => {
    setOpenApproved({ isOpen: false, applicationId: null });
  };
  const toggleRejectModal = () => {
    setOpenReject({ isOpen: false, applicationId: null });
  };
  const toggleDetailModal = () => {
    setOpenDetail({ isOpen: false, applicationId: null });
  };
  useEffect(() => {
    toggleModule("admissions-applications");
    getAdmissionsProcess();
  }, []);
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
            Solicitudes
          </span>
          <BreadcumbComponent items={[{ label: "Solicitudes" }]} />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <SearchComponent
            changeValue={(value) => handleSearchChange(value)}
          />
          <div className="flex flex-col">
            <div className="p-2 bg-white rounded-b-[1rem] shadow-[0_7px_21px_0_#451A1A0A]">
              <TableComponent
                columns={columns}
                data={applications}
                paginate={{
                  perPageOptions: [5],
                  totalItems: totalItems,
                  itemsPerPage: itemsPerPage,
                  currentPage: currentPage,
                  onPageChange: setCurrentPage,
                  onItemsPerPageChange: (size) => {
                    setItemsPerPage(size);
                    setCurrentPage(1);
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {openComments.isOpen && (
        <ModalComments
          applicationId={openComments.applicationId}
          toggleModal={toggleCommentsModal}
        />
      )}

      {openApproved.isOpen && (
        <ModalApproved
          onSubmit={() => getAdmissionsProcess()}
          applicationId={openApproved.applicationId}
          toggleModal={toggleApprovedModal}
        />
      )}

      {openReject.isOpen && (
        <ModalReject
          onSubmit={() => getAdmissionsProcess()}
          applicationId={openReject.applicationId}
          toggleModal={toggleRejectModal}
        />
      )}

      {openDetail.isOpen && (
        <ModalDetail
          applicatinoId={openDetail.applicationId}
          toggleModal={toggleDetailModal}
        />
      )}
    </>
  );
};

export default AdmissionsProcessesPage;
