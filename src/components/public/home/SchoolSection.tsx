"use client";

import React from "react";
import CarouselSchools from "./school/CarouselSchools";
import "./style.css";
import style from "@/app/font.module.css";

const SchoolSection: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]}
      flex flex-col justify-center items-center gap-16
    `}>
        <span className="m-0 custom-title">+500 colegios confian en nosotros</span>
        <CarouselSchools />
    </section>
  );
};

export default SchoolSection;
