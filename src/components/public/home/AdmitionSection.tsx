"use client";

import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import "./style.css";
import style from "@/app/font.module.css";
import Image from "next/image";

const AdmitionSection: React.FC = () => {
    return (
        <section
            className={`${style["font-outfit"]} content-hero
            flex flex-col items-center
            md:flex-row md:gap-8`}
        >
            <div className="content-image relative ">
                <Image
                    src="/assets/landing/img/iniciar-admisiones-nexus-core-academico.png"
                    alt="iniciar-admisiones-nexus-core-academico"
                    width={503}
                    height={468}
                    loading="lazy"
                />
            </div>
            <div className="flex items-center justify-center">
                <div
                    className="content-welcome
                    flex flex-col gap-6 items-center
                    w-[21.438rem]
                    md:w-[25.5rem] md:items-start
                    xl:w-[41.313rem]"
                >
                    <span className="m-0 custom-title max-sm:text-center md:text-start md:max-w-[80%]">Inicia procesos de Admisiones</span>
                    <p className="m-0">
                        Luego de seleccionar tus colegios favoritos, inicia procesos de admisiones con un clic;
                        diligencia los formularios, carga tus documentos, y los colegios hacen el resto.
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
        </section>
    );
};

export default AdmitionSection;
