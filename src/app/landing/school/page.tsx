"use client";

import React, { useEffect, useState } from "react";
import Search from "@/app/landing/school/components/search/Search";
import Filter from "@/app/landing/school/components/filter/Filter";
import "./style.css";
import CardSchool from "@/components/public/home/school/CardSchool";
import Pagination from "@/components/shared/paginate/PaginationComponent";
import { CampusPublicService } from "@/services/public/campus-public-service";
import { Institution } from "@/app/core/interfaces/public/campus-interfaces";
import { useRouter } from "next/navigation";
import { useLanding } from "@/providers/landing-context";

const SchoolPage: React.FC = () => {

  const { handleMenu } = useLanding();
  const [campus, setCampus] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 9;
  const router = useRouter();

  const fetchCampus  = async (page: number, search?: string) => {
    try {
      const response = await CampusPublicService.getCampus(
        {page: page - 1,
        size: itemsPerPage,
        sort: ["name", "asc"],
      });
      if (response?.content) {        
        let campus: any = [];
        response.content.forEach((item) => {
          if (item.campuses && item.campuses.length > 0) {
            item.campuses.forEach((camp: any) => {
              campus.push({...camp, tenantId: item.tenantId});
            });
          }
        });
        
        setCampus(campus);
        setTotalItems(response.totalElements);
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

  const viewCampus = (item: Institution) => {
    router.push(`/landing/school/${item.id}?tenantId=${item.tenantId}`, );
  }

  useEffect(() => {
    handleMenu("colegios")
  }, []);

  useEffect(() => {
    fetchCampus(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  return (
    <main className="content-home flex flex-col gap-4 my-4">
      <Search search={handleSearch} />
      <div className="flex flex-row gap-4">
        <div className="content-filter">
          <Filter />
        </div>
        <div className="flex flex-col gap-4">
          <div className="content-grid-school basis-3/4 grid max-[960px]:grid-cols-1 gap-3 max-[1165px]:grid-cols-2 min-[1165px]:grid-cols-3">
            {
              campus?.map((item, index) => {
                return (
                <CardSchool
                  key={index}
                  infoSchool={item}
                  onSubmit={() => viewCampus(item)}></CardSchool>
              )})
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
    </main>
  );
};
  
export default SchoolPage;
