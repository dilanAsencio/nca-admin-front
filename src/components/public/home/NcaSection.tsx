"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import "./style.css";
import style from "@/app/font.module.css";
import Image from "next/image";

const NcaSection: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]} content-nca
      `}
    >
      <div className="content-image relative flex items-center justify-center">
        <Image
          src="/assets/landing/img/nca-hero-nexus-core-academico.png"
          alt="nca-hero-nexus-core-academico"
          width={578.3594}
          height={327}
          loading="lazy"
        />
      </div>
      <div className="flex justify-center">
        <div
          className="content-welcome
          flex flex-col gap-6 items-center"
        >
          <span className="m-0 custom-title nca text-center max-w-[90%] md:max-w-full">¡Conoce a los NCA Hero!</span>
          <p className="m-0 text-center max-w-[90%]">
            Los NCA Hero son tus aliados para la gestión académica de tus hijos,
             cada uno especializado en una gestión especifica: Rutas, Combocards y Admisiones
          </p>
          <div className="content-button max-w-[45%]">
            <ButtonComponent
              className="primary"
              type="button"
              label="Quiero saber más!"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NcaSection;
