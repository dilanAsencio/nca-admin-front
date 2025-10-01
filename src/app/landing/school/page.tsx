"use client";

import React, { useEffect, useState } from "react";
import Search from "@/components/public/school/search/Search";
import Filter from "@/components/public/school/filter/Filter";
import "./style.css";
import { SchoolService } from "@/services/managementAcademic/school-services";
import { SchoolResponse } from "@/types/forms-types";
import CardSchool from "@/components/public/home/school/CardSchool";
import Pagination from "@/components/shared/paginate/pagination";

const SchoolPage: React.FC = () => {
  const [campus, setCampus] = useState<SchoolResponse[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6;

  const fetchCampus  = async (page: number, search?: string) => {
    try {
      const response = await SchoolService.getCampus(
        page - 1,
        itemsPerPage,
        search
      );
      if (response?.success) {
        setCampus(response.data.content);
        setTotalItems(response.data.totalElements);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSearch = (term: string) => {
    const limitSearch = 3;
    setSearchTerm(term.length >= limitSearch ? term : "");
    setCurrentPage(1); // Reiniciar a página 1
  };

  useEffect(() => {
    fetchCampus(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  return (
    <div className="content-home flex flex-col gap-4 my-4">
      <Search search={handleSearch} />
      <div className="flex flex-row gap-4">
        <div className="content-filter">
          <Filter />
        </div>
        <div className="flex flex-col gap-4">
          <div className="content-grid-school basis-3/4 grid grid-cols-3 gap-3">
            {
              campus?.map((item, index) => {
                return <CardSchool key={index} nameSchool={item.name}></CardSchool>;
              })
            }
          </div>
          <div className="flex justify-start">
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default SchoolPage;
