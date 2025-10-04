import React from "react";
import { ButtonComponentProps } from "@/types/componentsShared";
import style from "@/app/font.module.css";
import "./style.css";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import * as IconsFont from "@fortawesome/free-solid-svg-icons";

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    icon,
    blockAccess = false,
    type = "button",
    label,
    onClick,
    className = "primary",
    size = "normal",
}) => {

    return(
    <button
        type={type}
        disabled={blockAccess}
        className={`btn-custom ${size} ${className} ${style["font-outfit"]} ${icon ? "flex justify-center items-center gap-[0.12rem]" : ""}`}
        onClick={onClick}
    >
        { icon && <img className="icon-btn" src={icon?.path} alt={icon?.alt} />}
        {label}
    </button>
    );
}

export default ButtonComponent;
