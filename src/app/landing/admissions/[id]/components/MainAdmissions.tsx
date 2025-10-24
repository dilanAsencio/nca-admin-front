"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import style from "@/app/font.module.css";
import clsx from "clsx";
import Image from "next/image";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import CardAdmissions from "./CardAdmissions";
import { AdmissionsLandingService } from "@/services/landing/admissions/admissions-service";
import { useLanding } from "@/providers/landing-context";
import NewApplicationAdmissionForm from "./NewApplicationAdmissionForm";

const MainAdmissions: React.FC = () => {
  const { id } = useParams<{ id: string; tenantId: string }>();
  const campusId = id;
  const { handleMenu } = useLanding();
  const [admissionsProcess, setAdmissionsProcess] = useState<any[]>([]);
  const [isSelectedProcess, setIsSelectedProcess] = useState<{viewForm: boolean, ids: any}>({viewForm: false, ids: {}});

  const breadcrumbs = [
    { label: "Home", href: `/landing` },
    { label: "Admisiones" },
  ];

  const getAdmissonsProcessesCampus = async (campusId?: string) => {
    try {
      const response =
        await AdmissionsLandingService.getAdmissionsProcessByCampus(campusId);
      if (response?.availableProcesses) {        
        setAdmissionsProcess(response.availableProcesses);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSelectProcess = (grade: any, proceso: any) => {
    const processId = proceso?.admissionProcessId;
    const gradeId = grade?.gradeId;
    setIsSelectedProcess({viewForm: true, ids: {processId, campusId, gradeId}});
  };

  const handleBack = () => {
    !isSelectedProcess.viewForm && history.back();
    setIsSelectedProcess({viewForm: false, ids: {}});
  }

  useEffect(() => {
    handleMenu("admisiones");
    getAdmissonsProcessesCampus(campusId);
  }, [campusId]);

  return (
    <main
      className={clsx("flex flex-col justify-center", style["font-outfit"])}
    >
      <header className="flex justify-between py-[0.75rem] mb-1">
        <div className="flex items-center gap-[1rem]">
          <Image
            src={"/assets/icon/arrow-left.svg"}
            alt="icon-arrow-left"
            width={24}
            height={24}
            loading="lazy"
            onClick={() => handleBack()}
            className="cursor-pointer"
          />

          <h5 className="m-0 text-[1.25rem] text-gray-900 leading-[120%] font-medium">
            Admisiones
          </h5>
        </div>

        <BreadcumbComponent items={breadcrumbs} />
      </header>
      <section className="flex flex-col w-full rounded-[0.5rem] bg-white p-[1.5rem]">
        {isSelectedProcess.viewForm ?
          <NewApplicationAdmissionForm
            onClose={() => setIsSelectedProcess({viewForm: false, ids: {}})}
            infoIds={isSelectedProcess.ids}
          />
          :
          <>
            {admissionsProcess.map((item: any, index: number) => (
              <CardAdmissions
                grades={item.availableGrades}
                selectedProcess={(process) =>
                  handleSelectProcess(process, item)
                }
                key={index}
                periodAdmission={[item.startDate, item.endDate]}
                title={item.name}
              />
            ))}
          </>
        }
      </section>
    </main>
  );
};

export default MainAdmissions;
