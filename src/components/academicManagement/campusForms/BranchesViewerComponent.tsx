
"use client";

import React, { useEffect } from "react";
import { BranchesForm, BranchesResponse } from "@/app/core/interfaces/academicManagement/branches-interfaces";
import Image from "next/image";
import BranchesFormComponent from "./BranchesFormComponent";
import { useUI } from "@/providers/ui-context";
import ButtonPopUpComponent from "@/components/shared/button/ButtonPopUp";
import Swal from "sweetalert2";
import { BranchesService } from "@/services/managementAcademic/branches-service";
import { Tooltip } from 'primereact/tooltip';
import * as alerts from "@/utils/alerts";
import "./style.css";
import ModalComponent from "@/components/ui/ModalComponent";
import clsx from "clsx";

const BranchesViewer: React.FC<{
    branche: BranchesResponse,
    hideForm?: () => void;
    setBranches?: React.Dispatch<React.SetStateAction<BranchesForm[] | null>>
    ishandleBranche?: (branche: BranchesForm) => void,
    handleActions?: (branche: BranchesForm, option: "level" | "grade") => void,
    deleteBranches: () => void,
}> = ({
    branche, hideForm, setBranches, ishandleBranche, deleteBranches, handleActions
}) => {
    
    const {toggleModalNivel, toggleModalGrado, toggleLoading, iconsActions} = useUI();
    const iconAdd = iconsActions.add;
    const iconDelete = iconsActions.delete;
    const iconEdit = iconsActions.edit;
    const [isOpenModalBranche, setIsOpenModalBranche] = React.useState<boolean>(false);
    const [labelPopUp, setLabelPopUp] = React.useState<string | undefined>("Acciones sede");
    const showToast = alerts.showToast;

    const optionsBranches = (branche: BranchesResponse): { label: string; onClick: () => void, icon: {path: string; alt: string} }[] =>{
        if(branche.academic_level_count === 0) {
            return [
                {
                    label: "Agregar nivel",
                    onClick: () => {toggleModalNivel(true, 0); handleActions && handleActions(branche, "level")},
                    icon: iconAdd,
                },
                {
                    label: "Editar sede",
                    onClick: () => setIsOpenModalBranche(true),
                    icon: iconEdit,
                },
                {
                    label: "Eliminar Sede",
                    onClick: () => handleDeleteBranche(branche),
                    icon: iconDelete,
                },
            ]
        }
        return [
            {
                label: "Agregar nivel",
                onClick: () => {toggleModalNivel(true, 0); handleActions && handleActions(branche, "level");},
                icon: iconAdd,
            },
            {
                label: "Agregar grado",
                onClick: () => {
                    toggleModalGrado(true, 0);
                    handleActions && handleActions(branche, "grade");
                },
                icon: iconAdd,
            },
            {
                label: "Editar sede",
                onClick: () => setIsOpenModalBranche(true),
                icon: iconEdit,
            },
            {
                label: "Eliminar Sede",
                onClick: () => handleDeleteBranche(branche),
                icon: iconDelete,
            },
        ]
    }
    
    const handleDeleteBranche = (branche: BranchesResponse) => {
        Swal.fire({
        title: "Alerta!",
        text: `Está apunto de eliminar la sede "${branche.name}", del colegio "${branche?.campus_info?.name}".`,
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
                if(!branche?.id) throw new Error("No se encontró la sede");
                BranchesService.deleteBramchesByCampus(branche?.campus_id, branche.id)
                    .then((response) => {
                    if (response?.success) {
                        toggleLoading(false);
                        showToast(`Sede "${branche.name}", eliminada con exito!`, "info");
                        deleteBranches();
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

    const isBranchAlert = (branch: BranchesResponse): boolean => {
        if (branch?.academic_grade_count !== undefined && branch?.academic_grade_count === 0) return true;
        if (branch?.academic_level_count !== undefined && branch?.academic_level_count === 0) return true;
        return false;
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 580) {
                setLabelPopUp(undefined);
            } else {
                setLabelPopUp("Acciones sede");
            }
        };

        window.addEventListener("resize", handleResize);

        // Ejecuta al montar
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (<>
        <div className="flex justify-between py-[0.5rem] px-[1rem]">
            <div className={clsx(
                "flex items-center gap-[0.5rem]",
                "max-[1250px]:w-3/5"
                )}>
                <Image
                    src="/assets/img/marker-03.png"
                    alt="school-icon"
                    width={24}
                    height={24}
                    loading="lazy"
                />
                <Tooltip target={".tg-tooltip"} />
                <span
                    data-pr-tooltip={branche.title}
                    data-pr-position="top"
                    className={clsx(
                        "tg-tooltip m-0 font-medium text-[1rem] leading-[1.25rem]",
                        "inline-block w-min overflow-hidden text-ellipsis whitespace-nowrap",
                )}>
                    {branche.title}
                </span>
            </div>
            <div className="flex  items-center gap-[0.75rem]">
                { isBranchAlert(branche) &&
                    <>
                    <Tooltip target={".blink"} />
                    <Image 
                        src="/assets/icon/alert-triangle-02.svg"
                        className="blink"
                        alt="line-vertical"
                        width={32}
                        height={32}
                        loading="lazy"
                        data-pr-tooltip={`${
                            branche.academic_level_count === 0 ? "No se han asignado niveles académicos."
                             : branche.academic_grade_count === 0 ? "No se han asignados grados académicos." : ""}`}
                        data-pr-position="top"
                    /></>
                }
                <ButtonPopUpComponent
                    size="small"
                    className="tertiary-outline"
                    label={labelPopUp}
                    options={optionsBranches(branche)}
                />
            </div>
        </div>
        <hr className="m-0" />
        
      { isOpenModalBranche && (
        <ModalComponent
          title={`Sede del colegio: ${branche.campus_info &&branche?.campus_info.name}`}
          labelBtnAccept="Crear"
          sizeModal="large"
          handleSubmit={() => {}}
          handleModal={() => setIsOpenModalBranche(false)} >
            <BranchesFormComponent
                writeData={branche}
                hideForm={() => hideForm && hideForm()}
                title={branche.title} />
        </ModalComponent> 
      )}
        </>
    )
}

export default BranchesViewer;