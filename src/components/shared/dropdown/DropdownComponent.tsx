"use client";

import React from "react";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { DropdownComponentProps } from "@/app/core/interfaces/shared-interfaces";
import ErrorAlert from "@/components/ui/ErrorAlert";

import "./style.css";

interface Option {
  label: string;
  value: string;
}

interface Props extends DropdownComponentProps {
  isMulti?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  required?: boolean;
  error?: string;
}

const DropdownComponent: React.FC<Props> = ({
  disabled = false,
  className = "",
  placeholder = "Seleccione una opción",
  value,
  name,
  options,
  onChange,
  label,
  isMulti = false,
  required = false,
  readOnly = false,
  error,
}) => {
  const handleChange = (e: any) => {
    onChange?.(e.value);
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="font-normal text-sm">
          <b className="text-red-500">{required && "* "}</b>
          {label}
        </label>
      )}

      {isMulti ? (
        <MultiSelect
          id={name}
          value={Array.isArray(value) ? value : []}
          options={options}
          optionLabel="label"
          optionValue="value"
          readOnly={readOnly}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full custom-dropdown-multi"
          onChange={handleChange}
          display="chip" // muestra chips para los seleccionados
          maxSelectedLabels={3} // opcional: muestra máximo 3 chips antes de colapsar
        />
      ) : (
        <Dropdown
          id={name}
          value={typeof value === "string" ? value : ""}
          options={options}
          optionLabel="label"
          optionValue="value"
          readOnly={readOnly}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full custom-dropdown"
          onChange={handleChange}
          // showClear // opcional: botón para limpiar selección
        />
      )}

      {error && <ErrorAlert>{error}</ErrorAlert>}
    </div>
  );
};

export default DropdownComponent;
