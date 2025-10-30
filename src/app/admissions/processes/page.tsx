"use client";

import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent"

import style from "@/app/font.module.css";
import { useEffect, useState } from "react";
import CardActionComponent from "@/components/shared/cardAction/CardActionComponent";
import { AdmissionsServices } from "@/services/admissions/admissions-service";
import ModalAdmissionsForm from "../components/ModalAdmissionProcess";
import TableComponent from "@/components/shared/table/TableComponent";
import { useUI } from "@/providers/ui-context";
import { ButtonActions } from "../../core/interfaces/tables-interfaces";
import { showToast } from "@/utils/alerts";

const AdmissionsProcessesPage: React.FC = () => {
  const {
    toggleLoading,
    iconsActions,
    toggleModule
  } = useUI();
  const [openModal, setOpenModal] = useState<{open: boolean, data: any, op: "view" | "edit" | "add"}>({open: false, data: null, op: "add"});
  const [admissionsProcess, setAdmissionsProcess] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  
  const iconEdit = iconsActions.edit;
  const iconDetail = iconsActions.view;

  const columns = [
    {key: "name", nameField: "Nombre"},
    {key: "academicYear", nameField: "Año Academico"},
    {key: "startDate", nameField: "Fecha Inicio"},
    {key: "endDate", nameField: "Fecha Cierre"},
    {key: "status", nameField: "Estado", render: (row: any) => (
      <div className={`m-0 font-semibold text-center max-w-[80%] py-[0.25rem] px-[0.75rem] rounded-[0.5rem] ${
        row.status === "Activo" ?
        "text-green-600 bg-[#00ff0042] border-2 border-solid border-[#00ff00]" : 
        "text-amber-600 bg-[#ffff0042] border-2 border-solid border-[#ffcd00]"}`}>{row.status}</div>
    )},
  ]
  const btnActions = (item: any): ButtonActions[] =>{
    return [
      {
        tooltip: "Detalle Proceso de Admision",
        action: () => {
          setOpenModal({open: true, data: item, op: "view"});
        },
        icon: iconDetail,
      },
      {
        tooltip: "Editar Proceso de Admision",
        action: () => {
          setOpenModal({open: true, data: item, op: "edit"});
        },
        icon: iconEdit,
      },
    ]
  }
  const getAdmissionsProcess = async (page: number = 1, size: number = 5) => {
    toggleLoading(true);
    const resp = await AdmissionsServices.getAdmissionsProcess({ page: page - 1, size: size });
    if (resp?.success && resp.data?.content) {
      setAdmissionsProcess(resp.data.content);
      setTotalItems(resp.data.totalElements);
      toggleLoading(false);
    } else {
      showToast("Error al obtener los procesos de admision", "error");
    }
    toggleLoading(false);
  }

  const toggleModalAdmissionForm = () => {
    setOpenModal({open: !openModal.open, data: null, op: "add"});
    getAdmissionsProcess();
  }

  useEffect(() => {
    toggleModule("admissions-process");
    getAdmissionsProcess();
  }, []);

  useEffect(() => {
    getAdmissionsProcess(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (<>
      <div
        className={clsx(
          `${style["font-outfit"]}`,
          "flex flex-col gap-[1.5rem]",
        )}
      >
        <div
          className={clsx(
              `flex md:justify-between items-center h-[3.125rem]`,
          )}
        >
          <span className="font-semibold text-[1.25rem] text-gray-900">
            Procesos de Admisiones
          </span>
          <BreadcumbComponent items={[{label: "Procesos de Admisiones"}]} />
        </div>
        <div className="flex flex-row justify-center gap-[1.5rem]">
          <CardActionComponent
            checked={admissionsProcess.length > 0}
            labelButton="Crear Proceso de Admisión"
            handleClick={() => {setOpenModal({open: true, data: null, op: "add"})}}
            img={{ path: "/assets/img/logo-curriculum.png", alt: "icon-school", w: 64, h: 56 }}
          />
        </div>
        <div className="p-2 bg-white rounded-[1rem]">
          <TableComponent
            title="Procesos de Admisiones"
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
              }
            }}
          />
        </div>
      </div>

      { openModal.open &&
        <ModalAdmissionsForm
          toggleModal={toggleModalAdmissionForm}
          writeData={openModal}
        />
      }
  </>)
}

export default AdmissionsProcessesPage
