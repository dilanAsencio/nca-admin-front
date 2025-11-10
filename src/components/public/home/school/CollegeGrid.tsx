import React, { useEffect, useState } from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import CardSchool from "./CardSchool";
import "./style.css";
import style from "@/app/font.module.css";
import { CampusPublicService } from "@/services/public/campus-public-service";
import { useRouter } from "next/navigation";
import { Institution } from "@/app/core/interfaces/public/campus-interfaces";

const CollegeGrid: React.FC = () => {
  const [campus, setCampus] = useState<any[] | null>(null);
  const router = useRouter();

  const fetchCampus = async () => {
    try {
      const response = await CampusPublicService.getCampus({
        page: 0,
        size: 6,
        sort: ["name", "asc"],
      });
      if (response?.content) {
        let campus: any = [];
        response.content.forEach((item) => {
          if (item.campuses && item.campuses.length > 0) {
            item.campuses.forEach((camp: any) => {
              campus.push({ ...camp, tenantId: item.tenantId });
            });
          }
        });

        setCampus(campus);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  const viewCampus = (item: Institution) => {
    router.push(`/landing/school/${item.id}?tenantId=${item.tenantId}`);
  };

  useEffect(() => {
    fetchCampus();
  }, []);

  return (
    <div
      className={`${style["font-outfit"]} content-grid-college flex flex-col items-center gap-8`}
    >
      <span className="m-0 custom-title text-center max-w-[70%]">
        Comienza tu búsqueda de más de 500 colegios en su sólo lugar!
      </span>
      <div
        className="content-cards-college w-full
            flex flex-col gap-8 justify-items-center
            sm:grid md:grid-cols-2
            xl:grid-cols-3"
      >
        {campus?.map((item, index) => {
          return (
            <CardSchool
              key={index}
              infoSchool={item}
              onSubmit={() => viewCampus(item)}
            ></CardSchool>
          );
        })}
      </div>
      <div className="w-full md:max-w-[9rem]">
        <ButtonComponent
          className="primary"
          type="button"
          label="Ver más colegios"
          onClick={() => {
            router.push("/landing/school");
          }}
        />
      </div>
    </div>
  );
};

export default CollegeGrid;
