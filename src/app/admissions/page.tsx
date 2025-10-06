"use client";

import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent"
import SearchCampusComponent from "@/components/admissions/SearchCampus";
import TabsComponent from "@/components/shared/tabs/TabsComponent";

import style from "@/app/font.module.css";
import { BranchesService } from "@/services/managementAcademic/branches-service";
import { useState } from "react";
import { BranchesResponse } from "../core/interfaces/academicManagement/branches-interfaces";
import { Response } from "../core/interfaces/api-interfaces";

const AdmissionsPage: React.FC = () => {
  const iconSchool = {path: "/assets/landing/icon/cards/school-icon-01.svg", alt: "icon-school"};

  const [branches, setBranches] = useState<BranchesResponse[] | null>(null);

  const handleSearchChange = (value: { campus: string | null, grade: string | null, status: string | null }) => {
    value.campus !== null ? getbranchesByCampus(value.campus) : setBranches(null);
  }

  const getbranchesByCampus = async (campusId: string) => {
    const branchesResp = await BranchesService.getBranchesByCampus(campusId, { page: 0, size: 10 }) as Response<any>;
    if (branchesResp?.success && branchesResp.data?.content) {
      const bran = branchesResp.data.content.map((branch: BranchesResponse) => ({
        ...branch,
        display: false
      }));
      setBranches(bran);
    }
  }

  return (
      <div
        className={clsx(
          `${style["font-outfit"]}`,
          "flex flex-col gap-[1.5rem]",
        )}
      >
        <div
          className={clsx(
              `flex justify-between items-center h-[3.125rem]`,
          )}
        >
          <span className="font-semibold text-[1.25rem] text-gray-900">
            Admisiones
          </span>
          <BreadcumbComponent items={[{label: "Admisiones"}]} />
        </div>
        <div className="flex flex-col gap-[1.5rem]">
          <SearchCampusComponent changeValue={(value) => handleSearchChange(value)} />
          <div className="flex flex-col">
            <div className="flex">
              { branches && branches.length > 0 &&
                branches.map((branch) => (
                  <TabsComponent
                    key={branch.id}
                    label={branch.name}
                    icon={iconSchool}
                    isActive={branch.display ? true : false}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default AdmissionsPage
