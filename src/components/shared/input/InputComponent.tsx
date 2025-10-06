import React from "react";
import { InputComponentProps } from "@/app/core/interfaces/shared-interfaces";
import "./style.css";
import ErrorAlert from "@/components/ui/ErrorAlert";

const InputComponent: React.FC<InputComponentProps> = (
    { 
        disabled = false,
        className = "",
        typeInput = "text",
        placeholder = "InputText",
        register,
        name,
        onKeyUp,
        label,
        isInputSearch = false,
        required = false,
        error,
    }
) => {

    return(
        <div>
            {
                isInputSearch ?
                    (<div className="relative flex items-center">
                        <input
                            inputMode="text"
                            placeholder={placeholder}
                            name={name}
                            type="text"
                            disabled={disabled}
                            className={`custom-input input-search form-control ${className}`}
                            onKeyUp={onKeyUp}
                            {...register}
                        />
                        <img
                            className="absolute left-3"
                            src="/assets/icon/header/search.svg"
                            alt="search-icon"
                        />
                    </div>) : (<>
                    {label && name && <label className="font-normal text-[0.875rem]" htmlFor={name}><b className="text-red-500">{required && "* " }</b>{label}</label>}
                    <input
                        inputMode={typeInput === "number" ? "number" : "text"}
                        placeholder={placeholder}
                        name={name}
                        type={typeInput}
                        disabled={disabled}
                        className={"custom-input form-control " + className}
                        onKeyUp={onKeyUp}
                        {...register}
                    />
                    {error && 
                        <ErrorAlert>{error as string}</ErrorAlert>
                    }
                    </>) 
            }
        </div>
    );
}

export default InputComponent;
