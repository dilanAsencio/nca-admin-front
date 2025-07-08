"use client";

import React, { useEffect, useState } from "react";
import ButtonChevronComponent from "@/components/shared/button/ButtonChevron";
import "./style.css";

const CarouselSchools: React.FC = () => {
    const mockSchools = [
        { id: 1, label: "School #1", img: "/assets/landing/img/school-1.png" },
        { id: 2, label: "School #2", img: "/assets/landing/img/school-2.png" },
        { id: 3, label: "School #3", img: "/assets/landing/img/school-3.png" },
        { id: 4, label: "School #4", img: "/assets/landing/img/school-4.png" },
        { id: 5, label: "School #5", img: "/assets/landing/img/school-5.png" },
        { id: 6, label: "School #6", img: "/assets/landing/img/school-6.png" },
        { id: 7, label: "School #7", img: "/assets/landing/img/school-7.png" },
        { id: 8, label: "School #8", img: "/assets/landing/img/school-8.png" },
        { id: 5, label: "School #5", img: "/assets/landing/img/school-5.png" },
        { id: 6, label: "School #6", img: "/assets/landing/img/school-6.png" },
        { id: 3, label: "School #3", img: "/assets/landing/img/school-3.png" },
        { id: 4, label: "School #4", img: "/assets/landing/img/school-4.png" },
        { id: 4, label: "School #4", img: "/assets/landing/img/school-4.png" },
        { id: 6, label: "School #6", img: "/assets/landing/img/school-6.png" },
        { id: 1, label: "School #1", img: "/assets/landing/img/school-1.png" },
        { id: 2, label: "School #2", img: "/assets/landing/img/school-2.png" },
    ];

  // Estado para la página actual y el número de cards visibles
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(1);

  // Calcula cuántos cards mostrar según el tamaño de pantalla
  const updateVisibleItems = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1024) return setVisibleItems(8); // lg
      if (width >= 768) return setVisibleItems(5); // md
    }
    setVisibleItems(2); // sm
  };

  
  // Calcula los cards visibles para la página actual
  const start = (currentPage - 1) * visibleItems;
  const end = start + visibleItems;
  const visibleSchools = mockSchools.slice(start, end);

  // Total de páginas
  const totalPages = Math.ceil(mockSchools.length / visibleItems);
  
  // Navegación
  const next = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);
  return (
    <div className="custom-carousel w-full relative flex items-center gap-3 p-6 h-[8.336rem] rounded-[0.5rem]">
        {/* <div className="relative w-full"> */}
            <ButtonChevronComponent
                orientation="left"
                className="
                    left-0 z-10 w-8 h-8 p-1
                    md:w-[3rem] md:h-[3rem] md:p-1.5
                    lg:w-16 lg:h-[3.625rem] lg:p-2"
                blockAccess={currentPage === 0} onClick={() => prev} />
            
            <div className="carousel-schools overflow-hidden w-full flex justify-between transition-transform duration-500 ease-in-out">
                {visibleSchools.map((item) => (
                    <img key={item.id}
                        className="w-[5.311rem] h-[5.336rem]"
                        src={item.img}
                        alt={item.label} />
                ))}
            </div>

            <ButtonChevronComponent
                orientation="right"
                className="
                    right-0 z-10 w-8 h-8 p-1
                    md:w-[3rem] md:h-[3rem] md:p-1.5
                    lg:w-16 lg:h-[3.625rem] lg:p-2"
                blockAccess={currentPage === totalPages - 1} onClick={() => next} />
        </div>
    // </div>
  );
};

export default CarouselSchools;
