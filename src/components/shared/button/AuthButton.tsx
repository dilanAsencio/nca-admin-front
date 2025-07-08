import React from "react";
import { ButtonComponentProps } from "@/types/componentsShared";
import "./style.css";

const AuthButton: React.FC<ButtonComponentProps> = ({ blockAccess = false, loading = false, type, label, className = "primary" }) => {

    return(
    <button
        type={type}
        disabled={loading || blockAccess}
        className={`btn-custom `+className}
        aria-busy={loading}
    >
        {loading ? <i className="fa-solid fa-spinner mr-2"></i> : null}
        {label}
    </button>
    );
}

export default AuthButton;