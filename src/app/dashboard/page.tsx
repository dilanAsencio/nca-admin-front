"use client";

import { useEffect, useState } from "react";
import BreadcumbComponent from "@/components/shared/breadcumb/BreadcumbComponent";
import style from "@/app/font.module.css";
import CardComponent from "@/components/dashboard/CardComponent";
import AcademicManagementForm from "@/components/academicManagement/AcademicManagement";
import clsx from "clsx";
import Image from "next/image";
import { SchoolService } from "@/services/managementAcademic/school-services";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { BranchesType } from "@/types/forms-types";
import BranchesViewer from "@/components/academicManagement/schoolForms/BranchesViewer";
import { Response } from "@/types/auth";
import ModalComponent from "@/components/ui/ModalComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";

import "./style.css";
import { Controller, useForm } from "react-hook-form";
import { LevelService } from "@/services/managementAcademic/level-services";
import showToast from "@/utils/toast";
import { useUI } from "@/providers/ui-context";
import BranchesForm from "@/components/academicManagement/schoolForms/BranchesForm";
import Swal from 'sweetalert2';
import ButtonPopUpComponent from "@/components/shared/button/ButtonPopUp";
import { BranchesService } from "@/services/managementAcademic/branches-service";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { nivelAcademicoShema } from "@/types/forms-academic-shemas";
import ErrorAlert from "@/components/ui/ErrorAlert";

const AcademicDashboard: React.FC = () => {
  
  const {
      control: controlLevel,
      register: registerLevel,
      handleSubmit: handleSubmitLevel,
      formState: { errors: errorsLevel },
      reset: resetLevel,
      watch: watchLevel,
      setError: setErrorLevel,
      setValue: setValueLevel,
      getValues: getValuesLevel,
  } = useForm({resolver: zodResolver(nivelAcademicoShema)});
  const {
      control: controlDegree,
      register: registerDegree,
      handleSubmit: handleSubmitDegree,
      formState: { errors: errorsDegree },
      reset: resetDegree,
      watch: watchDegree,
      setError: setErrorDegree,
      setValue: setValueDegree,
      getValues: getValuesDegree,
  } = useForm({});
  const { 
    toggleLoading,
    isOpenModalNivel,
    toggleModalNivel,
    isOpenModalGrado,
    toggleModalGrado,
    updateBasicData,
    addBranches,
    resetForm,
    handleCheckSteps,
    iconsActions,
    handlerSteps,
  } = useUI();
  const [viewFormSchool, setViewFormSchool] = useState<boolean>(false);

  const [campus, setCampus] = useState<any[] | null>(null);
  const [campusDrop, setCampusDrop] = useState<any[] | null>(null);
  const [levels, setLevels] = useState<any[] | null>(null);
  const [levelsDrop, setLevelsDrop] = useState<any[] | null>(null);
  const [grade, setGrade] = useState<any[] | null>(null);

  const [titleAcademic, setTitleAcademic] = useState<string>("Crear Colegio");

  const imgSchool = { path: "/assets/img/icon-school.png", alt: "crear colegio", w: 59.8, h: 55.36 };
  const iconAdd = iconsActions.add;
  const iconEdit = iconsActions.edit;
  const iconDelete = iconsActions.delete;

  const getCampusBranches = async (page: number, size: number, search?: string) => {
    toggleLoading(true);
    try {
      const campusResp = await SchoolService.getCampus(page,size,search);
      if (campusResp?.success) {
        let campus: any[] = [];
        let campusDrop: any[] = [];
        for (const item of campusResp.data.content) {
          const branchesResp = await BranchesService.getBranchesByCampus(item.id,0,10) as Response;          
          let branches: BranchesType[] = [];
          if (branchesResp?.success) {
            branches = branchesResp.data.content.map((branch: BranchesType) => ({
              ...branch,
              display: false,
              title: `${branch.name} - ${branch.full_address || ""}`
            }));
          }
          campus.push({
            ...item,
            branches: branches || [],
            displayAddBranch: false,
          })
          campusDrop.push({
            value: item.id,
            label: item.name
          })
        }
        setCampusDrop(campusDrop);
        setCampus(campus);
        toggleLoading(false);
      }
    } catch (error: any) {
      toggleLoading(false);
      console.error(error);
    }
  };

  const toggleCreateSchool = () => {
    resetForm();
    setTitleAcademic("Crear Colegio");
    setViewFormSchool(prev => !prev);
    handlerSteps(1);
  };
  
  const handleAddBranche = (campus: any) => {
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

  const handleBranches = (branche: any) => {
    setCampus((prevCampus) =>
        prevCampus && prevCampus.map((item) => {
          if(item.id === branche.campus_id) {
            return {
              ...item,
              branches: item.branches.map((branch: BranchesType) =>
                branch.name === branche.name
                  ? {...branch, display: !branch.display}
                  : branch
              )
            };
          }
          return item;
        }) || []
    );
  };

  const handleLevels = (branche: any) => {
    registerLevel("campusBranchId");
    setValueLevel("campusBranchId", branche.id);
    
  }

  const onSubmitLevel = (data: any) => {
    toggleLoading(true);
    const dat = {
      campusBranchId: getValuesLevel("campusBranchId"),
      description: data.description,
      name: data.name,
      code: data.code,
      levelOrder: parseInt(data.levelOrder),
      status: "active",
      valid: true,
    }
    try {
      LevelService.createLevel(dat)
        .then((response) => {
          if (response?.success) {
            showToast(`Nivel ${response.data.name}, creado con exito!`, "success");
            toggleModalNivel(false);
            resetLevel();
            toggleLoading(false);
          }
        })
        .catch((error) => {
          console.error(error); 
          toggleLoading(false);
      });
    } catch (error: any) {
      console.error(error);
      toggleLoading(false);
    }
  };

  const handleEditSchool = (infoCampus: any) => {    
    updateBasicData(infoCampus);
    addBranches(infoCampus.branches);
    setViewFormSchool(true);
  }

  const handleDeleteCampus = (item: any) => {
    Swal.fire({
      title: "Está seguro?",
      text: `está apunto de eliminar el colegio "${item.name}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#610CF4",
      cancelButtonColor: "#FFE193",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleLoading(true);
        try {
          SchoolService.deleteCampus(item.id)
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
      }
    });
  }

  const optionsCampus = (item: any): { label: string; onClick: () => void, icon: {path: string; alt: string} }[] =>{
    return [
      {
        label: "Editar colegio",
        onClick: () => {
          handleEditSchool(item);
          setTitleAcademic("Editar Colegio");
          handleCheckSteps();
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
    getCampusBranches(0, 10, "");
  }

  useEffect(() => {
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
        <AcademicManagementForm title={titleAcademic} onBack={toggleCreateSchool} />
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
            <BreadcumbComponent />
          </div>
          <div className="flex flex-row justify-center gap-[1.5rem]">
            <CardComponent
              checked={campus && campus.length > 0 ? true : false}
              handleClick={toggleCreateSchool}
              labelButton="Crear Colegio"
              img={imgSchool}
            />
          </div>
          <div className="flex flex-col flex-1 overflow-auto gap-[1rem]">
            {campus && campus.length && (
              <div className="card-schools">
                <div className="content-school-table">
                    <div className="body-school-table gap-[1rem]">
                      {campus?.map((item: any, index: number) => (
                        <div className="flex flex-col gap-[1rem]" key={index}>
                          <div className="flex justify-between">
                            <div className="flex gap-[0.5rem]">
                              <Image
                                src={`/assets/landing/icon/cards/school-icon-01.svg`}
                                alt="icon-school"
                                width={24}
                                height={24}
                                loading="lazy"
                              />
                              <span className="m-0 font-medium text-[1rem] leading-[1.25rem] self-center">
                                {item?.name}
                              </span>
                            </div>
                            <div className="flex gap-[0.75rem]">
                              <ButtonPopUpComponent
                                size="small"
                                className="tertiary-outline"
                                label="Acciones colegio"
                                options={optionsCampus(item)}
                              />
                            </div>
                          </div>
                          { item.displayAddBranch && <>
                            <hr className="m-0" />
                            <BranchesForm
                              resetForm={true}
                              hideForm={() => handleAddBranche(item)} /></>
                          }
                          <hr className="m-0" />
                          {item.branches && item.branches?.map(
                            (branche: BranchesType, index: number) => (
                              <BranchesViewer
                                branche={branche}
                                key={index}
                                ishandleBranche={handleBranches}
                                deleteBranches={() => initialData()}
                                handleActions={handleLevels}
                              />
                            )
                          )}
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <ButtonComponent
                          onClick={() => {setViewFormSchool(true); handlerSteps(1);}}
                          className="primary"
                          label="Crear otro colegio"
                        />
                      </div>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      { isOpenModalNivel && (
        <ModalComponent
          title="Crear nivel académico"
          labelBtnAccept="Crear"
          sizeModal="medium"
          handleSubmit={handleSubmitLevel(onSubmitLevel)}
          handleModal={() => {toggleModalNivel(false); resetLevel();}}
        >
          <>
            <div className="grid grid-cols-4 items-end gap-y-[1rem] gap-x-[1rem] pb-[1rem]">
              <div>
                <InputComponent
                  label="Nombre nivel académico"
                  placeholder="Nombre de nivel académico"
                  name="name"
                  className="capitalize"
                  typeInput="text"
                  register={registerLevel("name")}
                />
                {errorsLevel.name && (
                  <ErrorAlert>{errorsLevel.name.message}</ErrorAlert>
                )}
              </div>
              <div>
                <InputComponent
                  typeInput="text"
                  label="Perido académico"
                  placeholder="Perido académico"
                  name="periodoAcademico"
                  register={registerLevel("periodoAcademico")}
                />
                {errorsLevel.periodoAcademico && (
                  <ErrorAlert>{errorsLevel.periodoAcademico.message}</ErrorAlert>
                )}
              </div>
              <div>
                <InputComponent
                  typeInput="number"
                  label="Orden"
                  placeholder="Orden del nivel académico (+)"
                  name="levelOrder"
                  register={registerLevel("levelOrder",{
                    onChange: (e) => {
                      const value = e.target.value;
                      setValueLevel("levelOrder", parseInt(value) > 0 ? parseInt(value) : value);
                    }
                  })}
                />
                {errorsLevel.levelOrder && (
                  <ErrorAlert>{errorsLevel.levelOrder.message}</ErrorAlert>
                )}
              </div>
              <div>
                <InputComponent
                  typeInput="text"
                  label="Codigo nivel académico"
                  placeholder="Codigo nivel académico"
                  name="code"
                  register={registerLevel("code",{
                    onChange: (e) => {
                      const value = e.target.value.toUpperCase();
                      setValueLevel("code", value);
                    }
                  })}
                />
                {errorsLevel.code && (
                  <ErrorAlert>{errorsLevel.code.message}</ErrorAlert>
                )}
              </div>
            </div>
            <div className="basis-3/4">
              <TextAreaComponent
                  name="description"
                  rows={4}
                  placeholder="Descripción"
                  label="Descripción"
                  register={registerLevel("description")}/>
              {errorsLevel.description && (
                <ErrorAlert>{errorsLevel.description.message}</ErrorAlert>
              )}
            </div>
          </>
        </ModalComponent> 
      )}
      
      { isOpenModalGrado && (
        <ModalComponent
          title="Crear grado académico"
          labelBtnAccept="Crear"
          sizeModal="medium"
          handleSubmit={() => {}}
          handleModal={() => toggleModalGrado(false)}
        >
          <>
            <div className="grid grid-cols-3 gap-y-[1rem] gap-x-[1rem] pb-[1rem]">
              <InputComponent
                label="Nombre grado académico"
                placeholder="Nombre de grado académico"
                name="name"
                className="capitalize"
                typeInput="text"
                register={registerDegree("name")}
              />
              <InputComponent
                typeInput="number"
                label="Capacidad maxima de estudiantes"
                placeholder='Ingrese cantidad de estudiantes'
                name="value"
                register={registerDegree("maxCapacity")}
                />
              <Controller
                name="level"
                control={controlDegree}
                render={({ field }) => (
                <DropdownComponent
                    name='level'
                    label="Nivel academico"
                    className='primary'
                    placeholder="Escoger nivel academico"
                    options={campusDrop && campusDrop.length > 0 ? campusDrop : []}
                    onChange={(value) => {field.onChange(value); handleLevels(value);}}
                    value={field.value}
                    />
                )}
              />
              <Controller
                name="academicLevel"
                control={controlDegree}
                defaultValue=""
                render={({ field }) => (
                <DropdownComponent
                    name='academicLevel'
                    label="Nivel academico"
                    className='primary'
                    placeholder="Escoger nivel academico"
                    options={levelsDrop && levelsDrop.length > 0 ? levelsDrop : []}
                    onChange={(value) => {field.onChange(value)}}
                    value={field.value}
                    />
                )}
              />
              <InputComponent
                typeInput="number"
                label="Valor grado académico"
                placeholder='Valor grado académico'
                name="value"
                // register={register("foundation_year")}
                />
            </div>
          </>
        </ModalComponent> 
      )}
    </>
  );
}

export default AcademicDashboard;