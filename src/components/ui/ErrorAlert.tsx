import React from "react";
import { ErrorAlertProps } from "@/types/componentsShared";
import "./style.css";

const ErrorAlert: React.FC<ErrorAlertProps> = ({ children }) => (
  <p role="alert" aria-live="assertive" className="m-0 p-errors font-normal text-[0.875rem]">
    {children}
  </p>
);

export default ErrorAlert;