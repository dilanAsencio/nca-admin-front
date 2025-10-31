"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { AdmissionsLandingService } from "@/services/landing/admissions/admissions-service";
import style from "@/app/font.module.css";
import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import TableComponent from "@/components/shared/table/TableComponent";
import { Statuses } from "@/app/core/enums/academic-enums";
import AdmissionApplicationForm from "./AdmissionApplicationsForm";
import Image from "next/image";

const MainAuthAdmissions: React.FC = () => {
  const router = useRouter();
  const [parentsAdmissionsProcess, setParentsAdmissionsProcess] = useState<any[]>([]);
  const [applicationsSelected, setApplicationsSelected] = useState<any>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<any>([
    { label: "Home", href: `/landing` },
    { label: "Admisiones" },
  ]);
  type StatusesIndex = keyof typeof Statuses;
  const columns = [
    { key: "applicationNumber", nameField: "No Solicitud" },
    { key: "aspirantName", nameField: "Nombre Aspirante" },
    { key: "campusName", nameField: "Colegio" },
    { key: "gradeName", nameField: "Grado" },
    { key: "value", nameField: "Valor" },
    {
      key: "status",
      nameField: "Estado",
      render: (row: any) => (
        <div
          className={`m-0 font-semibold text-center max-w-[80%] py-[0.25rem] px-[0.75rem] w-max rounded-[0.5rem] ${
            row.status === "ACTIVE" || row.status === "APPROVED" || row.status === "SUBMITTED"
              ? "text-green-600 bg-[#00ff0042] border-2 border-solid border-[#2dd42d]"
              : row.status === "UNDER_REVIEW"
                ? "text-blue-600 bg-[#0000ff42] border-2 border-solid border-[#2727ad]"
                : row.status === "REJECTED"
                  ? "text-red-600 bg-[#ff000042] border-2 border-solid border-[#bd2828]"
                  : "text-amber-600 bg-[#ffff0042] border-2 border-solid border-[#caa925]"
          }`}
        >
          {Statuses[row.status as StatusesIndex]}
        </div>
      ),
    },
    {
      key: "#",
      nameField: "Acción",
      render: (row: any) => (
        <ButtonComponent
          className="primary"
          icon={{path: "/assets/icon/arrow-right.svg", alt: "arrow right"}}
          size="small"
          iconPosition="right"
          onClick={() => {handleBreadcrumb("form", row)}}
          label={"Continuar"}
        />
      ),
    },
  ];

  const getParentsApplicationsProcess = async () => {
    try {
      const response = await AdmissionsLandingService.getApplicationsByParent();      
      if (response.length > 0) {
        setParentsAdmissionsProcess(response);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleBack = () => {
    handleBreadcrumb("back");
  }
  const handleBreadcrumb = (op: "form" | "back", row?: any ) => {
    switch (op) {
      case "form":
        setBreadcrumbs([
          { label: "Home", href: `/landing` },
          { label: "Admisiones", href: `/landing/admissions` },
          { label: "Proceso de admisiones" },
        ])
        setApplicationsSelected(row);
        break;

      case "back":
        setBreadcrumbs([
          { label: "Home", href: `/landing` },
          { label: "Admisiones" },
        ])
        setApplicationsSelected(null);
        getParentsApplicationsProcess();
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
    getParentsApplicationsProcess();
  }, []);

  return (<>
    <main
      className={clsx("flex flex-col justify-center", style["font-outfit"])}
    >
      <header className="flex justify-between py-[0.75rem] mb-1">
        <div className="flex items-center gap-[1rem]">
        <Image
          src={"/assets/icon/arrow-left.svg"}
          alt="icon-arrow-left"
          width={24}
          height={24}
          loading="lazy"
          onClick={() => handleBack()}
          className="cursor-pointer"
        />
          <h5 className="m-0 text-[1.25rem] text-gray-900 leading-[120%] font-medium">
            {applicationsSelected ? "Proceso de Admisión" : "Admisiones"}
          </h5>
        </div>

        <BreadcumbComponent className="max-md:hidden" items={breadcrumbs} />
      </header>
      {
        applicationsSelected ?
          <AdmissionApplicationForm onSubmited={() => {handleBreadcrumb("back")}} applicatino={applicationsSelected} />
        :
          <section className="flex flex-col w-full rounded-[0.5rem] bg-white p-[1.5rem]">
            { parentsAdmissionsProcess.length > 0 ?
              <TableComponent
                title="Solicitudes realizadas"
                columns={columns}
                data={parentsAdmissionsProcess}
              />
            :
              <div className="content-admissions flex flex-col gap-[100px] p-[1rem] border-1 border-solid border-[#610CF4] rounded-[0.5rem]">
                <div className="flex flex-col justify-center items-center gap-[0.5rem] py-[0.75rem]">
                  <div className="py-[0.75rem] px-[1rem] text-center">
                    <h5 className="font-medium text-[1.25rem]">
                      Aún no cuentas con procesos de admisiones!
                    </h5>
                    <p>Primero debes buscar un colegio. Presiona el botón</p>
                  </div>
                  <div className="">
                    <ButtonComponent
                      className="primary"
                      icon={{ path: "/assets/icon/school-icon.svg", alt: "school-icon" }}
                      label="Buscar Colegio "
                      onClick={() => {router.push("/landing/school");}}
                    />
                  </div>
                </div>
            </div> }
          </section>
      }
    </main>
  </>);
};

export default MainAuthAdmissions;
