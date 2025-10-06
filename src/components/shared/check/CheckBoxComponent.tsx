import React from "react";
import { CheckComponentProps } from "@/app/core/interfaces/shared-interfaces";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const CheckBoxComponent: React.FC<CheckComponentProps> = ({ label, checked, setChecked, name, typeCheck = "checkbox" }) => {
    

    return(<>
    {
        typeCheck ==="checkbox" ? (<>
        <input
            type="checkbox"
            name={name}
            className="form-check-input cursor-pointer"
            id={name}
            checked={checked}
            onChange={() => setChecked()}
        />
        {label && <label
            className="form-check-label cursor-pointer"
            htmlFor={name}
        >
            { label }
        </label>}</>) : 
        <div className={clsx(
            "content-checkbadge relative",
            checked ? "bg-[#A5FFD2] border-[#00D369]" : "border-[#939393]"
            )}>
            <input
                type="checkbox"
                name={name}
                className="checkbadge sr-only"
                id={name}
                checked={checked}
                onChange={() => setChecked()}
            />
            { checked && <FontAwesomeIcon color="#00D369" icon={faCheck} /> }
            <label
                className="cursor-pointer"
                htmlFor={name}
            >
                { label }
            </label>
        </div>
    }
    </>)
}

export default CheckBoxComponent;