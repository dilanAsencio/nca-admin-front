"use client";

import { Controller, useFormContext } from "react-hook-form";
import { AdmissionProcessFormData } from "./ModalAdmissionProcess";
import { CampusService } from "@/services/managementAcademic/campus-services";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { showToast } from "@/utils/alerts";
import { useEffect, useState } from "react";
import { GradeService } from "@/services/managementAcademic/grade-service";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import { BranchesService } from "@/services/managementAcademic/branches-service";

interface selectCampusprops {
  isReadOnly: boolean;
  currentData?: any;
}

export default function SelectCampusAndGrades({
  isReadOnly,
  currentData,
}: selectCampusprops) {
  const {
    register,
    resetField,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<AdmissionProcessFormData>();

  const [campusDrop, setCampusDrop] = useState<any[]>([]);
  const [branchesDrop, setBranchesDrop] = useState<any[]>([]);
  const [gradeDrop, setGradeDrop] = useState<any[]>([]);

  const getCampus = async () => {
    try {
      const campusResp = (await CampusService.getCampus({
        page: 0,
        size: 100,
      })) as Response<any>;
      if (campusResp?.success) {
        let campusDrop: any[] = [];
        if (!campusResp.data?.content) {
          showToast("No se encontraron colegios", "warning");
          return;
        }
        for (const campusItem of campusResp.data.content) {
          campusDrop.push({
            value: campusItem.id,
            label: campusItem.name,
          });
        }
        setCampusDrop(campusDrop);
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  
  const getCampusBranches = async (campusId: string) => {
    try {
      const resp = (await BranchesService.getBranchesByCampus(campusId, {
        page: 0,
        size: 100,
      })) as Response<any>;
      if (resp?.success) {
        let gradesDrop: any[] = [];
        if (!resp.data?.content) {
          showToast("No se encontraron sedes", "warning");
          return;
        }
        for (const item of resp.data.content) {
          gradesDrop.push({
            value: item.id,
            label: item.name,
          });
        }
        setBranchesDrop(gradesDrop);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const getGrades = async (campusBranchesId: string) => {
    try {
      const resp = await GradeService.getGradesByCampusBranches(campusBranchesId);
      if (resp?.success) {
        let grades: any[] = [];
        for (const item of resp.data) {
          grades.push({
            value: item.gradeId,
            label: item.gradeName,
          });
        }
        setGradeDrop(grades);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCampus = (value: any) => {
    if (value) {
      // value.forEach((element: any) => {
        getCampusBranches(value);
      // });
    } else {
      setGradeDrop([]);
      setBranchesDrop([]);
      setValue("grades", [""]);
      setValue("branches", "");
    }
  };

  const handleBranches = (value: any) => {
    if (value) {
      // value.forEach((element: any) => {
        getGrades(value);
      // });
    } else {
      setGradeDrop([]);
      setValue("grades", [""]);
    }
  };

  useEffect(() => {
    getCampus();
  }, []);

  useEffect(() => {
    if (currentData) {
      getCampusBranches(currentData.campusId);

      // Extrae solo los IDs
      const campusBrancheIds = currentData.campusesBranches?.map((c: any) => c.campusBranchId) || [];

      // ⚙️ Pre-cargar los grados de los campus seleccionados
      if (campusBrancheIds.length > 0) {
        campusBrancheIds.forEach((campusId: string) => getGrades(campusId));
      }
    }
  }, [currentData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Campus */}
        <Controller
          name="campuses"
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="campuses"
              label="Colegios"
              className="primary"
              placeholder="Escoger colegios"
              disabled={isReadOnly}
              options={campusDrop}
              onChange={(value) => {
                field.onChange(value);
                handleCampus(value);
              }}
              value={field.value}
              required
              error={errors.campuses && (errors.campuses.message as string)}
            />
          )}
        />
        
      {/* branches */}
        <Controller
          name="branches"
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="branches"
              label="Sedes"
              className="primary"
              placeholder="Escoger Sede"
              disabled={isReadOnly}
              options={branchesDrop}
              onChange={(value) => {
                field.onChange(value);
                handleBranches(value);
              }}
              value={field.value}
              required
              error={errors.branches && (errors.branches.message as string)}
            />
          )}
        />

      {/* Grados */}
        <Controller
          name="grades"
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="grades"
              label="Grados"
              isMulti
              className="primary"
              placeholder="Escoger grados"
              disabled={isReadOnly}
              options={gradeDrop}
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              required
              error={errors.grades && (errors.grades.message as string)}
            />
          )}
        />
    </div>
  );
}
