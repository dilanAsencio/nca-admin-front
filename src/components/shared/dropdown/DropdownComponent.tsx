import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { DropdownComponentProps } from "@/types/componentsShared";
import "./style.css";

const DropdownComponent: React.FC<DropdownComponentProps> = (
    {
        disabled = false,
        className = "",
        placeholder = "Seleccione una opción",
        register,
        name,
        options,
        onChange,
    }
) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<{ label: string; value: string } | null>(null);

    const ref = useRef<HTMLDivElement>(null);

    const handleSelect = (option: { label: string; value: string }) => {
        console.log("SELECTED DROP", option);
        
        setSelected(option);
        setOpen(false);
        onChange?.(option.value);
    };

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (ref.current && !ref.current.contains(event.target as Node)) {
    //             setOpen(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, []);

    return (
    <div className={`dropdown ${open ? "drop" : ""}`}>
        <div className={`custom-dropdown w-full bg-white relative border-[0.068rem] border-solid border-[#DFDFDF] rounded-[2.25rem] p-[0.75rem]`} ref={ref}>
            <button
                type="button"
                className="flex gap-[0.75rem] justify-between items-center w-full"
                disabled={disabled}
                onClick={() => {console.log("toggle dropdown");
                ;setOpen(!open);}}
            >
                {selected ? selected.label : placeholder}
                <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
            </button>
        </div>
        {open && 
            (<ul className="custom-items z-50 absolute bg-white w-full p-0">
                {options.map((op) => (
                    <li
                        key={op.value}
                        className="p-[1rem] item-drop"
                        onClick={() => handleSelect(op)}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") handleSelect(op);
                        }}
                    >
                        {op.label}
                    </li>
                ))}
            </ul>)
        }
    </div>)
}

export default DropdownComponent;
