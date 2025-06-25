import { useState } from "react";

export function usePasswordValidation() {
  const [requirements, setRequirements] = useState({
    minLength: false,
    upperCase: false,
    number: false,
    specialChar: false,
  });

  const validate = (password: string) => {
    setRequirements({
      minLength: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%*]/.test(password),
    });
  };

  const isValid = Object.values(requirements).every(Boolean);

  return { requirements, validate, isValid };
}