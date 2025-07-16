import React from "react";
import { CheckComponentProps } from "@/types/componentsShared";
import "./style.css";

const CheckBoxComponent: React.FC<CheckComponentProps> = ({ label, checked, setChecked }) => {
    

    return(<>
        <input
            type="checkbox"
            name="rememberMe"
            className="form-check-input cursor-pointer"
            id="rememberMe"
            checked={checked}
            onChange={() => setChecked(!checked)}
        />
        <label
            className="form-check-label cursor-pointer"
            htmlFor="rememberMe"
        >
            { label }
        </label></>
    )
}

export default CheckBoxComponent;