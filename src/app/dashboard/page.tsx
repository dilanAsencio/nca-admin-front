"use client";

import { useEffect, useState } from "react";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import style from "@/app/font.module.css";
import CardActionComponent from "@/components/shared/cardAction/CardActionComponent";
import AcademicManagementFormsComponent from "@/components/academicManagement/AcademicManagementComponent";
import clsx from "clsx";
import Image from "next/image";
import { CampusService } from "@/services/admin/managementAcademic/campus-services";
import { BranchesResponse } from "@/app/core/interfaces/academicManagement/branches-interfaces";
import BranchesViewer from "@/components/academicManagement/campusForms/BranchesViewerComponent";
import { Response } from "@/app/core/interfaces/api-interfaces";

import "./style.css";
import { LevelService } from "@/services/admin/managementAcademic/level-services";
import * as alerts from "@/utils/alerts";
import { useUI } from "@/providers/ui-context";
import BranchesFormComponent from "@/components/academicManagement/campusForms/BranchesFormComponent";
import ButtonPopUpComponent from "@/components/shared/button/ButtonPopUp";
import { BranchesService } from "@/services/admin/managementAcademic/branches-service";
import ModalLevelForm from "@/components/academicManagement/ModalLevelForm";
import ModalGradeForm from "@/components/academicManagement/ModalGradeForm";

const AcademicDashboard: React.FC = () => {
  
  const { 
    toggleLoading,
    isOpenModalNivel,
    isOpenModalGrado,
    updateBasicData,
    addBranches,
    resetForm,
    iconsActions,
    handlerSteps,
    handleDownChecks,
    activeNavSteps,
    handleOptionLevel,
    toggleModule
  } = useUI();
  const [viewFormSchool, setViewFormSchool] = useState<boolean>(false);

  const [campus, setCampus] = useState<any[] | null>(null);
  const [campusBranchId, setCampusBranchId] = useState<string | null>(null);

  const [titleAcademic, setTitleAcademic] = useState<string>("Crear Colegio");
  const [isEditCampus, setIsEditCampus] = useState<boolean>(false);
  const [isDetailCampus, setIsDetailCampus] = useState<boolean>(false);
  const [campusSelected, setCampusSelected] = useState<number>(0);

  const imgSchool = { path: "/assets/img/icon-school.png", alt: "crear colegio", w: 59.8, h: 55.36 };
  const iconAdd = iconsActions.add;
  const iconEdit = iconsActions.edit;
  const iconDelete = iconsActions.delete;
  const iconDetail = iconsActions.view;
  const showToast = alerts.showToast;
  const showConfirm = alerts.showConfirm;

  const getCampusBranches = async () => {
    toggleLoading(true);
    try {
      const campusResp = await CampusService.getCampus({ page: 0, size: 10 }) as Response<any>;
      if (campusResp?.success) {
        let campus: any[] = [];
        let campusDrop: any[] = [];
        if (!campusResp.data?.content) {
          showToast("No se encontraron colegios", "warning");
          return
        };
        for (const campusItem of campusResp.data.content) {
          if (campusItem && campusItem.id) {
            const branchesResp = await BranchesService.getBranchesByCampus(campusItem.id, { page: 0, size: 10 }) as Response<any>;
            let branches: BranchesResponse[] = [];
            if (branchesResp?.success && branchesResp.data?.content) {
              branches = branchesResp.data.content.map((branch: BranchesResponse) => ({
                ...branch,
                display: false,
                title: `${branch.name} - ${branch.full_address || ""}`
              }));
            }
            campus.push({
              ...campusItem,
              branches: branches || [],
              displayAddBranch: false,
            })
          }
          
          campusDrop.push({
            value: campusItem.id,
            label: campusItem.name
          })
        }
        setCampus(campus);
        toggleLoading(false);
      }
    } catch (error: any) {
      toggleLoading(false);
      console.error(error);
    }
    toggleLoading(false);
  };

  const getLevelsBranches = async (branchId: string) => {
    try {
      const levelsResp: any = await LevelService.getLevelsCampusBranch(branchId, {page: 0, size: 10});
      if (levelsResp?.content) {
        let levels: any[] = [];
        let levelsDrop: any[] = [];
        for (const item of levelsResp.content) {
          levels.push({
            ...item,
            display: false,
          })
          levelsDrop.push({
            value: item.id,
            label: item.name
          })
        }
        handleOptionLevel(levelsDrop);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const toggleCreateSchool = () => {
    resetForm();
    setTitleAcademic("Crear Colegio");
    viewFormSchool && initialData();
    setViewFormSchool(prev => !prev);
    handleDownChecks();
    setIsEditCampus(false);
    setIsDetailCampus(false);
  };
  
  const handleAddBranche = (campus: any) => {
    updateBasicData(campus);
    setCampus((prevCampus) =>
        prevCampus && prevCampus.map((item) => {
          if(item.id === campus.id) {
            return {
              ...item,
              displayAddBranch: !item.displayAddBranch
            };
          }
          return item;
        }) || []
    );
  };
  const closedAddBranche = (campus: any) => {
    setCampus((prevCampus) =>
        prevCampus && prevCampus.map((item) => {
          if(item.id === campus.id) {
            return {
              ...item,
              displayAddBranch: false
            };
          }
          return item;
        }) || []
    );
    initialData();
  }

  const handleActions = (branche: any, op: "level" | "grade") => {
    if(op === "level") {
      setCampusBranchId(branche.id);
    }
    if(op === "grade") {
      getLevelsBranches(branche.id);
    }
  }

  const handleEditSchool = (infoCampus: any, isDetail: boolean = false) => {
    updateBasicData(infoCampus);
    addBranches(infoCampus.branches);
    handlerSteps(1);
    activeNavSteps(2);
    if(isDetail) {
      setIsDetailCampus(true);
    } else {
      setIsEditCampus(true);
    }
    setViewFormSchool(true);
  }

  const handleDeleteCampus = async (item: any) => {
    const consfirm = await showConfirm(
      "Está seguro?",
      `está apunto de eliminar el colegio "${item.name}"`,
      "warning",
    );
    if(consfirm) {
      toggleLoading(true);
      try {
        CampusService.deleteCampus(item.id)
          .then((response) => {
            if (response?.success) {
              toggleLoading(false);
              showToast(`Colegio "${item.name}", eliminado con exito!`, "info");
              initialData();
            }
          })
          .catch((error) => {
            toggleLoading(false);
            console.error(error); 
        });
      } catch (error: any) {
        console.error(error);
      }
      toggleLoading(false);
    }
  }

  const optionsCampus = (item: any): { label: string; onClick: () => void, icon: {path: string; alt: string} }[] =>{
    return [
      {
        label: "Detalle colegio",
        onClick: () => {
          handleEditSchool(item, true);
          setTitleAcademic("Detalle Colegio");
        },
        icon: iconDetail,
      },
      {
        label: "Editar colegio",
        onClick: () => {
          handleEditSchool(item);
          setTitleAcademic("Editar Colegio");
        },
        icon: iconEdit,
      },
      {
        label: "Eliminar colegio",
        onClick: () => handleDeleteCampus(item),
        icon: iconDelete,
      },
      {
        label: "Crear otra sede",
        onClick: () => handleAddBranche(item),
        icon: iconAdd,
      },
    ]
  }

  const initialData = () => {
    getCampusBranches();
  }

  useEffect(() => {
    toggleModule("dashboard");
    initialData();
  },[]);

  useEffect(() => {
    if (!viewFormSchool) {
      initialData();
    }
  }, [viewFormSchool]);
  
  return (
    <>
      {viewFormSchool ? (
        <AcademicManagementFormsComponent title={titleAcademic} onBack={toggleCreateSchool} isEditCampus={isEditCampus} isDetailCampus={isDetailCampus} />
      ) : (
        <div
          className={clsx(
            "content-dashboard flex flex-col gap-[1.5rem]",
            `${style["font-outfit"]}`,
            "h-[85vh]"
          )}
        >
          <div
            className={`header-content flex flex-row justify-between items-center h-[3.125rem]`}
          >
            <span className="font-semibold text-[1.25rem]">
              Gestión Académica
            </span>
            <BreadcumbComponent items={[{label:"Gestión Académica"}]} />
          </div>
          <div className="flex flex-row justify-center gap-[1.5rem]">
            <CardActionComponent
              checked={campus && campus.length > 0 ? true : false}
              handleClick={toggleCreateSchool}
              labelButton="Crear Colegio"
              img={imgSchool}
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            {campus && campus.length && (
              <div className="card-schools">
                <div className="content-school-table">
                    <div className="body-school-table h-[60vh] overflow-y-auto gap-[0.5rem]">
                      {campus?.map((item: any, index: number) => (
                        <div className="flex flex-col gap-[0.25rem]" key={index}>
                          <div className={clsx(
                            "campus-header flex justify-between sticky top-0 bg-white py-2 px-3",
                            campusSelected === index ? "z-2" : "z-1",
                            )}>
                            <div className="flex gap-[0.5rem] self-center max-[450px]:w-1/2">
                              <Image
                                src={`/assets/landing/icon/cards/school-icon-01.svg`}
                                alt="icon-school"
                                className="w-[28px] h-[28px]"
                                width={28}
                                height={28}
                                loading="lazy"
                              />
                              <span className={clsx(
                                "m-0 font-bold text-[1.15rem] leading-[1.25rem] self-center",
                                "inline-block w-min overflow-hidden text-ellipsis whitespace-nowrap",
                              )}>
                                {item?.name.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex gap-[0.75rem]">
                              <ButtonPopUpComponent
                                size="small"
                                onClick={() => {setCampusSelected(index)}}
                                className="primary-outline"
                                label="Acciones colegio"
                                options={optionsCampus(item)}
                              />
                            </div>
                          </div>
                          { item.displayAddBranch && <>
                            <hr className="m-0" />
                            <BranchesFormComponent
                              isSubmited={() => closedAddBranche(item)}
                              resetForm={true}
                              hideForm={() => closedAddBranche(item)} /></>
                          }
                          <hr className="m-0" />
                          {item.branches && item.branches?.map(
                            (branche: BranchesResponse, index: number) => (
                              <BranchesViewer
                                isVisibleAlert={true}
                                branche={branche}
                                key={index}
                                isSubmitedBranches={() => toggleCreateSchool()}
                                deleteBranches={() => initialData()}
                                handleActions={handleActions}
                              />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      { isOpenModalNivel.isOpen && (
        <ModalLevelForm onSubmit={() => {initialData()}} campusBranchId={campusBranchId} />
      )}
      
      { isOpenModalGrado.isOpen && (
        <ModalGradeForm onSubmit={() => {initialData()}} />
      )}
    </>
  );
}

export default AcademicDashboard;