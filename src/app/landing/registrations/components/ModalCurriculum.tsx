"use client";

import React, { useEffect, useState } from "react";
import style from "@/app/font.module.css";
import clsx from "clsx";
import { showToast } from "@/utils/alerts";
import Image from "next/image";
import TableComponent from "@/components/shared/table/TableComponent";
import { AnimatePresence, motion } from "framer-motion";
import { StudentsService } from "@/services/admin/students/students-service";
import { DateUtils } from "@/utils/date-utils";

const ModalCurriculum: React.FC<{
  toggleModal: () => void;
  writeData: {
    open: boolean;
    data: any;
    op: "view" | "edit" | "add";
  };
}> = ({ toggleModal, writeData }) => {
  const [currentStudentInfo, setCurrentStudentInfo] = useState<any>(null);
  const [asistenceInfo, setAsistenceInfo] = useState<any[]>([
    { labels: "Total días hábiles:", info: "0" },
    { labels: "Asistencias:", info: "0" },
    { labels: "Inasistencias justificadas:", info: "0" },
    { labels: "Inasistencias injustificadas:", info: "0" },
  ]);
  const [medicalInfo, setMedicalInfo] = useState<any[]>([
    { labels: "Tipo de sangre:", info: "O+" },
    { labels: "Alergias:", info: "Ninguna" },
    { labels: "Condiciones médicas especiales:", info: "Ninguno" },
    { labels: "EPS:", info: "EPS Sanitas" },
  ]);

  const getStudentById = async (studentId: string) => {
    if (studentId === "" || studentId === undefined) return;
    const resp = await StudentsService.getStudentById(studentId);
    if (resp?.success) {
      setCurrentStudentInfo(resp.data);
    } else {
      showToast(
        "Error al obtener la información del estudiante",
        "error"
      );
    }
  };

  const [academicInfo, setAcademicInfo] = useState<any[]>([
    { score: 0.0, observations: "N/A", area: "Matemática",},
    { score: 0.0, observations: "N/A", area: "Lenguas",},
    { score: 0.0, observations: "N/A", area: "Naturales",},
    { score: 0.0, observations: "N/A", area: "Humanidades",},
    { score: 0.0, observations: "N/A", area: "Inglés",},
  ]);
  const columnsAcademicInfo = [
    { key: "area", nameField: "Area" },
    { key: "score", nameField: "Calificación" },
    { key: "observations", nameField: "Observaciones" },
  ];
  const columnsAsistence = [
    { key: "labels", nameField: "", width: "w-[60%]" },
    { key: "info", nameField: "" },
  ];
  const columnsMedicalInfo = [
    { key: "labels", nameField: "", width: "w-[60%]" },
    { key: "info", nameField: "" },
  ];

  const handleCloseModal = () => {
    toggleModal();
    setCurrentStudentInfo(null);
  };

  useEffect(() => {
    if (writeData.open && writeData.data) {
      getStudentById(writeData.data.id);
    }
  }, [writeData.open]);

  return (
    <AnimatePresence>
        <motion.div
          key="modal-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-20 flex justify-end items-center w-full h-full bg-[#6c757d7a]"
          onClick={handleCloseModal}
        >
          <motion.div
            key="modal-panel"
            // variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", duration: 0.4 }}
            className={clsx(
              "relative py-[1.1875rem] px-[1.5rem] w-[38.25rem] flex flex-col gap-[0.75rem] bg-white h-auto shadow-xl",
              "max-h-[95vh] overflow-y-auto rounded-tl-[0.5rem] rounded-bl-[0.5rem]",
              style["font-outfit"]
            )}
            onClick={(e) => e.stopPropagation()} // evitar cerrar al hacer click dentro
          >
          <section className="flex justify-center">
            <Image
              src="/assets/img/logo-nexuscore.png"
              alt="logo"
              width={154}
              height={32}
            />
          </section>
          <h5 className="text-center">
            {currentStudentInfo?.campusName || "Nombre del Campus"}
          </h5>
          {/* Personal Info */}
          <section className="flex flex-col gap-[0.5rem]">
            <p className="text-[1rem] font-bold">Datos Personales</p>
            <div className="flex gap-[1rem]">
              <Image
                src={
                  currentStudentInfo?.profileImage ||
                  "/assets/landing/img/df-checker.png"
                }
                alt="foto de perfil"
                className="rounded-[0.9375rem] bg-[#D9D9D9] img-fluid"
                width={126}
                height={144}
                loading="lazy"
              />
              <div className="flex flex-col justify-between w-[422px]">
                <div className="flex flex-col gap-[0.01rem]">
                  <p className="m-0 text-[1rem] font-normal">
                    <span className="m-0 font-bold text-[1rem]">
                      Nombre Completo:
                    </span>{" "}
                    {currentStudentInfo?.studentName || "Nombre del Estudiante"}
                  </p>
                  <p className="m-0 text-[1rem] font-normal">
                    <span className="m-0 font-bold text-[1rem]">
                      Fecha de Nacimiento:
                    </span>{" "}
                    {DateUtils.formatDate(currentStudentInfo?.dateOfBrith) || "DD/MM/AAAA"}
                  </p>
                  <p className="m-0 text-[1rem] font-normal">
                    <span className="m-0 font-bold text-[1rem]">Edad:</span>{" "}
                    {currentStudentInfo?.age || "Edad del Estudiante"}
                  </p>
                  <p className="m-0 text-[1rem] font-normal">
                    <span className="m-0 font-bold text-[1rem]">Grado:</span>{" "}
                    {currentStudentInfo?.gradeName || "Grado del Estudiante"}
                  </p>
                  <p className="m-0 text-[1rem] font-normal">
                    <span className="m-0 font-bold text-[1rem]">Dirección:</span>{" "}
                    {currentStudentInfo?.address || "Dirección del Estudiante"}
                  </p>
                  <p className="m-0 text-[1rem] font-normal">
                    <span className="m-0 font-bold text-[1rem]">Teléfono:</span>{" "}
                    {currentStudentInfo?.phone || "Teléfono del Estudiante"}
                  </p>
                  <p className="m-0 text-[1rem] font-normal">
                    <span className="m-0 font-bold text-[1rem]">Acudiente:</span>{" "}
                    {currentStudentInfo?.parentName || "Acudiente del Estudiante"}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <TableComponent
            title="Información Académica"
            columns={columnsAcademicInfo}
            data={academicInfo}
          />
          <TableComponent
            title="Asistencia"
            hideHeader={true}
            columns={columnsAsistence}
            data={asistenceInfo}
          />
          <TableComponent
            title="Información Médica"
            hideHeader={true}
            columns={columnsMedicalInfo}
            data={medicalInfo}
          />
          <div className="pt-[1.25rem] flex flex-col gap-[0.5rem]">
            <p className="text-[1rem] m-0 font-bold">Datos Personales</p>
            <p className="m-0 font-normal text-[0.875rem] ">
              {currentStudentInfo?.description ||
                "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen."}
            </p>
          </div>
          <div className="fixed bottom-0 left-[61%] py-[19.2px] px-[3px] w-[0.5rem] h-full flex flex-col gap-[1rem]">
            <div className="bg-[#610CF4] h-[38%] w-[0.5rem] rounded-tl-[0.5rem]"></div>
            <div className="bg-[#FFD464] h-[75%] w-[0.5rem]"></div> 
            <div className="bg-[#FC4554] h-[95%] w-[0.5rem] rounded-bl-[0.5rem]"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalCurriculum;
