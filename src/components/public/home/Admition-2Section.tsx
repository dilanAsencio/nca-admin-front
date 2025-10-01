"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import "./style.css";
import style from "@/app/font.module.css";
import Image from "next/image";

const Admition2Section: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]}
      flex flex-col items-center justify-center gap-[1rem]`}
    >
      <div className="content-image relative flex items-center justify-center">
        <Image
          src="/assets/landing/img/admisiones-nexus-core-academico.png"
          alt="admisiones-nexus-core-academico"
          width={1112}
          height={605}
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-center">
        <div
          className="content-welcome
          flex flex-col gap-6 items-center
          lg:w-[28.25rem] lg:items-start"
        >
          <span className="m-0 max-lg:text-center custom-title">
            ¡Fácil, intuitivo y seguro!
          </span>
          <p className="m-0 max-lg:text-center ">
            Con Admisiones, puedes realizar tu proceso desde la comodidad de tu
            casa y de forma rápida.
          </p>
          <div className="content-button w-full md:max-w-[9.375rem]">
            <ButtonComponent
              className="primary"
              type="button"
              label="Iniciemos"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admition2Section;
