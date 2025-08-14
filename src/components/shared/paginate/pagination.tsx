"use client";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const next = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav className="flex items-center gap-[0.63rem]">
      <div
        onClick={prev}
        aria-disabled={currentPage === 1}
        className={clsx(
            "flex items-center justify-center rounded-l-[0.75rem] p-[0.63rem] bg-[#FD6E7A] border cursor-pointer w-[2.5rem] h-[2.5rem]",
        )}
      >
        <FontAwesomeIcon width={20} color="#ffffff" icon={faChevronLeft} />
      </div>

      {pages.map((page) => (
        <div
          key={page}
          onClick={() => onPageChange(page)}
          className={`p-[0.625rem] rounded-[0.75rem] border-0 cursor-pointer w-[2.5rem] h-[2.5rem] flex items-center justify-center ${
            page === currentPage
              ? "bg-[#FD6E7A] text-white"
              : "bg-[#FFF2F3] text-black border border-[#FEDADD]"
          }`}
        >
          <span className="m-0 font-bold text-[1rem]">{page}</span>
        </div>
      ))}

      <div
        onClick={next}
        aria-disabled={currentPage === totalPages}
        className={clsx(
            "flex items-center justify-center rounded-r-[0.75rem] p-[0.63rem] bg-[#FD6E7A] border cursor-pointer w-[2.5rem] h-[2.5rem]",
        )}
      >
        <FontAwesomeIcon width={20} color="#ffffff" icon={faChevronRight} />
      </div>
    </nav>
  );
};

export default Pagination;
