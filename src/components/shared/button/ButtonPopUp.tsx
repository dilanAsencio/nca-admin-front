import React, { useEffect, useState } from "react";
import { ButtonPopUpProps } from "@/app/core/interfaces/shared-interfaces";
import "./style.css";
import ButtonComponent from "./ButtonComponent";
import Image from "next/image";

const ButtonPopUpComponent: React.FC<ButtonPopUpProps> = ({
    icon,
    blockAccess = false,
    type = "button",
    label,
    onClick: onclick,
    className = "primary",
    size = "normal",
    options,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);
    
    const iconChevronUp = { path: "/assets/icon/chevron-up.svg", alt: "chevron-up" };
    const iconChevronDown = { path: "/assets/icon/chevron-down.svg", alt: "chevron-down" };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpen(false);
        }
        };
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return(
        <div className="relative" ref={ref}>
            <ButtonComponent
                icon={open ? iconChevronUp : iconChevronDown}
                blockAccess={blockAccess}
                type={type}
                label={label}
                onClick={() => setOpen(!open)}
                className={className}
                size={size}
            />
            {open && (
            <div className="absolute top-full right-0 mt-1 flex flex-col gap-[0.75rem] p-[1rem] w-[max-content] bg-white shadow-lg rounded-lg z-50">
                {options.map((opt, idx) => (
                <button
                    key={idx}
                    type="button"
                    className="flex items-center gap-2 w-full hover:bg-gray-100 text-left"
                    onClick={() => {
                    setOpen(false);
                    opt.onClick();
                    }}
                >
                    {opt.icon && <Image src={opt.icon.path} alt={opt.icon.alt} width={20} height={20} />}
                    <span className="m-0 text-[1rem] font-normal">{opt.label}</span>
                </button>
                ))}
            </div>
            )}
        </div>
    );
}

export default ButtonPopUpComponent;
