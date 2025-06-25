export interface ButtonComponentProps {
    blockAccess?: boolean;
    type?: "button" | "submit" | undefined;
    label: string;
    loading?: boolean;
    className?: string;
    onClick?: () => void;
}

export interface CheckComponentProps {
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    label: string;
}

export interface InputComponentProps {
    disabled?: boolean;
    name: string;
    label?: string;
    typeInput?: string;
    placeholder?: string;
    register?: any;
    className?: string;
    onKeyUp?: (e: any) => void;
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