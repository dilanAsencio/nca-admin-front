import React, { useEffect, useState } from "react";
import style from "@/app/font.module.css";
import "./style.css";
import Image from "next/image";
import { DropTableProps } from "@/app/core/interfaces/tables-interfaces";
import { Tooltip } from "primereact/tooltip";
import clsx from "clsx";

function DropTableComponent<T, C = T>({
  title,
  columns,
  data,
  btnActions,
  btnActionsChild,
  childrenColumns = [],
}: DropTableProps<T, C>) {
  const [openRows, setOpenRows] = useState<number | null>(null);

  const toggleRow = (idx: number) => {
    setOpenRows(idx === openRows ? null : idx);
  };

  const renderActions = (row: T) => {
    const actions = btnActions ? btnActions(row) : [];
    return (
      <div className="flex justify-center">
        {actions.map((action, idx) => (<div key={idx}>
          <Tooltip target={".tooltip-target"} />
          <div key={idx} onClick={action.action} className="mr-4 cursor-pointer tooltip-target" 
            data-pr-tooltip={action.tooltip}
            data-pr-position="top">
            <Image
              src={action.icon.path}
              alt={action.icon.alt}
              width={20}
              height={20}
            />
          </div>
        </div>))}
      </div>
    );
  }

  const renderChildActions = (row: C) => {
    const actions = btnActionsChild ? btnActionsChild(row) : [];
    return (
      <div className="flex justify-center">
        {actions.map((action, idx) => (<div key={idx}>
          <Tooltip target={".tooltip-target"} />
          <div key={idx} onClick={action.action} className="mr-4 cursor-pointer tooltip-target" 
            data-pr-tooltip={action.tooltip}
            data-pr-position="top">
            <Image
              src={action.icon.path}
              alt={action.icon.alt}
              width={20}
              height={20}
            />
          </div>
        </div>))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "custom-droptable",
        style["font-outfit"]
      )}
    >
      <div className="p-[1rem] font-medium text-[1.125rem]">
        <label className="text-gray-900">{title}</label>
      </div>
      <div className="p-[1rem] ">
        <table className="w-full">
          <thead className="custom-border-b">
            <tr className="py-[1.25rem] px-[1.375rem] font-bold text-[0.875rem]">
              <th></th>
              {columns.map((col) => (
                <th className="p-[0.75rem] font-bold text-[1rem]" key={col.key}>{col.nameField}</th>
              ))}
              {btnActions && <th className="p-[0.75rem] font-bold text-[1rem] text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody >
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="text-center py-4">
                  Sin datos
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <React.Fragment key={idx}>
                  <tr className="custom-border-b">
                    <td className="p-[0.75rem] flex justify-center">
                      {row.children && row.children.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => toggleRow(idx)}
                        >
                          {openRows === idx ? (
                            <Image
                              src="/assets/icon/minus-circle-contained.svg"
                              alt="minus-circle"
                              width={24}
                              height={24}
                            />
                          ) : (
                            <Image
                              src="/assets/icon/add-square-04.svg"
                              alt="add-square"
                              width={24}
                              height={24}
                            />
                          )}
                        </button>
                      ) : (
                        <Image
                          src="/assets/icon/alert-triangle.svg"
                          alt="alert"
                          width={24}
                          height={24}
                        />
                      )}
                    </td>
                    {columns.map((col) => (
                      <td
                        className="p-[0.75rem] text-[1rem] font-normal text-gray-700"
                        key={col.key}
                      >
                        {(row as any)[col.key]}
                      </td>
                    ))}
                    {btnActions &&
                      btnActions.length > 0 && 
                        <td className="text-center" key={idx}>{
                          renderActions(row)}
                        </td>
                    }
                  </tr>
                  {row.children &&
                    row.children.length > 0 && 
                    openRows === idx && (
                      <tr>
                        <td></td>
                        <td colSpan={columns.length + 1} className="p-0">
                          <table className="w-full">
                            <thead className="custom-border-b">
                              <tr className="text-gray-900">
                                {(childrenColumns || []).map((col: any) => (
                                  <th className="p-[0.75rem] font-bold text-[1rem]" key={col.key}>{col.nameField}</th>
                                ))}
                                {btnActionsChild && <th className="p-[0.75rem] font-bold text-[1rem] text-center">Acciones</th>}
                              </tr>
                            </thead>
                            <tbody className="custom-border-b">
                              {row.children.map((child: any, cidx: number) => (
                                <tr key={cidx}>
                                  {(childrenColumns || []).map(
                                    (col: any) => (
                                      <td className="p-[0.75rem] text-[1rem] font-normal text-gray-700" key={col.key}>{(child as any)[col.key]}</td>
                                    )
                                  )}
                                  {btnActionsChild &&
                                    btnActionsChild.length > 0 && 
                                      <td className="text-center" key={idx}>{
                                        renderChildActions(child)}
                                      </td>
                                  }
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
        <hr className="my-[0.5rem]" />
      </div>
    </div>
  );
};

export default DropTableComponent;