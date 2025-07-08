import React from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import CardSchool from "./CardSchool";
import "./style.css";
import style from "@/app/font.module.css";

const CollegeGrid: React.FC = () => {
  return (
    <div
        className={`${style["font-outfit"]} content-grid-college flex flex-col items-center gap-8`}>
        <span className="m-0 custom-title">Colegios</span>
        <div className="content-cards-college
            flex flex-col gap-8 justify-items-center
            sm:grid md:grid-cols-2
            xl:grid-cols-3">
            <CardSchool nameSchool="Colegio Buckingham"></CardSchool>
            <CardSchool nameSchool="Colegio Buckingham"></CardSchool>
            <CardSchool nameSchool="Colegio Buckingham"></CardSchool>
            <CardSchool nameSchool="Colegio Buckingham"></CardSchool>
            <CardSchool nameSchool="Colegio Buckingham"></CardSchool>
            <CardSchool nameSchool="Colegio Buckingham"></CardSchool>
        </div>
        <div className="w-full md:max-w-[9rem]">
            <ButtonComponent className="primary" type="button" label="Ver más colegios" />
        </div>
    </div>
  );
};

export default CollegeGrid;
