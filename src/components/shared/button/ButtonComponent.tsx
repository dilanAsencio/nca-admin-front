import React from "react";
import "./style.css";
import { ButtonComponentProps } from "@/types/componentsShared";
import style from "@/app/font.module.css";

const ButtonComponent: React.FC<ButtonComponentProps> = ({ blockAccess = false, type = "button", label, onClick: onclick, className = "primary" }) => {

    return(
    <button
        type={type}
        disabled={blockAccess}
        className={`btn-custom ` + className + " " + style["font-outfit"]}
        onClick={onclick}
    >
        {label}
    </button>
    );
}

export default ButtonComponent;
