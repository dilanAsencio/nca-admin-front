"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import Image from "next/image";
import "./style.css";
import style from "@/app/font.module.css";

const HeroSection: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]} content-hero`}
    >
      <div className="flex items-center justify-center">
        <div
          className="content-welcome
          flex flex-col gap-6 items-center md:items-start
          w-full max-w-sm md:max-w-md xl:max-w-2xl"
        >
          <div className="flex flex-col">
            <span className="custom-title mb-6">¡Bienvenidos!</span>
            <p className="m-0">
              NexusCore Académico es una nueva oportunidad para encontrar el
              colegio ideal.</p>
            <p className="m-0">¡Encuentra el colegio ideal para tu hijo y realiza su
              inscripción en un sólo lugar! Descubre opciones personalizadas y haz
              todo el proceso de admisión de manera fácil y rápida.
            </p>
          </div>
          <div className="content-button w-full md:max-w-[9.375rem]">
            <ButtonComponent
              className="primary"
              type="button"
              label="Empieza a buscar"
            />
          </div>
        </div>
      </div>
      <div className="content-image relative">
        <Image
          src="/assets/landing/img/bienvenidos-nexus-core-academico.png"
          alt="Familia feliz buscando colegios en NexusCore Académico desde una tablet"
          width={556}
          height={514}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default HeroSection;
