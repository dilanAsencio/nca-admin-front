import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const ButtonChevronComponent: React.FC<{orientation: string, blockAccess: boolean, onClick: () => void, className: string}> = ({ orientation, blockAccess = false, onClick: onclick, className = "primary" }) => {

    const getIcon = (orientation: string) => {
        switch (orientation) {
            case "up":
                return <FontAwesomeIcon color="#ffffff" icon={faChevronUp} />;
            case "down":
                return <FontAwesomeIcon color="#ffffff" icon={faChevronDown} />;
            case "left":
                return <FontAwesomeIcon color="#ffffff" icon={faChevronLeft} />;
            case "right":
                return <FontAwesomeIcon color="#ffffff" icon={faChevronRight} />;
        }
    };

    return(
    <button
        disabled={blockAccess}
        className={`btn-chevron-custom ` + className}
        onClick={() => onclick()}
    >
        {getIcon(orientation)}
    </button>
    );
}

export default ButtonChevronComponent;
