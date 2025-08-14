export interface ButtonComponentProps {
    blockAccess?: boolean;
    type?: "button" | "submit" | undefined;
    label?: string;
    icon?: {path: string; alt: string};
    loading?: boolean;
    className?: string;
    onClick?: () => void;
}

export interface CheckComponentProps {
    checked: boolean;
    setChecked: () => void;
    label?: string;
    name: string;
    typeCheck?: "checkbox" | "checkbadge";
}

export interface InputComponentProps {
    disabled?: boolean;
    isInputSearch?: boolean;
    name: string;
    label?: string;
    typeInput?: string;
    placeholder?: string;
    register?: any;
    className?: string;
    onKeyUp?: (e: any) => void;
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