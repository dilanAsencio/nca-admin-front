"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { Tooltip } from "primereact/tooltip";
import style from "@/app/font.module.css";
import "./style.css";

export interface SimpleTableColumn<T> {
  key: keyof T;
  nameField: string;
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
  btnActions?: (row: T) => SimpleTableAction<T>[];
}

function TableComponent<T>({
  title,
  columns,
  data,
  btnActions,
}: SimpleTableProps<T>) {
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
                width={20}
                height={20}
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

      <div className="p-2 overflow-x-auto">
        <table className="w-full">
          <thead className="custom-border-b">
            <tr className="text-left text-sm font-semibold text-gray-800">
              {columns.map((col) => (
                <th key={String(col.key)} className="p-2">
                  {col.nameField}
                </th>
              ))}
              {btnActions && <th className="p-2 text-center">Acciones</th>}
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
                  className="border-b hover:bg-gray-50 transition-colors"
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
                          className="p-2 text-gray-700 text-sm"
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
      </div>
    </div>
  );
}

export default TableComponent;
