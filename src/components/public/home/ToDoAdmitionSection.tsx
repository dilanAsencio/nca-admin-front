"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import "./style.css";
import style from "@/app/font.module.css";
import Image from "next/image";

const ToDoAdmitionSection: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]} content-hero
      flex flex-col-reverse items-center
      md:flex-row md:gap-8`}
    >
      <div className="flex items-center justify-center">
        <div
          className="content-welcome
          flex flex-col gap-6 items-center
          w-[21.438rem]
          md:w-[23.438rem] md:items-start
          xl:w-[36.875rem]"
        >
          <span className="m-0 custom-title max-sm:text-center md:text-start">¿Qué hacer en ADMISIONES?</span>
          <p className="m-0 lg:max-w-[92%]">
            Realiza una búsqueda de colegios de acuerdo con tus criterios.
          </p>
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
          src="/assets/landing/img/que-hacr-en-admisiones-nexus-core-academico.png"
          alt="que-hacr-en-admisiones-nexus-core-academico"
          width={608}
          height={546}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default ToDoAdmitionSection;
