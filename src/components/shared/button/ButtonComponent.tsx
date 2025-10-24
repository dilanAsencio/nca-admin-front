import React from "react";
import { ButtonComponentProps } from "@/app/core/interfaces/shared-interfaces";
import style from "@/app/font.module.css";
import "./style.css";
import Image from "next/image";

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    icon,
    blockAccess = false,
    type = "button",
    label,
    onClick,
    className = "primary",
    size = "normal",
    iconPosition = "left",
}) => {

    return(
    <button
        type={type}
        disabled={blockAccess}
        className={`btn-custom ${size} ${className} ${style["font-outfit"]} ${icon ? "flex justify-center items-center gap-[0.4rem]" : ""}`}
        onClick={onClick}
    >
        { iconPosition === "left" && icon && <Image className="icon-btn" src={icon?.path} alt={icon?.alt} width={20} height={20} loading="lazy" />}
        {label && label}
        { iconPosition === "right" && icon && <Image className="icon-btn" src={icon?.path} alt={icon?.alt} width={20} height={20} loading="lazy" />}
    </button>
    );
}

export default ButtonComponent;
