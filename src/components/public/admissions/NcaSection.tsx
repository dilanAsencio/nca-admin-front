"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import "./style.css";
import style from "@/app/font.module.css";
import Image from "next/image";

const NcaSection: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]}
      flex flex-col relative top-[-7.82rem] items-center justify-center gap-[1rem]`}
    >
    <Image
        src="/assets/landing/img/admisiones-nexus-core-academico.png"
        alt="admisiones-nexus-core-academico"
        width={1112}
        height={605}
        loading="lazy"
    />
    <div
        className="flex items-center flex-col gap-[1rem] w-full"
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
    </section>
  );
};

export default NcaSection;
