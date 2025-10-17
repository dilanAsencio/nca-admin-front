"use client";

import { Controller, useFormContext } from "react-hook-form";
import { AdmissionProcessFormData } from "./ModalAdmissionProcess";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import { useEffect } from "react";

interface CheckboxGroupProps {
  isReadOnly: boolean;
}

export default function CheckboxGroup({ isReadOnly }: CheckboxGroupProps) {
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
                disabled={isReadOnly}
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
                disabled={isReadOnly}
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
                disabled={isReadOnly}
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
                disabled={isReadOnly}
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
                disabled={isReadOnly}
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
