"use client";

import React, { useEffect, useState } from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import style from "@/app/font.module.css";
import "./style.css";
import Image from "next/image";
import clsx from "clsx";
import { Tooltip } from "primereact/tooltip";
import { genderOptions, religionOptions } from "@/app/core/constants/default-const";

const CardSchool: React.FC<{
  infoSchool: any;
  onSubmit?: () => void;
}> = ({ onSubmit, infoSchool }) => {
  const [nameSchoolState, setNameSchoolState] = useState<string>("Nombre Colegio");
  const [infoPops, setPops] = useState<any[]>([]);
  const [imgSchool, setImgSchool] = useState(
    "/assets/landing/img/df-checker.png"
  );

  const getIcons = (name: string, op: boolean | string) => {
    switch (name) {
      case "languages":
        const iconB = op ? 
          "/assets/landing/icon/cards/bilingue.svg" :
          "/assets/landing/icon/cards/bilingue-01.svg";
        return iconB;
      case "gender":
        const iconG = `/assets/landing/icon/cards/${op}.svg`;
        return iconG;
      case "religion":
        return "/assets/landing/icon/cards/cross.svg";
      default:
        return "/assets/landing/icon/cards/calendar.svg";
    }
  };

  const renderInfoPops = (info: any) => {
    setNameSchoolState(info?.name.toUpperCase());
    const isBilingual = info?.languages && info?.languages.length > 1;
    const labelBilingual = isBilingual ? "Bilingüe" : "No Bilingüe";
    const gender = genderOptions.find(g => g.value === info?.gender)?.label || "No especificado";
    const religion = religionOptions.find(r => r.value === info?.religion)?.label || "No especificado";

    setPops([
      {label: labelBilingual, name: "languages", icon: getIcons("languages", isBilingual)},
      {label: gender, name: "gender", icon: getIcons("gender", info?.gender)},
      {label: religion, name: "religion", icon: getIcons("religion", false)},
    ]);
  }

  useEffect(() => {
    if (infoSchool) {
      renderInfoPops(infoSchool);
    }
  }, [infoSchool]);

  return (
    <div
      className={`card-school ${style["font-outfit"]}
        flex flex-col w-[21.438rem] h-max rounded-[0.5rem] p-4 gap-4
        md:w-[21rem]
        lg:w-full`}
    >
      <div className="img-school relative">
        <img
          className="w-full relative rounded-[0.5rem] h-[12.625rem]"
          src={imgSchool}
          alt="img-school"
        />
        <img
          className="logo-school p-[0.19rem] rounded-full absolute top-[0.5rem] left-[0.5rem]"
          src="/assets/landing/icon/cards/logo-school-img.svg"
          alt="logo-school"
        />
        <div className={clsx(
          "favorite-school cursor-pointer",
          `p-[0.5rem] absolute top-[0.5rem] right-[0.5rem] rounded-full`,
          )}>
          <Image
            src={"/assets/icon/icon-heart.svg"}
            alt="img-heart"
            width={28}
            height={28}
            loading="lazy"
            className="icon-favorite"
          />
        </div>
      </div>
      <Tooltip target=".tp-name" />
      <div data-pr-tooltip={nameSchoolState} data-pr-position="top" className="name-school tp-name p-1">
        <h5 className="font-medium text-[1.25rem] text-ellipsis whitespace-nowrap overflow-hidden">{nameSchoolState}</h5>
      </div>
      <div className="info-school grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2 text-[0.875rem]">
        {infoPops.map((info, index) => (
          <div key={index} className="flex flex-row items-center gap-2 max-w-[9.625rem]">
            <img className="p-" src={info.icon} alt={info.name} />
            <p className="m-0">{info.label}</p>
          </div>
        ))}
      </div>
      <ButtonComponent className="primary" type="button" onClick={() => onSubmit && onSubmit()} label="Saber más" />
    </div>
  );
};

export default CardSchool;
