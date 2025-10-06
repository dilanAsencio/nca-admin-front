import React from "react";

import "./style.css";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { Tooltip } from "primereact/tooltip";

interface TextAreaComponentProps {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  register?: any; // para react-hook-form
  label?: string;
  required?: boolean
  error?: string
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  disabled = false,
  className = "",
  register,
  label,
  required = false,
  error
}) => {
  return (<>
        { label && (<>
          {required && <Tooltip target={`.tp-text-${name}`} />}
          <label className={`font-normal text-[0.875rem] tp-text-${name}`} htmlFor={name} data-pr-at="Este campo es requerido" data-pr-position="top" ><b className="text-red-500">{required && "* " }</b>{label}</label>
        </>)}
        <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`custom-textarea form-control text-[1rem] w-full ${className}`}
        {...register}
        />
        {error && 
          <ErrorAlert>{error as string}</ErrorAlert>
        }
    </>
  );
};

export default TextAreaComponent;