import React from "react";

import style from "@/app/font.module.css";
import "./style.css";

const DropTableComponent: React.FC<{ title: string, columns: any }> = ({ title, columns }) => {
  return (
    <div
      className={
        `bg-white shadow-[0_4px_12px_0_rgba(17,62,47,0.07)] rounded-lg ` +
        style["font-outfit"]
      }
    >
      <div className="p-4 font-medium text-[1.125rem]">
        <label>{title}</label>
      </div>
      <div className="p-4 ">
        <table className="w-full">
            <thead className="custom-border-b">
                <tr>
                    {columns.map((col: any) => {
                    return <th key={col.nameField} className="py-[1.25rem] px-[1.375rem] font-bold text-[0.875rem]">{col.nameField}</th>;
                    })}
                </tr>
            </thead>
        </table>
      </div>
    </div>
  );
};

export default DropTableComponent;
