"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import style from "@/app/font.module.css";
import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import TableComponent from "@/components/shared/table/TableComponent";
import { Statuses } from "@/app/core/enums/academic-enums";
import Image from "next/image";
import CardPaymentRegistrations from "./CardPaymentRegistrations";
import { PaymentsParentsService } from "@/services/landing/parent/paymentsParents-service";
import { formatCurrency } from "@/utils/format-number";
import { showToast } from "@/utils/alerts";
import TabRegistrations from "./TabRegistrations";
import TabsComponent from "@/components/shared/tabs/TabsComponent";
import TabStudents from "./TabStudents";


const MainRegistrations: React.FC = () => {
  const router = useRouter();
  const [registrationsParent, setRegistrationsParent] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [breadcrumbs, setBreadcrumbs] = useState<any>([
    { label: "Home", href: `/landing` },
    { label: "Matriculas" },
  ]);

  const getParentsApplicationsProcess = async (
    page: number = 1,
    size: number = 5,
    academicYear: number = 0,
    isActive: boolean | null = null,
    isVigente: boolean | null = null
  ) => {
    try {
      const response = await PaymentsParentsService.getPayments(
        academicYear,
        isActive,
        isVigente,
        { page: page - 1, size: size }
      );
      if (response.success) {
        setRegistrationsParent(response.data.content);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  
  const handleBack = () => {
    router.back();
  };

  const tabs = [
    {
      label: "Matriculas",
      component: (
        <TabRegistrations
          submitPayment={getParentsApplicationsProcess}
          registrationsParent={registrationsParent}
        />
      ),
    },
    {
      label: "Estudiantes",
      component: (
        <TabStudents />
      ),
    },
  ];

  useEffect(() => {
    getParentsApplicationsProcess();
  }, []);

  return (
    <>
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
              {"Matriculas"}
            </h5>
          </div>

          <BreadcumbComponent className="max-md:hidden" items={breadcrumbs} />
        </header>
        <section className="flex flex-col w-full rounded-[0.5rem] bg-white p-[1.5rem]">
          {registrationsParent.length > 0 ? (<>
            <div className="flex flex-1 shadow-[0_7px_21px_0_#451A1A0A]">
              {tabs.map((tab, index) => (
                <TabsComponent
                  key={index}
                  handleClick={() => setActiveTab(index)}
                  label={tab.label}
                  isActive={activeTab === index}
                  icon={{
                    path: `/assets/icon/${activeTab === index ? "file-check-02-red" : "file-check-02"}.svg`,
                    alt: "icon-file-check",
                  }}
                />
              ))}
            </div>
            {tabs[activeTab].component}
          </>) : (
            <div className="content-admissions flex flex-col gap-[100px] p-[1rem] border-1 border-solid border-[#610CF4] rounded-[0.5rem]">
              <div className="flex flex-col justify-center items-center gap-[0.5rem] py-[0.75rem]">
                <div className="py-[0.75rem] px-[1rem] text-center">
                  <h5 className="font-medium text-[1.25rem]">
                    Aún no cuentas con Matriculas!
                  </h5>
                  <p>Primero debes hacer una solicitud!</p>
                </div>
                <div className="">
                  <ButtonComponent
                    className="primary"
                    icon={{
                      path: "/assets/icon/school-icon.svg",
                      alt: "school-icon",
                    }}
                    label="Buscar Colegio "
                    onClick={() => {
                      router.push("/landing/school");
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default MainRegistrations;

