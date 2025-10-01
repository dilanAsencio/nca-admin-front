import React, { useState } from "react";
import style from "@/app/font.module.css";
import "./style.css";
import Image from "next/image";
import { DropTableProps } from "@/types/tables-interfaces";
import { Tooltip } from "primereact/tooltip";

const DropTableComponent: React.FC<DropTableProps> = ({
  title, columns, data, btnActions
}) => {
  const [openRows, setOpenRows] = useState<number[]>([]);

  const toggleRow = (idx: number) => {
    setOpenRows((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const renderActions = (row: any) => {
    const actions = btnActions ? btnActions(row) : [];
    return (
      <div className="flex justify-center">
        {actions.map((action, idx) => (<>
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
        </>))}
      </div>
    );
  }

  return (
    <div
      className={
        `bg-white shadow-[0_4px_12px_0_rgba(17,62,47,0.07)] rounded-lg ` +
        style["font-outfit"]
      }
    >
      <div className="p-[1rem] font-medium text-[1.125rem]">
        <label>{title}</label>
      </div>
      <div className="p-[1rem] ">
        <table className="w-full">
          <thead className="custom-border-b">
            <tr className="py-[1.25rem] px-[1.375rem] font-bold text-[0.875rem]">
              <th></th>
              {columns.map((col) => (
                <th className="p-[0.75rem] font-bold text-[1rem]" key={col.key}>{col.nameField}</th>
              ))}
              {btnActions && <th className="p-[0.75rem] font-bold text-[1rem]">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4">
                  Sin datos
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td>
                      {row.children && row.children.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => toggleRow(idx)}
                          className="px-2"
                        >
                          {openRows.includes(idx) ? (
                            <Image
                              src="/assets/icon/minus-circle-contained.svg"
                              alt="minus-circle"
                              width={18}
                              height={18}
                            />
                          ) : (
                            <Image
                              src="/assets/icon/add-square-04.svg"
                              alt="add-square"
                              width={18}
                              height={18}
                            />
                          )}
                        </button>
                      ) : (
                        <Image
                          src="/assets/icon/alert-triangle.svg"
                          alt="alert"
                          width={18}
                          height={18}
                        />
                      )}
                    </td>
                    {columns.map((col) => (
                      <td className="p-[0.75rem] text-[1rem] font-normal" key={col.key}>{row[col.key]}</td>
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
                    openRows.includes(idx) && (
                      <tr>
                        <td colSpan={columns.length + 1} className="p-0">
                          <table className="w-full bg-gray-50">
                            <thead>
                              <tr>
                                {(row.childrenColumns || []).map((col: any) => (
                                  <th className="p-[0.75rem]" key={col.key}>{col.nameField}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {row.children.map((child: any, cidx: number) => (
                                <tr key={cidx}>
                                  {(row.childrenColumns || []).map(
                                    (col: any) => (
                                      <td className="p-[0.75rem] text-[1rem] font-normal" key={col.key}>{child[col.key]}</td>
                                    )
                                  )}
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