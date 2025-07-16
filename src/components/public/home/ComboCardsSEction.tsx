"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import "./style.css";
import style from "@/app/font.module.css";
import Image from "next/image";

const ComboCardSection: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]} content-hero hidden
        md:flex md:flex-col-reverse items-center
        lg:flex-row md:gap-8`}
    >
      <div className="flex items-center justify-center">
        <div
          className="content-welcome
          flex flex-col gap-6 items-center
          lg:w-[36.75rem] lg:items-start"
        >
          <span className="m-0 max-lg:text-center lg:text-start custom-title">Combo cards.<br />
            La solución para la alimentación de tus hijos</span>
          <p className="m-0 max-lg:text-center lg:text-start">
            No te preocupes por el efectivo! con Combocards puedes estar pendiente de la alimentación de tus hijos
          </p>
          <div className="content-button w-full md:max-w-[13.375rem]">
            <ButtonComponent
              className="primary"
              type="button"
              label="Saber más de Combocards"
            />
          </div>
        </div>
      </div>
      <div className="content-image relative">
        <Image 
          src="/assets/landing/img/combo-cards-nexus-core-academico.png"
          alt="Estudiante usando tarjeta ComboCard para comprar alimentos en la cafetería escolar"
          width={580}
          height={552}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default ComboCardSection;
