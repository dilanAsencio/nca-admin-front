"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import "./style.css";
import style from "@/app/font.module.css";
import Image from "next/image";

const RutesSection: React.FC = () => {
    return (
        <section
            className={`${style["font-outfit"]} content-hero hidden
            md:flex md:flex-col items-center
            lg:flex-row md:gap-8`}
        >
            <div className="content-image relative">
                <Image
                    src="/assets/landing/img/rutas-nexus-core-academico.png"
                    alt="rutas-nexus-core-academico"
                    width={663}
                    height={552}
                    loading="lazy"
                />
            </div>
            <div className="flex items-center justify-center">
                <div
                    className="content-welcome
                    flex flex-col gap-6 items-center
                    lg:w-[31.5625rem] lg:items-start"
                >
                    <span className="m-0 max-lg:text-center max-w-[80%] lg:max-w-[100%] lg:text-start custom-title">Con Rutas, siempre sabras la ubicación de tus hijos</span>
                    <p className="m-0 max-lg:text-center max-w-[95%] lg:max-w-[100%] lg:text-start">
                        Rutas es una app que te indica en tiempo real,
                        con geolocalización el recorrido de tu hijos de la casa al colegio y del colegio a la casa!
                    </p>
                    <div className="content-button w-full md:max-w-[10.975rem]">
                        <ButtonComponent
                            className="primary"
                            type="button"
                            label="Saber más de rutas"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RutesSection;
