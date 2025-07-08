import React from "react";
import { ButtonComponentProps } from "@/types/componentsShared";
import style from "@/app/font.module.css";
import "./style.css";

const ButtonComponent: React.FC<ButtonComponentProps> = ({icon, blockAccess = false, type = "button", label, onClick: onclick, className = "primary" }) => {

    return(
    <button
        type={type}
        disabled={blockAccess}
        className={`btn-custom ${className} ${style["font-outfit"]} ${icon ? "flex justify-center items-center gap-[0.12rem]" : ""}`}
        onClick={onclick}
    >
        { icon && <img src={icon?.path} alt={icon?.alt} />}
        {label}
    </button>
    );
}

export default ButtonComponent;
