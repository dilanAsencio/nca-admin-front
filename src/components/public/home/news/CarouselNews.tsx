"use client";

import React, { useEffect, useState } from "react";
import ButtonChevronComponent from "@/components/shared/button/ButtonChevron";
import CardNews from "./CardsNews";
import "./style.css";

const CarouselNews: React.FC = () => {
    const mockNews = [
        { id: 1, title: "Lorem ipsum #1", descripcion: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", fecha: "01/07/2025", img: "/assets/landing/img/library.png" },
        { id: 2, title: "Lorem ipsum #2", descripcion: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", fecha: "30/06/2025", img: "/assets/landing/img/library.png" },
        { id: 3, title: "Lorem ipsum #3", descripcion: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", fecha: "29/07/2025", img: "/assets/landing/img/library.png" },
        { id: 4, title: "Lorem ipsum #4", descripcion: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", fecha: "28/07/2025", img: "/assets/landing/img/library.png" },
        { id: 5, title: "Lorem ipsum #5", descripcion: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", fecha: "27/07/2025", img: "/assets/landing/img/library.png" },
        { id: 6, title: "Lorem ipsum #6", descripcion: "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.", fecha: "26/07/2025", img: "/assets/landing/img/library.png" },
    ];

  // Estado para la página actual y el número de cards visibles
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(1);

  // Calcula cuántos cards mostrar según el tamaño de pantalla
  const updateVisibleItems = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1024) return setVisibleItems(3); // lg
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
  const visibleNews = mockNews.slice(start, end);

  // Total de páginas
  const totalPages = Math.ceil(mockNews.length / visibleItems);
  
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
            
            <div className="carousel-news overflow-hidden w-full absolute left-0 flex transition-transform duration-500 ease-in-out md:gap-4 lg:gap-6">
                {visibleNews.map((item) => (
                    <div
                        key={item.id}
                        className={`
                            flex-[0_0_100%]
                            md:flex-[0_0_50%] md:max-w-[50%]
                            lg:flex-[0_0_33.3333%] lg:max-w-[33.3333%]`}>
                        <CardNews {...item} />
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

export default CarouselNews;
