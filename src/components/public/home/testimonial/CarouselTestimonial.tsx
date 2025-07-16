"use client";

import React, { useEffect, useState } from "react";

import ButtonChevronComponent from "@/components/shared/button/ButtonChevron";
import CardTestimonial from "./CardTestimonial";

import "./style.css";

const CarouselTestimonial: React.FC = () => {
    const mockTestimonial = [
        { id: 1, name: "Lorem ipsum #1", message: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", typeIcon: "people", points: 5,  img: "/assets/landing/img/df-checker.png" },
        { id: 2, name: "Lorem ipsum #2", message: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", typeIcon: "school", points: 4,  img: "/assets/landing/img/df-checker.png" },
        { id: 3, name: "Lorem ipsum #3", message: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", typeIcon: "school", points: 3,  img: "/assets/landing/img/df-checker.png" },
        { id: 4, name: "Lorem ipsum #4", message: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", typeIcon: "people", points: 5,  img: "/assets/landing/img/df-checker.png" },
        { id: 5, name: "Lorem ipsum #5", message: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", typeIcon: "people", points: 4,  img: "/assets/landing/img/df-checker.png" },
        { id: 6, name: "Lorem ipsum #6", message: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", typeIcon: "school", points: 4,  img: "/assets/landing/img/df-checker.png" },
    ];

  // Estado para la página actual y el número de cards visibles
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(1);

  // Calcula cuántos cards mostrar según el tamaño de pantalla
  const updateVisibleItems = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1024) return setVisibleItems(4); // lg
      if (width >= 768) return setVisibleItems(2); // md
    }
    setVisibleItems(1); // sm
  };

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);
  
  // Calcula los cards visibles para la página actual
  const start = (currentPage - 1) * visibleItems;
  const end = start + visibleItems;
  const visibleTestimonial = mockTestimonial.slice(start, end);

  // Total de páginas
  const totalPages = Math.ceil(mockTestimonial.length / visibleItems);
  
  // Navegación
  const next = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
        <div className="relative w-full">
            <ButtonChevronComponent
                orientation="left"
                className="absolute
                    left-0 z-10 w-8 h-8 p-1 top-[11.298rem]
                    md:w-[3rem] md:h-[3rem] md:p-1.5
                    lg:w-16 lg:left-[-4.125rem] lg:h-16 lg:p-2"
                blockAccess={currentPage === 0} onClick={prev} />
            
            <div className="carousel-news overflow-x-hidden w-full absolute left-0 flex transition-transform duration-500 ease-in-out md:gap-4 lg:gap-6">
                {visibleTestimonial.map((item) => (
                    <div
                        key={item.id}
                        className={`
                            flex-[0_0_100%]
                            md:flex-[0_0_50%] md:max-w-[50%]
                            lg:flex-[0_0_33.3333%] lg:max-w-[33.3333%]`}>
                        <CardTestimonial {...item} />
                    </div>
                ))}
            </div>

            <ButtonChevronComponent
                orientation="right"
                className="absolute
                    right-0 z-10 w-8 h-8 p-1 top-[11.298rem]
                    md:w-[3rem] md:h-[3rem] md:p-1.5
                    lg:w-16 lg:right-[-4.125rem] lg:h-16 lg:p-2"
                blockAccess={currentPage === totalPages - 1} onClick={next} />
        </div>
    </div>
  );
};

export default CarouselTestimonial;
