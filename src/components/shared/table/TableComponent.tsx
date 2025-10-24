"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Tooltip } from "primereact/tooltip";
import style from "@/app/font.module.css";
import "./style.css";
import PaginationComponent from "../paginate/PaginationComponent";
import { useUI } from "@/providers/ui-context";
import InputComponent from "../input/InputComponent";
import { useForm } from "react-hook-form";

export interface SimpleTableColumn<T> {
  key: keyof T;
  nameField: string;
  width?: string;
  isFilterable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface SimpleTableAction<T> {
  tooltip: string;
  icon: {
    path: string;
    alt: string;
  };
  action: (row: T) => void;
}

export interface SimpleTableProps<T> {
  title?: string;
  columns: SimpleTableColumn<T>[];
  data: T[];
  paginate?: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (newPage: number) => void;
    onItemsPerPageChange?: (size: number) => void;
    perPageOptions?: number[];
  };
  btnActions?: (row: T) => SimpleTableAction<T>[];
}

function TableComponent<T>({
  title,
  columns,
  data,
  btnActions,
  paginate,
}: SimpleTableProps<T>) {
  const { iconsActions } = useUI();
  const iconFilter = iconsActions.filter;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  // Maneja abrir/cerrar el filtro de columna
  const handleToggleFilter = (key: string) => {
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  // Maneja cambio del input de búsqueda
  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  // Aplica filtro a la data
  const filteredData = data.filter((row) =>
    columns.every((col) => {
      const filterValue = filterValues[col.key as string];
      if (!filterValue) return true;
      const cellValue = String((row as any)[col.key] ?? "").toLowerCase();
      return cellValue.includes(filterValue.toLowerCase());
    })
  );
  const renderActions = (row: T) => {
    const actions = btnActions ? btnActions(row) : [];
    return (
      <div className="flex justify-center">
        {actions.map((action, idx) => (
          <div key={idx}>
            <Tooltip target=".tooltip-target" />
            <div
              onClick={() => action.action(row)}
              className="mr-3 cursor-pointer tooltip-target"
              data-pr-tooltip={action.tooltip}
              data-pr-position="top"
            >
              <Image
                src={action.icon.path}
                alt={action.icon.alt}
                width={24}
                height={24}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={clsx("custom-table", style["font-outfit"])}>
      {title && (
        <div className="p-2 font-medium text-lg text-gray-900">{title}</div>
      )}

      <div className="p-2 flex flex-col gap-[1rem]">
        <table className="w-full">
          <thead className="custom-border-b">
            <tr className="text-left text-sm font-semibold text-gray-800">
              {columns.map((col) => (
                <th key={String(col.key)} className="p-2">
                  <div className="flex justify-between items-center">
                    {col.nameField}
                    {col.isFilterable && (
                      <div
                        onClick={() => handleToggleFilter(String(col.key))}
                        className="relative"
                      >
                        <Image
                          className="cursor-pointer"
                          src={iconFilter.path}
                          alt={iconFilter.alt}
                          width={24}
                          height={24}
                        />
                        {activeFilter === String(col.key) && (
                          <div onClick={(e) => e.stopPropagation()} className="absolute flex flex-col w-[284px] max-h-[272px] h-fit border-1 border-[#610CF4] bg-white pt-[0.5rem] pb-[1rem] rounded-[1.5rem]">
                            <div className="p-[1rem]">
                              <InputComponent
                                isInputSearch={true}
                                name={`searh-${col.key as string}`}
                                className="primary"
                                placeholder="Buscar..."
                                typeInput="text"
                                value={filterValues[col.key as string] || ""}
                                register={register(
                                  `searh-${col.key as string}`,
                                  {
                                    onChange: (e) =>
                                      handleFilterChange(
                                        String(col.key),
                                        e.target.value
                                      ),
                                  }
                                )}
                              />
                            </div>

                            <div className="overflow-y-auto max-h-[160px]">
                              {filteredData
                                .map((row) => (row as any)[col.key])
                                .filter(
                                  (value, index, self) =>
                                    self.indexOf(value) === index
                                ) // Únicos
                                .filter((val) =>
                                  String(val)
                                    .toLowerCase()
                                    .includes(
                                      (
                                        filterValues[col.key as string] || ""
                                      ).toLowerCase()
                                    )
                                )
                                .slice(0, 3) // Máx. 3 visibles
                                .map((val, i) => (
                                  <div
                                    key={i}
                                    className="text-[#262626] text-[1rem] font-normal p-[1rem] cursor-pointer bg-[#ffffff] hover:bg-[#A06DF8] hover:text-white"
                                  >
                                    {val || "—"}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {btnActions && (
                <th className="py-[0.5rem] px-[0.75rem] text-[1rem] leading-[1.25rem] font-bold text-gray-900 text-center">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="custom-border-b">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (btnActions ? 1 : 0)}
                  className="text-center py-4 text-gray-500"
                >
                  Sin datos disponibles
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className="custom-border-b hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col) => (
                    <React.Fragment key={String(col.key)}>
                      {col.render ? (
                        <td className="text-gray-700 text-sm">
                          {col.render(row)}
                        </td>
                      ) : (
                        <td
                          key={String(col.key)}
                          // style={(col.width ? { width: col.width } : undefined)}
                          className={clsx(
                            col.width && `${col.width}`,
                            `p-[0.75rem] text-gray-700 text-[1rem] font-normal leading-[1.25rem]`
                          )}
                        >
                          {(row as any)[col.key]}
                        </td>
                      )}
                    </React.Fragment>
                  ))}
                  {btnActions && (
                    <td className="text-center">{renderActions(row)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div>
          {paginate && (
            <PaginationComponent
              totalItems={paginate.totalItems}
              itemsPerPage={paginate.itemsPerPage}
              currentPage={paginate.currentPage}
              onPageChange={paginate.onPageChange}
              perPageOptions={paginate.perPageOptions}
              onItemsPerPageChange={paginate.onItemsPerPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TableComponent;
