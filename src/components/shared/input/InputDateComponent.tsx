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

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} ${sign}${offsetHours}${offsetMinutes}`;
    };

    /** 🔹 Convierte string "yyyy-MM-dd HH:mm:ss.SSS Z" → Date (para mostrar en input) */
    const parseCustomDate = (dateString?: string): Date | null => {
        if (!dateString) return null;

        const match = dateString.match(
        /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\.(\d{3}) ([+-]\d{4})$/
        );
        if (!match) return null;

        const [_, y, m, d, hh, mm, ss, ms, tz] = match;
        const offsetHours = parseInt(tz.slice(0, 3));
        const offsetMinutes = parseInt(tz.slice(0, 1) + tz.slice(3));
        const date = new Date(
        Date.UTC(
            Number(y),
            Number(m) - 1,
            Number(d),
            Number(hh) - offsetHours,
            Number(mm) - offsetMinutes,
            Number(ss),
            Number(ms)
        )
        );
        return date;
    };
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
                        onChange={(e) => {
                            if (e.value instanceof Date) {
                                const formatted = formatDateToCustom(e.value);
                                field.onChange(formatted);
                            } else {
                                field.onChange("");
                            }
                        }}
                        dateFormat={viweType === "month" ? "mm/yy" : viweType === "year" ? "yy" : "YY/mm/dd"}
                        view={viweType}
                        disabled={disabled}
                        hourFormat="24"
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
