"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CampusPublicService } from "@/services/public/campus-public-service";
import Image from "next/image";
import style from "@/app/font.module.css";
import clsx from "clsx";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import { BranchResponse, CampusDetail, CampusDetailBackend } from "@/app/core/interfaces/public/campus-interfaces";
import { mapCampusDetail } from "@/utils/mappers/campus.mapper";
import TabsComponent from "@/components/shared/tabs/TabsComponent";
import * as alerts from "@/utils/alerts";
import "./style.css";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import CardProcessComponent from "../components/CardProcess";
import { useLanding } from "@/providers/landing-context";

const SchoolDetailsPage: React.FC = () => {
  const { id } = useParams<{id: string, tenantId: string}>();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get('tenantId') || '';
  const {handleMenu} = useLanding();
  const [campusData, setCampusData] = useState<CampusDetail | null>(null);
  const [ branches, setBranches ] = useState<BranchResponse[]>([]);
  const [ breadcrumbs, setBreadcrumbs ] = useState<{ label: string; href?: string }[]>([]);
  const [ selectedTab, setSelectedTab ] = useState<number>(0);
  const [ infoTab, setInfoTab ] = useState<BranchResponse | null>(null);
  const router = useRouter();
  const showToast = alerts.showToast;

  const getCampusDetails = async (campusId: string) => {
    try {
      const response = await CampusPublicService.getCampusById(campusId) as CampusDetailBackend;
      setCampusData(mapCampusDetail(response));
      setBreadcrumbs([{ label: "Colegio", href: "/landing/school" }, { label: response.display_name }]);
    } catch (error: any) {
      console.error(error);
    }
  }
  
  const getBranchesByCampus = async (campusId: string, tenantId: string) => {
    try {
      const response = await CampusPublicService.getBranchesCampus(tenantId, campusId);
      if (response.length > 0) {
        setBranches(response);
        setSelectedTab(0);
        setInfoTab(response[0]);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  const handleAdmission = () => {
    if (!infoTab?.id || !tenantId) return showToast("Error al obtener los datos del colegio", "error");
    router.push(`/landing/admissions/${infoTab?.id}?tenantId=${tenantId}`);
  }

  const handleSedeClick = (idx: number, data: any) => {
    setSelectedTab(idx);
    setInfoTab(data);
  }

  const initialData = () => {
    if (!id || !tenantId) return showToast("Error al obtener los datos del colegio", "error");
    getBranchesByCampus(id, tenantId);
    getCampusDetails(tenantId);
  }

  useEffect(() => {
    handleMenu("colegios");
    initialData();
  }, [id && tenantId]);

  return (
    <main className={clsx(
      "flex flex-col justify-center gap-[2.75rem] mt-[2.75rem]",
      style["font-outfit"],
    )}>
      <header className="flex justify-between py-[0.75rem]">
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

          <h5 className="m-0 text-[1.25rem] text-gray-900 leading-[120%] font-medium">Colegio - { infoTab ? infoTab.campusInfo.name.toUpperCase() : "*" }</h5>
        </div>

        <BreadcumbComponent items={breadcrumbs} />
      </header>
      <div className="flex flex-col">
        <div className="flex">
          {
            branches.length > 0 && branches.map((branch, index) => (
              <TabsComponent
                key={index}
                handleClick={() => handleSedeClick(index, branch)}
                label={branch.name.toUpperCase()}
                isActive={selectedTab === index}
                icon={{ path: `/assets/icon/${selectedTab === index ? "school-icon-02" : "school-icon-01"}.svg`, alt: "icon-school" }}
              />
            ))
          }
        </div>
        <section className="content-school-details">
          {/* GALLERY */}
          <div className="flex flex-col gap-[1rem] rounded-[1rem] py-[1rem]">
            <div className="flex justify-between items-center">
              <div className="flex gap-[1rem]">
                <Image
                  src={'/assets/landing/img/df-checker.png'}
                  alt={`logo de la escuela `}
                  width={50}
                  height={50}
                  loading="lazy"
                />
                <h3 className="m-0 text-gray-900 leading-[120%] font-medium self-center">{ infoTab && infoTab.campusInfo.name.toUpperCase() }</h3>
              </div>

              <div className="flex gap-[0.5rem]">
                <Image
                  src={'/assets/img/marker-03.png'}
                  alt="icon-location"
                  className="h-[1.5rem]"
                  width={24}
                  height={24}
                  loading="lazy"
                />
                <span className="m-0">{infoTab && infoTab?.addressInfo?.fullAddress}</span>
              </div>

              <div className="flex gap-[1rem]">
                <div className="flex gap-[0.5rem] cursor-pointer">
                  <Image
                    src={'/assets/img/marker-03.png'}
                    alt="icon-location"
                    className="h-[1.5rem]"
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                  <span className="m-0 text-[#610CF4] hover:text-purple-600">Mapa</span>
                </div>
                <div className="flex gap-[0.5rem] cursor-pointer">
                  <Image
                    src={'/assets/icon/icon-heart-01.svg'}
                    alt="icon-location"
                    className="h-[1.5rem]"
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                  <span className="m-0 text-[#610CF4] hover:text-purple-600">Mapa</span>
                </div>
              </div>
            </div>

            <div className="h-[23.06rem] w-fill flex gap-[1.25rem]">
              <Image
                src={'/assets/landing/img/df-checker.png'}
                alt={`imagen de la escuela `}
                className="rounded-[1rem] w-[-webkit-fill-available] h-[-webkit-fill-available]"
                width={600}
                height={400}
                loading="lazy"
              />
              <div className={clsx(
                "grid grid-rows-2 grid-cols-2 gap-x-[0.95rem] gap-y-[0.95rem] w-full relative",
                "max-lg:hidden"
                )}
              >
                <Image
                  src={'/assets/landing/img/df-checker.png'}
                  alt={`imagen de la escuela `}
                  className="rounded-[1rem] w-[-webkit-fill-available] h-[-webkit-fill-available]"
                  width={600}
                  height={400}
                  loading="lazy"
                />
                <Image
                  src={'/assets/landing/img/df-checker.png'}
                  alt={`imagen de la escuela `}
                  className="rounded-[1rem] w-[-webkit-fill-available] h-[-webkit-fill-available]"
                  width={600}
                  height={400}
                  loading="lazy"
                />
                <Image
                  src={'/assets/landing/img/df-checker.png'}
                  alt={`imagen de la escuela `}
                  className="rounded-[1rem] w-[-webkit-fill-available] h-[-webkit-fill-available]"
                  width={600}
                  height={400}
                  loading="lazy"
                />
                <Image
                  src={'/assets/landing/img/df-checker.png'}
                  alt={`imagen de la escuela `}
                  className="rounded-[1rem] w-[-webkit-fill-available] h-[-webkit-fill-available]"
                  width={600}
                  height={400}
                  loading="lazy"
                />
                <ButtonComponent
                  icon={{ path: "/assets/icon/image-no-borders.svg", alt: "icon-image" }}
                  label="Ver más"
                  size="small"
                  className="primary absolute bottom-[0.94rem] right-[0.94rem]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-[1rem]">
                <ButtonComponent
                  icon={{ path: "/assets/icon/phone.svg", alt: "icon-image" }}
                  label="Quiero ser contactado"
                  onClick={() => {
                    router.push(`/auth/register?campusId=${infoTab && infoTab?.campusId}`);
                  }}  
                  size="small"
                  className="primary"
                />
                <ButtonComponent
                  icon={{ path: "/assets/icon/user-profile-up.svg", alt: "icon-image" }}
                  label="Iniciar Admisión"
                  onClick={() => handleAdmission()}
                  size="small"
                  className="tertiary-outline"
                />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-[1.51rem]">
            <h2 className="text-gray-900 text-[2.45rem] text-center font-semibold">Nuestro Colegio</h2>
            <p className="text-gray-900 text-[1rem] h-[7rem] text-justify">
              {infoTab && infoTab?.campusInfo?.description}
            </p>
          </div>
          
          {/* PROCESS */}
          <div className="flex flex-col gap-[1.51rem]">
            <h3 className="text-gray-900 text-[1.95rem] text-center font-semibold">Partes del proceso</h3>
            <div className="flex h-[11.5625rem] gap-[1rem] max-lg:flex-col">
              <CardProcessComponent
                icon={{ path: '/assets/icon/calendar.svg', alt: `imagen de la escuela ` }}
                label="Programa tu visita"
              />

              <div className="w-[-webkit-fill-available] h-0 border-[1px] border-dashed border-[#ad46ff] self-center">
              </div>

              <CardProcessComponent
                icon={{ path: '/assets/icon/file-05.svg', alt: `imagen de la escuela ` }}
                label="Llena tu formulario en admisiones by Éccole!"
              />

              <div className="w-[-webkit-fill-available] h-0 border-[1px] border-dashed border-[#ad46ff] self-center">
              </div>

              <CardProcessComponent
                icon={{ path: '/assets/icon/upload-01.svg', alt: `imagen de la escuela ` }}
                label="Anexa los documentos"
              />

              <div className="w-[-webkit-fill-available] h-0 border-[1px] border-dashed border-[#ad46ff] self-center">
              </div>

              <CardProcessComponent
                icon={{ path: '/assets/icon/phone-01.svg', alt: `imagen de la escuela ` }}
                label="Espera nuestra llamada"
              />

            </div>
          </div>

          {/* DIFERENTES */}
          <div className="flex flex-col gap-[1.51rem]">
            <h3 className="text-gray-900  text-[1.95rem] text-center font-semibold">¿Qué nos hace diferentes?</h3>
            <div className="flex gap-[3.9rem] justify-center">
              <div className="flex gap-[0.65rem]">
                <Image
                  src={'/assets/icon/star-02.svg'}
                  alt="icon-check"
                  width={25}
                  height={25}
                  loading="lazy"
                />
                <span className="m-0 text-[1rem]">ICFES superior 2023</span>
              </div>
              <div className="flex gap-[0.65rem]">
                <Image
                  src={'/assets/icon/star-02.svg'}
                  alt="icon-check"
                  width={25}
                  height={25}
                  loading="lazy"
                />
                <span className="m-0 text-[1rem]">Duchas en el colegio</span>
              </div>
              <div className="flex gap-[0.65rem]">
                <Image
                  src={'/assets/icon/star-02.svg'}
                  alt="icon-check"
                  width={25}
                  height={25}
                  loading="lazy"
                />
                <span className="m-0 text-[1rem]">Cancha sintética</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-fill gap-[1.51rem]">
            <h3 className="text-gray-900  text-[1.95rem] text-center font-semibold">Datos del colegio</h3>
            <Image
              src={'/assets/img/recurso-2-1.png'}
              alt={`datos de la escuela `}
              className="w-auto h-[21.5rem]"
              width={1322}
              height={344}
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </main>
  );
};
  
export default SchoolDetailsPage;
