import React from "react";
import { ButtonComponentProps } from "@/app/core/interfaces/shared-interfaces";
import "./style.css";

const AuthButton: React.FC<ButtonComponentProps> = ({ blockAccess = false, loading = false, type, label, className = "primary", size = "normal" }) => {

    return(
    <button
        type={type}
        disabled={loading || blockAccess}
        className={`btn-custom ${size} `+className}
        aria-busy={loading}
    >
        {loading ? <i className="fa-solid fa-spinner mr-2"></i> : null}
        {label}
    </button>
    );
}

export default AuthButton;