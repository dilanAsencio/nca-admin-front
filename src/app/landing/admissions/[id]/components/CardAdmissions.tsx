"use client";

import React, { useEffect, useState } from "react";
import { DateUtils } from "@/utils/date-utils";
import TableComponent from "@/components/shared/table/TableComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";

const CardAdmissions: React.FC<{
  title: string;
  grades: any[];
  periodAdmission: string[];
  selectedProcess: (process: any) => void;
}> = ({ title, periodAdmission = [], grades = [], selectedProcess }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const columns = [
    { key: "nameBranche", nameField: "Sede" },
    { key: "fullAddressBranche", nameField: "Dirección" },
    { key: "academicLevel", nameField: "Nivel academico" },
    { key: "name", nameField: "Grado" },
    { key: "value", nameField: "Valor" },
    {
      key: "status",
      nameField: "Acción",
      render: (row: any) => (
        <ButtonComponent
          className="primary"
          icon={{path: "/assets/icon/arrow-right.svg", alt: "arrow right"}}
          size="small"
          iconPosition="right"
          onClick={() => {selectedProcess(row)}}
          label={"Inscribirse"}
        />
      ),
    },
  ];
  useEffect(() => {
    setTotalItems(grades.length);
  }, [])
  return (
    <>
      <div className="p-[1rem] border-1 border-solid border-[#610CF4] rounded-[0.5rem] flex flex-col gap-[0.75rem]">
        <span className="m-0 font-medium text-[1.125rem] text-gray-900 flex justify-between">
          <h2 className="m-0 self-center">{title}</h2>
          <div className="flex flex-col justify-center border-2 border-solid border-[#FC5C69] p-[0.5rem] rounded-[1rem]">
            <span className="text-center font-bold">
              Las inscripciones estan abiertas
            </span>
            <div className="flex">
              <span>
                <b>Desde el:</b>{" "}
                {DateUtils.formatDate(periodAdmission[0], false, true)}
              </span>
              <span className="ml-1">
                <b>Hasta el:</b>{" "}
                {DateUtils.formatDate(periodAdmission[1], false, true)}
              </span>
            </div>
          </div>
        </span>
        <TableComponent
          columns={columns}
          data={grades}
        />
      </div>
    </>
  );
};

export default CardAdmissions;
