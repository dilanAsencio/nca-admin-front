import React from "react";
import { InputComponentProps } from "@/app/core/interfaces/shared-interfaces";
import "./style.css";

const PasswordInput: React.FC<InputComponentProps> = ({
  disabled = false,
  className,
  placeholder = "InputText",
  register,
  onKeyUp,
}) => {
  const [showPss, setShowPss] = React.useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = React.useState<{src: string, alt: string}>({src: "/assets/icon/eye-open.svg", alt: "eye-open"});
  const [eyeClose, setEyeClose] = React.useState<{src: string, alt: string}>({src: "/assets/icon/eye-close.svg", alt: "eye-close"});

  return (
    <>
      <input
        placeholder={placeholder}
        type={showPss ? "text" : "password"}
        disabled={disabled}
        className={"custom-input " + className}
        onKeyUp={onKeyUp}
        {...register}
      />
      <button
        className="absolute right-7 top-[13px]"
        disabled={disabled}
        onClick={() => setShowPss(!showPss)}
        tabIndex={-1}
        type="button"
      >
        {!showPss ? (
          <img src={eyeOpen.src} alt={eyeOpen.alt} />
        ) : (
          <img src={eyeClose.src} alt={eyeClose.alt} />
        )}
      </button>
    </>
  );
};

export default PasswordInput;
