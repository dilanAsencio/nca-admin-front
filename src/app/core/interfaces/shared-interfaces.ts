import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIconProps, FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icons } from "next/dist/lib/metadata/types/metadata-types";
import { Nullable } from "primereact/ts-helpers";

export interface ButtonComponentProps {
    blockAccess?: boolean;
    type?: "button" | "submit" | undefined;
    size?: "small" | "normal";
    label?: string;
    icon?: {path: string; alt: string};
    iconPosition?: "left" | "right";
    loading?: boolean;
    className?: string;
    onClick?: () => void;
    isSpinner?: any;

}

interface PopUpOption {
  label: string;
  icon?: {path: string; alt: string};
  onClick: () => void;
}

export interface ButtonPopUpProps extends ButtonComponentProps {
  options: PopUpOption[];

}

export interface CheckComponentProps {
    error?: string
    checked: boolean;
    disabled?: boolean;
    onChange?: (e: any) => void;
    setChecked?: () => void;
    label?: string;
    name: string;
    typeCheck?: "checkbox" | "checkbadge";
}

export interface InputComponentProps {
    value?: string | number;
    disabled?: boolean;
    isInputSearch?: boolean;
    name: string;
    label?: string;
    typeInput?: string;
    placeholder?: string;
    register?: any;
    className?: string;
    onKeyUp?: (e: any) => void;
    required?: boolean;
    readOnly?: boolean;
    error?: string;
}

export interface InputDateComponentProps extends InputComponentProps {
  viweType?: "date" | "month" | "year";
  showIcon?: boolean;
  control?: any;
}

interface options {
    label: string;
    value: string;
}
export interface DropdownComponentProps {
    isMulti?: boolean;
    disabled?: boolean;
    name: string;
    label?: string;
    placeholder?: string;
    value?: string | string[];
    className?: string;
    options: options[];
    onChange?: (value: string | string[]) => void;
    readOnly?: boolean;
    required?: boolean;
    error?: string;
}


export interface CountdownTimerProps {
  initialSeconds: number;
  onFinish?: () => void;
}

export interface AttemptCounterProps {
  attempts: number;
  maxAttempts?: number;
}

export interface ErrorAlertProps {
  children: React.ReactNode;
}