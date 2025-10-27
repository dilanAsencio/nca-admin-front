import React from "react";
import { CheckComponentProps } from "@/app/core/interfaces/shared-interfaces";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import ErrorAlert from "@/components/ui/ErrorAlert";

const CheckBoxComponent: React.FC<CheckComponentProps> = ({
  label,
  checked,
  setChecked,
  name,
  typeCheck = "checkbox",
  onChange,
  disabled = false,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };
  return (
    <div>
      {typeCheck === "checkbox" ? (
        <div className="flex flex-col">
          <div className="form-check">
            <input
              type="checkbox"
              name={name}
              disabled={disabled}
              className="form-check-input cursor-pointer"
              id={name}
              checked={!!checked}
              onChange={handleChange}
            />
            {label && (
              <label className="form-check-label cursor-pointer" htmlFor={name}>
                {label}
              </label>
            )}
          </div>
        {error && 
          <ErrorAlert>{error as string}</ErrorAlert>
        }
        </div>
      ) : (
        <div
          className={clsx(
            "content-checkbadge relative",
            checked ? "bg-[#A5FFD2] border-[#00D369]" : "border-[#939393]"
          )}
        >
          <input
            disabled={disabled}
            type="checkbox"
            name={name}
            className="checkbadge sr-only"
            id={name}
            checked={checked}
            onChange={() => setChecked && setChecked()}
          />
          {checked && <FontAwesomeIcon color="#00D369" icon={faCheck} />}
          <label className="cursor-pointer" htmlFor={name}>
            {label}
          </label>
        </div>
      )}
    </div>
  );
};

export default CheckBoxComponent;
