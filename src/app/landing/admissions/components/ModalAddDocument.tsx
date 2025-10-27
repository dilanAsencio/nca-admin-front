"use client";

import React, { useEffect, useState } from "react";
import ModalComponent from "@/components/ui/ModalComponent";
import clsx from "clsx";
import style from "@/app/font.module.css";
import { showConfirm, showToast } from "@/utils/alerts";
import { useUI } from "@/providers/ui-context";
import { InputFileComponent } from "@/components/shared/input/InputFileComponent";
import { AdmissionsLandingService } from "@/services/landing/admissions/admissions-service";

const ModalAddDocument: React.FC<{
  toggleModal: () => void;
  infoDocument: any;
  onSaveDocument: () => void;
}> = ({ toggleModal, infoDocument, onSaveDocument }) => {
  const { toggleLoading } = useUI();
  const [documentUpload, setDocumentUpload] = useState<File[]>([]);

  const handleCloseModal = () => {
    toggleModal();
  };

  const saveDocument = async () => {
      const applicationId = infoDocument.applicationId;
      const documentTypeId = infoDocument.documentTypeId
      try {
        if (!applicationId || !documentTypeId) {
          showToast("No se pudo guardar el documento, no se pudo identificar la solicitud", "error");
          return;
        }
        if(documentUpload.length === 0) {
          showToast("No se ha cargado ningun documento", "error");
          return;
        }
        const response =
          await AdmissionsLandingService.uploadDocument(applicationId, documentTypeId, documentUpload);
        if(response?.success) {
            handleCloseModal();
            onSaveDocument();
            showToast(`Documento agregado con exito`, "success");
        } else {
          showToast(`No se pudo guardar el documento: ${response.message}`, "error");
        }

      } catch (error: any) {
        console.error(error);
      }
  };

  const handleSubmitDocument = () => {
    saveDocument();
  };

  const handleTitleModal = () => {
    return infoDocument.name || "Documento";
  };

  return (
    <ModalComponent
      title={handleTitleModal()}
      sizeModal="small"
      handleSubmit={handleSubmitDocument}
      handleModal={() => {
        handleCloseModal();
      }}
    >
      <div
        className={clsx(
          style["font-outfit"],
          "flex gap-[0.5rem] justify-center"
        )}
      >
        <InputFileComponent
          name="supportDocument"
          formats={["pdf"]}
          maxSizeMB={infoDocument.maxSizeMB}
          onFileChange={(file, preview) => {
            setDocumentUpload(file);
          }}
        />
      </div>
    </ModalComponent>
  );
};

export default ModalAddDocument;
