"use client";

import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";

import style from "@/app/font.module.css";
import { useEffect, useState } from "react";
import TableComponent from "@/components/shared/table/TableComponent";
import { useUI } from "@/providers/ui-context";
import { ButtonActions } from "../core/interfaces/tables-interfaces";
import { showConfirm, showToast } from "@/utils/alerts";
import { PaymentsConceptsService } from "@/services/admin/payments/paymentsConcepts-service";
import { useForm } from "react-hook-form";
import ModalCurriculum from "./components/ModalCurriculum";
import { StudentsService } from "@/services/admin/students/students-service";
import FilterComponent from "./components/FilterComponent";

const StudentsPage: React.FC = () => {
  const { toggleLoading, iconsActions, toggleModule } = useUI();
  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState<{
    open: boolean;
    data: any;
    op: "view" | "edit" | "add";
  }>({ open: false, data: null, op: "add" });
  const [admissionsProcess, setAdmissionsProcess] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const iconView = iconsActions.view;
  const iconReject = iconsActions.reject;

  const columns = [
    { key: "studentFirstName", nameField: "Nombre" },
    { key: "studentLastName", nameField: "Apellidos" },
    { key: "campusName", nameField: "Colegio" },
    { key: "campusBranchName", nameField: "Sede" },
    { key: "gradeName", nameField: "Grado Academico" },
  ];
  const btnActions = (item: any): ButtonActions[] => {
    return [
      {
        tooltip: "Detalle del estudiante",
        action: () => {
          setOpenModal({ open: true, data: item, op: "edit" });
        },
        icon: iconView,
      },
      {
        tooltip: "Desactivar estudiante",
        action: () => {
          confirmToggleStatus();
        },
        icon: iconReject,
      },
    ];
  };
  const getStudents = async (
    campus: string | null = null,
    grade: string | null = null
  ) => {
    toggleLoading(true);
    const resp = await StudentsService.getStudents(grade, campus, {
      page: currentPage - 1,
      size: itemsPerPage,
    });
    if (resp?.success && resp.data?.content) {
      setAdmissionsProcess(resp.data.content);
      setTotalItems(resp.data.totalElements);
      toggleLoading(false);
    } else {
      showToast("Error al obtener los procesos de admision", "error");
    }
    toggleLoading(false);
  };

  const confirmToggleStatus = async () => {
    const confirm = await showConfirm(
      "Precaucion!",
      "¿Estás seguro de desactivar este concepto de pago?",
      "warning"
    );
    if (confirm) {
      toggleLoading(true);
    }
    toggleLoading(false);
  };

  const toggleModalCurriculum = () => {
    setOpenModal({ open: !openModal.open, data: null, op: "add" });
    getStudents();
  };

  const handleSearchChange = (value: {
    campus?: string;
    branche?: string;
    grade?: string;
  }) => {
    if (
      value.campus === undefined &&
      value.grade === undefined &&
      value.branche === undefined
    ) {
      getStudents();
      return;
    }

    getStudents(value.campus, value.grade);
  };
  useEffect(() => {
    toggleModule("students-management");
  }, []);

  useEffect(() => {
    getStudents();
  }, [
    currentPage,
    itemsPerPage,
  ]);

  return (
    <>
      <div
        className={clsx(
          `${style["font-outfit"]}`,
          "flex flex-col gap-[1.5rem]"
        )}
      >
        <div
          className={clsx(`flex md:justify-between items-center h-[3.125rem]`)}
        >
          <span className="font-semibold text-[1.25rem] text-gray-900">
            Gestión Estudiantes
          </span>
          <BreadcumbComponent items={[{ label: "Gestión Estudiantes" }]} />
        </div>
        <FilterComponent changeValue={(value) => handleSearchChange(value)} />
        <div className="p-2 bg-white rounded-[1rem] shadow-[0_7px_21px_0_#451A1A0A]">
          <TableComponent
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
              },
            }}
          />
        </div>
      </div>

      {openModal.open && (
        <ModalCurriculum
          toggleModal={toggleModalCurriculum}
          writeData={openModal}
        />
      )}
    </>
  );
};

export default StudentsPage;
