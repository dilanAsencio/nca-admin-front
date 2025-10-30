"use client";

import { Controller, useFormContext } from "react-hook-form";
import { AdmissionProcessFormData } from "./ModalAdmissionProcess";
import { CampusService } from "@/services/managementAcademic/campus-services";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { showToast } from "@/utils/alerts";
import { useEffect, useState } from "react";
import { GradeService } from "@/services/managementAcademic/grade-service";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";

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
  const [gradeDrop, setGradeDrop] = useState<any[]>([]);

  const getCampusBranches = async () => {
    try {
      const campusResp = (await CampusService.getCampus({
        page: 0,
        size: 10,
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

  const getGrades = async (campusId: string) => {
    try {
      const resp = await GradeService.getGradesByCampus(campusId);
      if (resp && resp?.campusId) {
        if (resp.levels.length > 0) {
          let grades: any[] = [];
          resp.levels.forEach((level: any) => {
            if (level.grades.length > 0) {
              level.grades.forEach((grade: any) => {
                grades.push({
                  ...grade,
                  label:
                    "Grado: " +
                    grade.gradeName +
                    " - Colegio: " +
                    resp.campusName,
                  value: grade.gradeId,
                  campusId: resp.campusId,
                });
              });
            }
          });
          setGradeDrop((prev) => {
            const existingValues = new Set(prev.map((g) => g.value)); // IDs existentes
            const newGrades = grades.filter(
              (g) => !existingValues.has(g.value)
            ); // solo nuevos
            return [...prev, ...newGrades];
          });
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCampus = (value: any) => {
    if (value.length > 0) {
      value.forEach((element: any) => {
        getGrades(element);
      });
    } else {
      setGradeDrop([]);
      setValue("grades", [""]);
    }
  };

  useEffect(() => {
    getCampusBranches();
  }, []);

  useEffect(() => {
    if (currentData) {
      // Extrae solo los IDs
      const campusIds = currentData.campuses?.map((c: any) => c.campusId) || [];

      // ⚙️ Pre-cargar los grados de los campus seleccionados
      if (campusIds.length > 0) {
        campusIds.forEach((campusId: string) => getGrades(campusId));
      }
    }
  }, [currentData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Campus */}
      <div>
        <Controller
          name="campuses"
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="campuses"
              label="Colegios"
              isMulti
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
      </div>

      {/* Grados */}
      <div>
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
    </div>
  );
}
