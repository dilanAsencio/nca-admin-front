"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import "./style.css";
import style from "@/app/font.module.css";
import Image from "next/image";

const Admition2Section: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]} content-hero hidden
      md:flex md:flex-col-reverse md:items-center
      lg:flex-row md:gap-8`}
    >
      <div className="flex items-center justify-center">
        <div
          className="content-welcome
          flex flex-col gap-6 items-center
          lg:w-[28.25rem] lg:items-start"
        >
          <span className="m-0 max-lg:text-center lg:text-start lg:max-w-[95%] custom-title">
            Tu proceso en admisiones serán más rápidos y en un sólo lugar!
          </span>
          <p className="m-0 max-lg:text-center lg:text-start ">
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
      <div className="content-image relative ">
        <Image
          src="/assets/landing/img/admisiones-nexus-core-academico.png"
          alt="admisiones-nexus-core-academico"
          width={716}
          height={501}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Admition2Section;
