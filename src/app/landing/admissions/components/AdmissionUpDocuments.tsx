"use client";

import React, { useEffect, useState } from "react";
import TableComponent from "@/components/shared/table/TableComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { AdmissionsLandingService } from "@/services/landing/admissions/admissions-service";
import Image from "next/image";
import { Tooltip } from "primereact/tooltip";
import ModalAddDocument from "./ModalAddDocument";
import { showConfirm, showToast } from "@/utils/alerts";

interface AdmissionUpDocumentsProps {
  infoApplication: any;
  saveDocument: () => void;
  deleteDocument: () => void;
}

export default function AdmissionUpDocuments({
  infoApplication, saveDocument, deleteDocument
}: AdmissionUpDocumentsProps) {
  const [requiredDocuments, setRequiredDocuments] = useState<any[]>([]);
  const [modalDocument, setModalDocument] = useState<boolean>(false);
  const [dataInfoDocument, setDataInfoDocument] = useState<any>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const columns = [
    {
      key: "name",
      nameField: "Descripción",
      render: (row: any) => (
        <>
          <Tooltip target=".tt-info" />
          <div className="flex gap-[0.625rem] w-max">
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
        </>
      ),
    },
    {
      key: "uploaded",
      nameField: "Documento",
      render: (row: any) => {
        return (
          <>
            {row.uploaded ? (
              <div className="w-max flex gap-[0.625rem]">
                <Image
                  src={"/assets/icon/file-attach-02.svg"}
                  alt="Document"
                  width={18}
                  height={18}
                  loading="lazy"
                />
                {row.uploaded}
              </div>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      key: "#",
      nameField: "Acciones",
      className: "justify-center",
      render: (row: any) => {
        return (
          <>
            {row.uploaded ? (
              <div onClick={() => handleDeleteDocument(row)} className="w-full flex items-center justify-center py-[0.375rem]">
              <Image
                src={"/assets/icon/x-02.svg"}
                alt="Document"
                className="cursor-pointer"
                width={24}
                height={24}
                loading="lazy"
              /></div>
            ) : (
              <div className="w-full flex items-center justify-center py-[0.375rem]">
                <ButtonComponent
                  className="tertiary-outline"
                  size="small"
                  onClick={() => handleDocument(row)}
                  icon={{
                    path: "/assets/icon/upload-04.svg",
                    alt: "icon upload",
                  }}
                  label="Cargar"
                  iconPosition="left"
                />
              </div>
            )}
          </>
        );
      },
    },
  ];

  const handleDocument = (infoDocument: any) => {
    setModalDocument(true);
    setDataInfoDocument(infoDocument);
  };

  const handleDeleteDocument = async (row: any) => {
    const confirm = await showConfirm(
      "Eliminar documento",
      "¿Desea eliminar el documento?",
      "warning"
    );
    if (!confirm) return;
    if (!applicationId || applicationId === null) return;
    try {
      const response =
        await AdmissionsLandingService.deleteDocument(applicationId, row.documentId);

      if (response?.success) {
        deleteDocument();
        showToast("Documento eliminado con exito", "success");
      } else {
        showToast("No se pudo eliminar el documento", "error");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const getDetailAdmissionsProcess = async (application: any) => {
    const admissionProcessId = application.admissionProcessId;
    const documentsUploaded = application.documents;
    setApplicationId(application.applicationId);
    try {
      const response =
        await AdmissionsLandingService.getDetailAdmissionsProcess(
          admissionProcessId
        );

      if (response.admissionProcessId) {
        let requiredDocuments = response.requiredDocuments.map((item: any) => {
          const uploaded = documentsUploaded.find(
            (doc: any) => item.documentTypeId === doc.documentTypeId
          );

          return {
            ...item,
            uploaded: uploaded?.fileName || null,
            documentId: uploaded?.documentId || null,
            applicationId: application.applicationId,
          };
        });

        setRequiredDocuments(requiredDocuments);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetailAdmissionsProcess(infoApplication);
  }, [infoApplication]);

  return (
    <>
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

      {modalDocument && (
        <ModalAddDocument
          onSaveDocument={() => saveDocument()}
          infoDocument={dataInfoDocument}
          toggleModal={() => setModalDocument(false)}
        />
      )}
    </>
  );
}
