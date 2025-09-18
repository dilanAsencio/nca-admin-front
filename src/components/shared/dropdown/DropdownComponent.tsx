import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { DropdownComponentProps } from "@/app/core/interfaces/shared-interfaces";
import "./style.css";
import ErrorAlert from "@/components/ui/ErrorAlert";

interface Option {
  label: string;
  value: string;
}

interface Props extends DropdownComponentProps {
  isMulti?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

const DropdownComponent: React.FC<Props> = ({
  disabled = false,
  className = "",
  placeholder = "Seleccione una opción",
  value,
  name,
  options,
  onChange,
  label,
  isMulti = false,
  required = false,
  error
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const values = Array.isArray(value) ? value : [value];
      const matches = options.filter((op) => values.includes(op.value));
      setSelectedOptions(matches);
    } else {
      setSelectedOptions([]);
    }
  }, [value, options]);

  const handleSelect = (option: Option) => {
    if (isMulti) {
      let updated: Option[];

      const alreadySelected = selectedOptions.find((sel) => sel.value === option.value);
      if (alreadySelected) {
        updated = selectedOptions.filter((sel) => sel.value !== option.value);
      } else {
        updated = [...selectedOptions, option];
      }

      setSelectedOptions(updated);
      onChange?.(updated.map((op) => op.value));
    } else {
      setSelectedOptions([option]);
      onChange?.(option.value);
      setOpen(false);
    }
  };

  const isSelected = (option: Option) =>
    selectedOptions.some((sel) => sel.value === option.value);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {      
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTimeout(() => {
          setOpen(false);
        }, 100);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className={`dropdown relative ${open ? "drop" : ""} cursor-pointer`}>
      {label && (
        <label htmlFor={name} className="font-normal text-sm"><b className="text-red-500">{required && "* " }</b>{label}</label>
      )}
      <div
        className={`custom-dropdown ${open ? "open" : ""} ${className} w-full bg-white relative`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <div className="flex gap-[0.75rem] justify-between items-center w-full">
          <div className="h-min whitespace-nowrap overflow-hidden text-ellipsis">
            {selectedOptions.length > 0 ? (
              isMulti ? (
                <div className="flex flex-wrap gap-1 max-h-[4rem] overflow-y-auto">
                  {selectedOptions.map((opt) => (
                    <span
                      key={opt.value}
                      className="bg-gray-200 text-gray-900 px-2 py-1 text-xs rounded-full"
                    >
                      {opt.label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="m-0 text-gray-900">{selectedOptions[0].label}</p>
              )
            ) : (
              <p className="m-0 text-[#B2B1B1]">{placeholder}</p>
            )}
          </div>
          <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
        </div>
      </div>

      {open && (
        <ul className="custom-items w-full z-50 absolute bg-white p-0 max-h-[200px] overflow-auto shadow-md rounded-md">
          {options.map((op) => (
            <li
              key={op.value}
              className={`p-[1rem] item-drop text-gray-900 cursor-pointer hover:bg-gray-100 ${
                isSelected(op) ? "bg-purple-100" : ""
              }`}
              onClick={() => handleSelect(op)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(op);
              }}
            >
              {op.label}
            </li>
          ))}
        </ul>
      )}
      { error &&
        <ErrorAlert>{error as string}</ErrorAlert>
      }
    </div>
  );
};

export default DropdownComponent;
