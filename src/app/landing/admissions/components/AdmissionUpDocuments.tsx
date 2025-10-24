"use client";

import React, { useEffect, useState } from "react";
import TableComponent, { SimpleTableColumn } from "@/components/shared/table/TableComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { AdmissionsLandingService } from "@/services/landing/admissions/admissions-service";
import Image from "next/image";
import { Tooltip } from "primereact/tooltip";
import ModalAddDocument from "./ModalAddDocument";

interface AdmissionUpDocumentsProps {
  infoApplication: any;
}

export default function AdmissionUpDocuments({
  infoApplication,
}: AdmissionUpDocumentsProps) {
  const [requiredDocuments, setRequiredDocuments] = useState<any[]>([]);
  const [modalDocument, setModalDocument] = useState<boolean>(false);
  const [dataInfoDocument, setDataInfoDocument] = useState<any>(null);
  const columns = [
    { key: "name", nameField: "Descripción", render: (row: any) => (<>
      <Tooltip target=".tt-info" />
      <div className="w-full flex gap-[0.625rem]">
          {row.name}
          <Image
            src={"/assets/icon/help.svg"}
            alt="Document"
            className="tt-info"
            data-pr-tooltip={row.description}
            data-pr-position="top"
            width={24}
            height={24}
            loading="lazy"
          />
      </div>
      </>)
    },
    { key: "process", nameField: "Documento" },
    {
      key: "#",
      nameField: "Acciones",
      render: (row: any) => (
        <div className="w-full py-[0.375rem]">
          <ButtonComponent
            className="tertiary-outline"
            size="small"
            onClick={() => handleDocument(row)}
            icon={{ path: "/assets/icon/upload-04.svg", alt: "icon upload" }}
            label="Cargar"
            iconPosition="left"
          />
        </div>
      ),
    },
  ];

  const handleDocument = (infoDocument: any) => {
    setModalDocument(true);
    setDataInfoDocument(infoDocument);
  };

  const getDetailAdmissionsProcess = async (application: any) => {
    const admissionProcessId = application.admissionProcessId;
    try {
      const response =
        await AdmissionsLandingService.getDetailAdmissionsProcess(
          admissionProcessId
        );

      if (response.admissionProcessId) {
        let requiredDocuments = response.requiredDocuments.map((item: any) => {
          return {
            ...item,
            applicationId: application.applicationId
          }
        })
        setRequiredDocuments(requiredDocuments);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetailAdmissionsProcess(infoApplication);
  }, [infoApplication]);

  return (<>
    <div className="flex flex-col">
      <div className="p-[1rem]">
        <span className="m-0 font-medium text-[1.125rem] leading-[100%]">
          Documentación
        </span>
      </div>
      <div className="pl-[1rem] pr-[1rem] pb-[1rem]"></div>
      <TableComponent
        title="Solicitudes realizadas"
        columns={columns}
        data={requiredDocuments}
      />
    </div>

    {
      modalDocument &&
      <ModalAddDocument infoDocument={dataInfoDocument} toggleModal={() => setModalDocument(false)} />
    }
  </>);
}
