"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import style from "@/app/font.module.css";
import "./style.css";

const CardNews: React.FC<{
  title: string;
  descripcion: string;
  fecha: string;
  img: string;
}> = ({ title, descripcion, fecha, img }) => {
  return (
    <div
      className={`card-news ${style["font-outfit"]}
        flex flex-col w-[21.438rem] rounded-[0.5rem] p-4 gap-4
        md:w-[22.8rem]
        lg:w-[22rem]`}
    >
      <div className="img-news">
        <img
          className="w-full rounded-[0.5rem] h-[11.25rem]"
          src={img}
          alt="img-library"
        />
      </div>
      <div className="content-news flex flex-col gap-[0.813rem]">
        <h5 className="font-medium text-[1.25rem]">{title}</h5>
        <p className="font-normal text-[1rem]">{descripcion}</p>
        <div className="flex flex-row justify-between items-center">
            <p className="font-normal m-0 text-[0.875rem]">{fecha}</p>
            <div className="max-w-24">
            <ButtonComponent
                className="tertiary-outline"
                type="button"
                label="Ver más"
            />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CardNews;
