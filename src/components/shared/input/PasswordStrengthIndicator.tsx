"use client";

import React, { useMemo } from "react";

interface PasswordStrengthIndicatorProps {
  password: string | "";
}

const requerimentsList = [
  { name: "minLength", text: "Mínimo 8 caracteres" },
  { name: "upperCase", text: "Al menos una mayúscula y una minúscula" },
  { name: "number", text: "Al menos un número" },
  { name: "specialCharacter", text: "Al menos un carácter especial (!@#$%*)" },
];

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  // Calcula los requerimientos en base al password
  const requeriments = useMemo(() => {
    return [
      {
        ...requerimentsList[0],
        status: password.length >= 8,
      },
      {
        ...requerimentsList[1],
        status: /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password),
      },
      {
        ...requerimentsList[2],
        status: /\d/.test(password),
      },
      {
        ...requerimentsList[3],
        status: /[!@#$%*]/.test(password),
      },
    ];
  }, [password]);

  return (
    <div className="flex flex-col gap-[0.56rem] px-[3.3rem]">
      {requeriments.map((item, index) => (
        <div key={index} className="flex gap-[0.44rem]">
          {!item.status ? (
            <img
              className="w-[1rem]"
              src="/assets/icon/state-no.svg"
              alt="state-no"
            />
          ) : (
            <img
              className="w-[1rem]"
              src="/assets/icon/state-yes.svg"
              alt="state-yes"
            />
          )}
          <p className="text-[0.8rem] m-0">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default PasswordStrengthIndicator;