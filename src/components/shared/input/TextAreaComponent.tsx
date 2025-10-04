import React from "react";

import "./style.css";

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
  label
}) => {
  return (<>
        { label && <label className="font-normal text-[0.875rem]" htmlFor={name}>{label}</label>}
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
    </>
  );
};

export default TextAreaComponent;