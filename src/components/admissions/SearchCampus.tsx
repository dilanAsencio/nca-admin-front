"use client"

import { useEffect, useState } from "react";
import clsx from "clsx"
import DropdownComponent from "../shared/dropdown/DropdownComponent";
import { useUI } from "@/providers/ui-context";
import { CampusService } from "@/services/managementAcademic/campus-services";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { GradeService } from "@/services/managementAcademic/grade-service";
import { showToast } from "@/utils/alerts";

const SearchCampusComponent: React.FC<{
    changeValue?: (values: { campus: string | null, grade: string | null, status: string | null }) => void
}> = ({
    changeValue
}) => {
    const {
        toggleLoading,
    } = useUI();
    const [campusDrop, setCampusDrop] = useState<any[]>([]);
    const [gradeDrop, setGradeDrop] = useState<any[]>([]);
    const [campusSelected, setCampusSelected] = useState<string | null>(null);
    const [gradeSelected, setGradeSelected] = useState<string | null>(null);
    const [statusSelected, setStatusSelected] = useState<string | null>(null);
    
    const getCampus = async () => {
        toggleLoading(true);
        try {
            const campusResp = await CampusService.getCampus() as Response;
            if (campusResp?.success) {
                let campus: any[] = [];
                campus.push({ value: "all", label: "Todos" });
                for (const item of campusResp.data.content) {
                    campus.push({
                        value: item.id,
                        label: item.name
                    })
                }
                setCampusDrop(campus);
                toggleLoading(false);
            }
        } catch (error: any) {
            toggleLoading(false);
            console.error(error);
        }
        toggleLoading(false);
    };

    const getGradesByCampus = async (id: string) => {
        toggleLoading(true);
        try {
            const gradeResp = await GradeService.getGradesByCampus(id);            
            if (gradeResp?.success) {
                let grade: any[] = [];
                grade.push({ value: "all", label: "Todos" });
                for (const item of gradeResp.data.content) {
                    grade.push({
                        value: item.id,
                        label: item.name
                    })
                }
                setGradeDrop(grade);
            } else {
                setGradeDrop([]);
                showToast("Error al obtener los grados: "+gradeResp.message, "error");
            }
        } catch (error: any) {
            toggleLoading(false);
            console.error(error);
        }
        toggleLoading(false);
    };

    const handleSelect = (value: string | string[], op: "campus" | "grade" | "status") => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        if (op === "campus") {
            getGradesByCampus(selectedValue);
            setCampusSelected(selectedValue);
        }
        if (op === "grade") setGradeSelected(selectedValue);
        if (op === "status") setStatusSelected(selectedValue);

        // Retorna los valores seleccionados
        if (changeValue) {
            changeValue({
                campus: op === "campus" ? selectedValue : campusSelected,
                grade: op === "grade" ? selectedValue : gradeSelected,
                status: op === "status" ? selectedValue : statusSelected,
            });
        }
    }

    useEffect(() => {
        getCampus();
    }, []);

    return (
        <div className={clsx(
            "flex gap-[1rem] px-[1.25rem] py-[1rem] w-full",
            "bg-white rounded-[2.5rem]",
        )}>
            <div className="basis-2/5">
                <DropdownComponent
                    name='campus'
                    className='primary'
                    placeholder="Escoger colegio"
                    options={campusDrop}
                    onChange={(value) => handleSelect(value, "campus")}
                    value={campusSelected || ""}
                />
            </div>
            <div className="basis-1/6">
                <DropdownComponent
                    name='grades'
                    className='primary'
                    placeholder="Grado"
                    options={gradeDrop}
                    onChange={(value) => handleSelect(value, "grade")}
                    value={gradeSelected || ""}
                />
            </div>
            <div className="basis-1/6">
                <DropdownComponent
                    name='status'
                    className='primary'
                    placeholder="Estado"
                    options={[{ value: "activo", label: "Activo" }, { value: "inactivo", label: "Inactivo" }]}
                    onChange={(value) => handleSelect(value, "status")}
                    value={statusSelected || ""}
                />
            </div>
        </div>
)};

export default SearchCampusComponent
