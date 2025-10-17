"use client";

import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent"

import style from "@/app/font.module.css";
import { useEffect, useState } from "react";
import CardActionComponent from "@/components/shared/cardAction/CardActionComponent";
import { AdmissionsServices } from "@/services/admissions/admissions-service";
import ModalAdmissionsForm from "../components/ModalAdmissionProcess";
import TableComponent from "@/components/shared/table/TableComponent";
import { ProgressSpinner } from "primereact/progressspinner";
import { useUI } from "@/providers/ui-context";
import { ButtonActions } from "../../core/interfaces/tables-interfaces";
import { showToast } from "@/utils/alerts";

const AdmissionsProcessesPage: React.FC = () => {
  const {
    toggleLoading,
    iconsActions
  } = useUI();
  const [openModal, setOpenModal] = useState<{open: boolean, data: any, op: "view" | "edit" | "add"}>({open: false, data: null, op: "add"});
  const [admissionsProcess, setAdmissionsProcess] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const iconEdit = iconsActions.edit;
  const iconDetail = iconsActions.view;

  const columns = [
    {key: "name", nameField: "Nombre"},
    {key: "academicYear", nameField: "Año Academico"},
    {key: "startDate", nameField: "Fecha Inicio"},
    {key: "endDate", nameField: "Fecha Cierre"},
    {key: "status", nameField: "Estado", render: (row: any) => (
      <span className={`m-0 font-semibold py-[0.25rem] px-[0.75rem] rounded-[0.5rem] ${
        row.status === "Activo" ?
        "text-green-600 bg-[#00ff0042] border-2 border-solid border-[#00ff00]" : 
        "text-amber-600 bg-[#ffff0042] border-2 border-solid border-[#ffcd00]"}`}>{row.status}</span>
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
  const getAdmissionsProcess = async () => {
    toggleLoading(true);
    const resp = await AdmissionsServices.getAdmissionsProcess();
    if (resp?.success && resp.data?.content) {
      setAdmissionsProcess(resp.data.content);
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
    getAdmissionsProcess();
  }, []);

  return (<>
      <div
        className={clsx(
          `${style["font-outfit"]}`,
          "flex flex-col gap-[1.5rem]",
        )}
      >
        <div
          className={clsx(
              `flex justify-between items-center h-[3.125rem]`,
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
              totalItems: admissionsProcess.length,
              itemsPerPage: 10,
              currentPage: currentPage,
              onPageChange: (newPage: number) => {setCurrentPage(newPage)}
            }}
          />
        </div>
        {/* <div className="flex flex-col gap-[1.5rem]">
          <SearchCampusComponent changeValue={(value) => handleSearchChange(value)} />
          <div className="flex flex-col">
            <div className="flex">
              { branches && branches.length > 0 &&
                branches.map((branch) => (
                  <TabsComponent
                    key={branch.id}
                    label={branch.name}
                    icon={iconSchool}
                    isActive={branch.display ? true : false}
                  />
                ))
              }
            </div>
          </div>
        </div> */}
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
