"use client";

import React from "react";

import StarsPoints from "./StarsPoints";

import style from "@/app/font.module.css";
import "./style.css";

const CardTestimonial: React.FC<{
  name: string;
  message: string;
  typeIcon: string | "school" | "people";
  points: number;
  img: string;
}> = ({ name, message, img, typeIcon, points }) => {
  return (
    <div
      className={`card-testimonial relative ${style["font-outfit"]} min-h-[16.5rem] mt-[3.125rem]
        flex flex-col items-center pt-12 px-4 pb-4 rounded-[0.5rem] gap-4
        md:w-[22.8rem]
        lg:w-[22rem]`}
    >
        <img className="absolute top-[-3rem] rounded-full w-[5.5rem] h-[5.5rem]" src={img} alt="img-testimonial" />
        <div className="pt-2">
            <h5>{name}</h5>
        </div>
        <div className="">
            <img src={`/assets/landing/icon/cards/${typeIcon === "people" ? "users-profile-01" : "school-icon-01"}.svg`} alt="icon-testimonial" />
        </div>
        <p className="font-normal text-[1rem]">{message}</p>
        <StarsPoints points={points} />
    </div>
  );
};

export default CardTestimonial;
