"use client";

import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationComponentProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (size: number) => void; // 👈 Nuevo prop
}

const PaginationTestComponent: React.FC<PaginationComponentProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = useMemo(() => {
    if (totalPages <= 5) return [...Array(totalPages)].map((_, i) => i + 1);

    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage, "...", totalPages];
  }, [totalPages, currentPage]);

//   if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between mt-4 gap-3 text-sm">
      {/* 🔹 Información */}
      <div className="flex items-center gap-2 text-gray-600">
        <span>
          Mostrando {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
        </span>

        {/* 🔹 Selector de elementos por página */}
        <div className="flex items-center gap-2">
          <span>en row:</span>
          <select
            className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange?.(parseInt(e.target.value))}
          >
            {[5, 10, 20, 30, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔹 Navegación */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md border ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
            <FontAwesomeIcon width={20} color="#ffffff" icon={faChevronLeft} />
        </button>

        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" ? onPageChange(page) : undefined
            }
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === page
                ? "bg-purple-600 text-white"
                : typeof page === "number"
                ? "hover:bg-gray-100"
                : "cursor-default text-gray-400"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md border ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
            <FontAwesomeIcon width={20} color="#ffffff" icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default PaginationTestComponent;
