"use client";

import { useState } from "react";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import style from "@/app/font.module.css";
import CardComponent from "@/components/dashboard/CardComponent";
import AcademicManagementForm from "@/components/academicManagement/AcademicManagement";

const AcademicDashboard: React.FC = () => {
  const columns = [
    { nameField: "Nombre del nivel académico" },
    { nameField: "Periodo académico" },
    { nameField: "Sede" },
    { nameField: "Valor nivel académico" },
    { nameField: "Acciones" },
  ]

const [openForm, setOpenForm] = useState(false);

const toggleCreateSchool = () => {
  setOpenForm(prev => !prev);
};

  return (<>
  {
    openForm ? <AcademicManagementForm onBack={toggleCreateSchool} /> :
    <div className="content-dashboard grid gap-[1.5rem]">
      <div className={`header-content flex flex-row justify-between items-center h-[3.125rem] ${style["font-roboto"]}`}>
        <span className="font-[700] text-[1.25rem]">Gestión Académica</span>
        <BreadcumbComponent />
      </div>
      <div className="flex flex-row justify-center gap-[1.5rem]">
        <CardComponent handleClick={toggleCreateSchool} labelButton="Crear Colegio" />
      </div>
    </div>
  }
  </>);
}

export default AcademicDashboard;