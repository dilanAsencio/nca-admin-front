"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import Image from "next/image";
import "./style.css";
import style from "@/app/font.module.css";

const HeroSection: React.FC = () => {
  return (
    <section className={`${style["font-outfit"]} content-hero`}>
      <div className="flex items-center justify-center">
        <div
          className="content-welcome
          flex flex-col gap-6 items-center md:items-start          
          w-full max-w-sm md:max-w-md xl:max-w-xl"
        >
          <div className="flex flex-col">
            <span className="custom-title mb-6">
              Tu proceso de Admisión fácil y rápido con “Alia”
            </span>
            <p className="m-0">
              Tu proceso de Admision lo llevarás a cabo con nuestra querida
              “Alia”, tu NCAHero que te ayudara a realizar el porceso de
              admisión de forma sencilla y correcta
            </p>
          </div>
          <div className="content-button w-full md:max-w-[9.375rem]">
            <ButtonComponent
              className="primary"
              type="button"
              label="Empieza Ahora"
            />
          </div>
        </div>
      </div>
      <Image
        src="/assets/landing/img/hero-admisiones.png"
        alt="Alia nuestra NCAHero volando"
        width={556}
        height={514}
        loading="lazy"
      />
    </section>
  );
};

export default HeroSection;
