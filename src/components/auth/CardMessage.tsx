"use client";
import React from "react";
import ButtonComponent from "../shared/button/ButtonComponent";
import { useRouter } from "next/navigation";

const CardMessage: React.FC<{
  label: string;
  labelButton: string;
  path: string;
  subLabel?: string | null;
}> = ({ label, labelButton, path, subLabel = null }) => {
  const router = useRouter();
  const handleSubmit = (path: string) => {
    router.push(path);
  };
  return (<>
      <div className="container grid text-center">
        <img src="/assets/img/logo-nexuscore.png" alt="logo-nexuscore" />
      </div>
      <div className="card-content">
        <div className="grid gap-[2rem]">
          <div className="container grid text-center">
            <h4>{label}</h4>
          </div>
          {subLabel !== null && (
            <div className="container grid text-center">
              <p className="text-[1rem] font-normal">{subLabel}</p>
            </div>
          )}
          <div className="container grid text-center">
            <ButtonComponent
              className="tertiary"
              onClick={() => handleSubmit(path)}
              label={labelButton}
            />
          </div>
        </div>
      </div></>
  );
};

export default CardMessage;
