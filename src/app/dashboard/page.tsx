"use client";

import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";

import style from "@/app/font.module.css";
import CardComponent from "@/components/dashboard/CardComponent";
import { useUI } from "@/providers/ui-context";
import ModalComponent from "@/components/dashboard/ModalComponent";
import NivelAcademicoForm from "@/components/dashboard/NivelAcademicoForm";
import GradoAcademicoForm from "@/components/dashboard/GradoAcademicoForm";
import DropTableComponent from "@/components/shared/drop-table/DropTable";

const AcademicDashboard = () => {
  const { isOpenModalNivel, toggleModalNivel, isOpenModalGrado, toggleModalGrado } = useUI();

  const columns = [
    { nameField: "Nombre del nivel académico" },
    { nameField: "Periodo académico" },
    { nameField: "Sede" },
    { nameField: "Valor nivel académico" },
    { nameField: "Acciones" },
  ]

  return (<>
    <div className="content-dashboard grid gap-[1.5rem]">
      <div className={`header-content flex flex-row justify-between items-center h-[3.125rem] ${style["font-roboto"]}`}>
        <span className="font-[700] text-[1.25rem]">Gestión Académica</span>
        <BreadcumbComponent />
      </div>
      <div className="flex flex-row justify-center gap-[1.5rem]">
        <CardComponent labelButton="Crear Colegio" />
        <CardComponent handleClick={toggleModalNivel} labelButton="Crear nivel académico" />
        <CardComponent handleClick={toggleModalGrado} labelButton="Crear grado académico" />
      </div>
      <DropTableComponent title="Nivel académico" columns={columns}></DropTableComponent>
    </div>
    { isOpenModalNivel &&
      <ModalComponent handlerModal={toggleModalNivel} title="Crear Nivel Académico">
        <NivelAcademicoForm />
      </ModalComponent>
    }
    { isOpenModalGrado &&
      <ModalComponent handlerModal={toggleModalGrado} title="Crear Grado Académico">
        <GradoAcademicoForm />
      </ModalComponent>
    }
  </>);
}

export default AcademicDashboard;