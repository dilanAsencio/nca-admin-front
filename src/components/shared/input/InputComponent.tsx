import React from "react";
import { InputComponentProps } from "@/types/componentsShared";
import "./style.css";

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
    }
) => {

    return(
        <div>
            {label && name && <label htmlFor={name}>{label}</label>}
            <input
                inputMode={typeInput === "number" ? "numeric" : "text"}
                placeholder={placeholder}
                name={name}
                type={typeInput}
                disabled={disabled}
                className={"custom-input " + className}
                onKeyUp={onKeyUp}
                {...register}
            />
        </div>
    );
}

export default InputComponent;
