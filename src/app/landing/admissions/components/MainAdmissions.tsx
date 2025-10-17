"use client";

import React, { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import style from "@/app/font.module.css";
import clsx from "clsx";
import Image from "next/image";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import BasicDataForm from "./BasicDataForm";

const MainAdmissions: React.FC = () => {

  const { id } = useParams<{ id: string; tenantId: string }>();
  const searchParams = useSearchParams();
  const queryTenantId = searchParams.get("tenantId") || "";

  const breadcrumbs = [
    { label: "Home", href: `/landing` },
    { label: "Admisiones" },
  ];

  useEffect(() => {
    console.log("id: ", id);
    console.log("queryTenantId: ", queryTenantId);
  }, []);

  return (
    <main
      className={clsx(
        "flex flex-col justify-center gap-[2.75rem]",
        style["font-outfit"]
      )}
    >
      <header className="flex justify-between py-[0.75rem] mb-1">
        <div className="flex items-center gap-[1.45rem]">
          <Image
            src={"/assets/icon/arrow-left.svg"}
            alt="icon-arrow-left"
            width={24}
            height={24}
            loading="lazy"
            onClick={() => history.back()}
            className="cursor-pointer"
          />

          <h5 className="m-0 text-[1.25rem] text-gray-900 leading-[120%] font-medium">
            Admisiones
          </h5>
        </div>

        <BreadcumbComponent items={breadcrumbs} />
      </header>
      <section className="flex flex-col w-full rounded-[0.5rem] bg-white">
        <div className="p-[1rem]">
          <span className="m-0 font-medium text-[1.125rem] text-gray-900">
            Datos Aspirante
          </span>
        </div>
        <BasicDataForm />
      </section>
    </main>
  );
};

export default MainAdmissions;
