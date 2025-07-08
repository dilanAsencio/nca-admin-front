"use client";

import React from "react";
import CarouselTestimonial from "./testimonial/CarouselTestimonial";
import "./style.css";
import style from "@/app/font.module.css";

const TestimonialSection: React.FC = () => {
  return (
    <section
      className={`${style["font-outfit"]} content-testimonial
      flex flex-col justify-center items-center gap-6
    `}>
        <span className="m-0 custom-title">Testimonios</span>
        <div className="content-cards-testimonial w-full h-[24.5rem]">
            <CarouselTestimonial />
        </div>
    </section>
  );
};

export default TestimonialSection;
