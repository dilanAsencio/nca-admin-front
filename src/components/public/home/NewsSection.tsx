"use client";

import React from "react";
import CarouselNews from "./news/CarouselNews";
import "./style.css";
import style from "@/app/font.module.css";

const NewsSection: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]} content-news
      flex flex-col justify-center items-center gap-6
    `}>
        <span className="m-0 custom-title">Noticias</span>
        <div className="content-cards-news w-full h-[24.5rem]">
            <CarouselNews />
        </div>
    </section>
  );
};

export default NewsSection;
