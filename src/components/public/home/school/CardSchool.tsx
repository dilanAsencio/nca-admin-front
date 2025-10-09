"use client";

import React, { useState } from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import style from "@/app/font.module.css";
import "./style.css";
import Image from "next/image";
import clsx from "clsx";

const CardSchool: React.FC<{
  nameSchool: string;
  onSubmit?: () => void;
}> = ({ nameSchool = "School Name", onSubmit }) => {
  const [imgSchool, setImgSchool] = useState(
    "/assets/landing/img/df-checker.png"
  );
  const infoSchool = [
    {label: "Calendario A", name: "calendario-a", icon: "/assets/landing/icon/cards/calendar.svg"},
    {label: "Bilingüe", name: "calendario-a", icon: "/assets/landing/icon/cards/bilingue.svg"},
    {label: "Mixto", name: "calendario-a", icon: "/assets/landing/icon/cards/mixto.svg"},
    {label: "Católico", name: "calendario-a", icon: "/assets/landing/icon/cards/cross.svg"},
  ];
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
      <div className="name-school p-1">
        <h5 className="font-medium text-[1.25rem]">{nameSchool}</h5>
      </div>
      <div className="info-school grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2 text-[0.875rem]">
        {infoSchool.map((info, index) => (
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
