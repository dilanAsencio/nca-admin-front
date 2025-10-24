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

    /** 🔹 Formatea fecha al formato: yyyy-MM-dd HH:mm:ss.SSS Z */
    const formatDateToCustom = (date: Date): string => {
        const pad = (num: number, size = 2) => num.toString().padStart(size, "0");

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        const milliseconds = pad(date.getMilliseconds(), 3);

        const timezoneOffset = -date.getTimezoneOffset();
        const sign = timezoneOffset >= 0 ? "+" : "-";
        const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
        const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);

        return `${year}-${month}-${day}`;
    };

    /** 🔹 Convierte string "yyyy-MM-dd HH:mm:ss.SSS Z" → Date (para mostrar en input) */
    const parseCustomDate = (dateString?: string): Date | null => {
        if (!dateString) return null;
        const parsed = new Date(dateString);
        return isNaN(parsed.getTime()) ? null : parsed;
    };
    return(
        <div className="w-full flex flex-col">
            {label && name && <label className="font-normal text-[0.875rem]" htmlFor={name}><b className="text-red-500">{required && "* " }</b>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    // Convierte el string almacenado en el form a un objeto Date para mostrarlo correctamente
                    const dateValue = field.value ? parseCustomDate(field.value) : null;
                    return (
                        <Calendar
                            id={name}
                            name={name}
                            value={dateValue} // ✅ ahora Calendar recibe un Date válido
                            onChange={(e) => {
                            if (e.value instanceof Date) {
                                const formatted = formatDateToCustom(e.value);
                                field.onChange(formatted); // guardamos en formato custom
                            } else {
                                field.onChange("");
                            }
                            }}
                            dateFormat={
                            viweType === "month"
                                ? "mm/yy"
                                : viweType === "year"
                                ? "yy"
                                : "yy/mm/dd"
                            }
                            view={viweType}
                            disabled={disabled}
                            hourFormat="24"
                            readOnlyInput={readOnly}
                            className={`custom-input-date ${className}`}
                            showIcon={showIcon}
                        />
                    );
                }}
            />
            {error && 
                <ErrorAlert>{error as string}</ErrorAlert>
            }
        </div>
    );
}

export default InputDateComponent;
