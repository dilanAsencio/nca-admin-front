"use client";

import { Controller, useFormContext } from "react-hook-form";
import { AdmissionProcessFormData } from "./ModalAdmissionProcess";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import { useEffect } from "react";

export default function CheckboxGroup() {
  const { register, setValue, getValues, control } = useFormContext<AdmissionProcessFormData>();

  useEffect(() => {
    register("requiresInterview");
    register("requiresEvaluation");
    register("notifyOnNewApplication");
    register("notifyOnDocumentUpload");
    register("notifyOnStatusChange");
    setValue("requiresInterview", false);
    setValue("requiresEvaluation", false);
    setValue("notifyOnNewApplication", false);
    setValue("notifyOnDocumentUpload", false);
    setValue("notifyOnStatusChange", false);
  }, [register]);

  return (
    <div className="border rounded-md p-[0.5rem] space-y-3">
      <h4 className="mb-2 font-medium text-gray-900">Configuraciones Adicionales</h4>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Controller
          name="requiresInterview"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxComponent
                {...field}
                checked={getValues("requiresInterview")}
                setChecked={() => {
                    setValue("requiresInterview", !getValues("requiresInterview"));
                }}
                label="Requiere entrevista"
            />
          )}
        />
        
        <Controller
          name="requiresEvaluation"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxComponent
                {...field}
                checked={getValues("requiresEvaluation")}
                setChecked={() => {
                    setValue("requiresEvaluation", !getValues("requiresEvaluation"));
                }}
                label="Requiere evaluación"
            />
          )}
        />

        <Controller
          name="notifyOnNewApplication"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxComponent
                {...field}
                checked={getValues("notifyOnNewApplication")}
                setChecked={() => {
                    setValue("notifyOnNewApplication", !getValues("notifyOnNewApplication"));
                }}
                label="Notificar nuevas postulaciones"
            />
          )}
        />

        <Controller
          name="notifyOnDocumentUpload"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxComponent
                {...field}
                checked={getValues("notifyOnDocumentUpload")}
                setChecked={() => {
                    setValue("notifyOnDocumentUpload", !getValues("notifyOnDocumentUpload"));
                }}
                label="Notificar carga de documentos"
            />
          )}
        />
        
        <Controller
          name="notifyOnStatusChange"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <CheckBoxComponent
                {...field}
                checked={getValues("notifyOnStatusChange")}
                setChecked={() => {
                    setValue("notifyOnStatusChange", !getValues("notifyOnStatusChange"));
                }}
                label="Notificar cambio de estado"
            />
          )}
        />
      </div>
    </div>
  );
}
