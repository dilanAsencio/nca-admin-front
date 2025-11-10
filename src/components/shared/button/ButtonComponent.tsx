import React from "react";
import { ButtonComponentProps } from "@/app/core/interfaces/shared-interfaces";
import style from "@/app/font.module.css";
import "./style.css";
import Image from "next/image";
import { ProgressSpinner } from "primereact/progressspinner";

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    icon,
    blockAccess = false,
    type = "button",
    label,
    onClick,
    className = "primary",
    size = "normal",
    iconPosition = "left",
    isSpinner,
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
        {isSpinner && blockAccess && <ProgressSpinner style={{ width: "24px", height: "24px", marginLeft: "0.5rem", marginRight: "0" }} />}
    </button>
    );
}

export default ButtonComponent;
