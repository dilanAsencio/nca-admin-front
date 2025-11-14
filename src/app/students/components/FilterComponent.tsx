"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import DropdownComponent from "../../../components/shared/dropdown/DropdownComponent";
import { useUI } from "@/providers/ui-context";
import { CampusService } from "@/services/admin/managementAcademic/campus-services";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { GradeService } from "@/services/admin/managementAcademic/grade-service";
import { showToast } from "@/utils/alerts";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { BranchesService } from "@/services/admin/managementAcademic/branches-service";

const FilterComponent: React.FC<{
  changeValue?: (values: {
    campus?: string;
    branche?: string;
    grade?: string;
    status?: string;
  }) => void;
}> = ({ changeValue }) => {
  const { toggleLoading } = useUI();
  const [campusDrop, setCampusDrop] = useState<any[]>([]);
  const [branchesDrop, setBranchesDrop] = useState<any[]>([]);
  const [gradeDrop, setGradeDrop] = useState<any[]>([]);
  const [campusSelected, setCampusSelected] = useState<string>();
  const [gradeSelected, setGradeSelected] = useState<string>();
  const [brancheSelected, setBrancheSelected] = useState<string>();

  const resetInputs = () => {
    setCampusSelected(undefined);
    setGradeSelected(undefined);
    setBrancheSelected(undefined);
    setGradeDrop([]);
    setBranchesDrop([]);
    changeValue && changeValue({});
  };

  const getCampus = async () => {
    toggleLoading(true);
    try {
      const campusResp = (await CampusService.getCampus()) as Response;
      if (campusResp?.success) {
        let campus: any[] = [];
        for (const item of campusResp.data.content) {
          campus.push({
            value: item.id,
            label: item.name,
          });
        }
        setCampusDrop(campus);
        toggleLoading(false);
      }
      toggleLoading(false);
    } catch (error: any) {
      toggleLoading(false);
      console.error(error);
    }
  };

  const getBrancheByCampus = async (campusId: string) => {
    try {
      const resp = await BranchesService.getBranchesByCampus(campusId) as any;
      
      if (resp?.success) {
        let campus: any[] = [];
        for (const item of resp.data.content) {
          campus.push({
            value: item.id,
            label: item.name,
          });
        }
        setBranchesDrop(campus);
        toggleLoading(false);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const getGradesByBranche = async (brancheId: string) => {
    toggleLoading(true);
    try {
      const gradeResp = await GradeService.getGradesByCampusBranches(brancheId);
      if (gradeResp?.success) {
        let grades: any[] = [];
        for (const item of gradeResp.data) {
          grades.push({
            value: item.gradeId,
            label: item.gradeName,
          });
        }
        setGradeDrop(grades);
      } else {
        setGradeDrop([]);
        showToast("Error al obtener los grados: " + gradeResp.message, "error");
      }
    } catch (error: any) {
      toggleLoading(false);
      console.error(error);
    }
    toggleLoading(false);
  };

  const handleSelect = (
    value: string | string[],
    op: "campus" | "grade" | "status" | "branche"
  ) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    if (op === "campus") {
      setCampusSelected(selectedValue);
      getBrancheByCampus(selectedValue);
    }
    if (op === "branche") {
      getGradesByBranche(selectedValue);
      setBrancheSelected(selectedValue);
    }
    if (op === "grade") setGradeSelected(selectedValue);

    // Retorna los valores seleccionados
    if (changeValue) {
      changeValue({
        campus: op === "campus" ? selectedValue : campusSelected,
        grade: op === "grade" ? selectedValue : gradeSelected,
        branche: op === "branche" ? selectedValue : brancheSelected,
      });
    }
  };

  useEffect(() => {
    getCampus();
  }, []);

  return (
    <div
      className={clsx(
        "flex items-center gap-[1rem] px-[1.25rem] py-[1rem] w-full",
        "bg-white rounded-[2.5rem]"
      )}
    >
      <div className="basis-1/6">
        <DropdownComponent
          name="campus"
          className="primary"
          placeholder="Escoger colegio"
          options={campusDrop}
          onChange={(value) => handleSelect(value, "campus")}
          value={campusSelected || ""}
        />
      </div>
      <div className="basis-1/6">
        <DropdownComponent
          name="branches"
          className="primary"
          placeholder="Escoger Sede"
          options={branchesDrop}
          onChange={(value) => handleSelect(value, "branche")}
          value={brancheSelected || ""}
        />
      </div>
      <div className="basis-1/6">
        <DropdownComponent
          name="grades"
          className="primary"
          placeholder="Grado"
          options={gradeDrop}
          onChange={(value) => handleSelect(value, "grade")}
          value={gradeSelected || ""}
        />
      </div>
      <div className="flex justify-center items-center">
        <ButtonComponent
          className="primary"
          onClick={() => {
            resetInputs();
          }}
          label={"Limpiar"}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
