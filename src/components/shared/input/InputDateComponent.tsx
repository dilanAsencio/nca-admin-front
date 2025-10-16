import React from "react";
import { InputDateComponentProps } from "@/app/core/interfaces/shared-interfaces";
import "./style.css";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { Calendar } from "primereact/calendar";
import { Controller } from "react-hook-form";

const InputDateComponent: React.FC<InputDateComponentProps> = (
    { 
        disabled = false,
        control,
        className = "",
        name,
        label,
        required = false,
        readOnly = false,
        showIcon = false,
        viweType = "date",
        error,
    }
) => {

    return(
        <div className="w-full flex flex-col">
            {label && name && <label className="font-normal text-[0.875rem]" htmlFor={name}><b className="text-red-500">{required && "* " }</b>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Calendar
                        id={name}
                        name={name}
                        value={field.value ?? null}
                        onChange={(e) => field.onChange(e.value)}
                        dateFormat={viweType === "month" ? "mm/yy" : viweType === "year" ? "yy" : "dd/mm/yy"}
                        view={viweType}
                        disabled={disabled}
                        readOnlyInput={readOnly}
                        className={`custom-input-date ${className}`}
                        showIcon={showIcon}
                    />
                )}
            />
            {error && 
                <ErrorAlert>{error as string}</ErrorAlert>
            }
        </div>
    );
}

export default InputDateComponent;
