"use client";

import { Controller, useFormContext } from "react-hook-form";
import { CampusService } from "@/services/admin/managementAcademic/campus-services";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { showToast } from "@/utils/alerts";
import { useEffect, useState } from "react";
import { GradeService } from "@/services/admin/managementAcademic/grade-service";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import { BranchesService } from "@/services/admin/managementAcademic/branches-service";
import { PaymentConfigType } from "../core/schemas/payments-schema";

interface dropsGradeprops {
  currentData?: any;
}

export default function DropsSelectsGrade({
  currentData,
}: dropsGradeprops) {
  const {
    register,
    resetField,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<PaymentConfigType>();

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
      getCampusBranches(value);
    } else {
      setGradeDrop([]);
      setBranchesDrop([]);
      setValue("gradeId", "");
      setValue("campusBranchId", "");
    }
  };

  const handleBranches = (value: any) => {
    if (value) {
      getGrades(value);
    } else {
      setGradeDrop([]);
      setValue("gradeId", "");
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
      getGrades(currentData.campusBranchId);
      // ⚙️ Pre-cargar los grados de los campus seleccionados
      if (campusBrancheIds.length > 0) {
        campusBrancheIds.forEach((campusId: string) => getGrades(campusId));
      }
    }
  }, [currentData]);

  return (
    <>
      {/* Campus */}
        <Controller
          name="campusId"
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="campusId"
              label="Colegios"
              className="primary"
              placeholder="Escoger colegios"
              options={campusDrop}
              onChange={(value) => {
                field.onChange(value);
                handleCampus(value);
              }}
              value={field.value}
              required
              error={errors.campusId && (errors.campusId.message as string)}
            />
          )}
        />
        
      {/* branches */}
        <Controller
          name="campusBranchId"
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="campusBranchId"
              label="Sedes"
              className="primary"
              placeholder="Escoger Sede"
              options={branchesDrop}
              onChange={(value) => {
                field.onChange(value);
                handleBranches(value);
              }}
              value={field.value}
              required
              error={errors.campusBranchId && (errors.campusBranchId.message as string)}
            />
          )}
        />

      {/* Grados */}
        <Controller
          name="gradeId"
          control={control}
          render={({ field }) => (
            <DropdownComponent
              name="gradeId"
              label="Grados"
              className="primary"
              placeholder="Escoger grados"
              options={gradeDrop}
              onChange={(value) => {
                field.onChange(value);
              }}
              value={field.value}
              required
              error={errors.gradeId && (errors.gradeId.message as string)}
            />
          )}
        />
    </>
  );
}
