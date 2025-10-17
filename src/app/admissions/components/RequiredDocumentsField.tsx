"use client";

import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  FieldArrayWithId,
  useFormContext,
  Controller,
} from "react-hook-form";
import { AdmissionProcessFormData } from "./ModalAdmissionProcess";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";

interface Props {
  fields: FieldArrayWithId<
    AdmissionProcessFormData,
    "requiredDocuments",
    "id"
  >[];
  append: UseFieldArrayAppend<AdmissionProcessFormData, "requiredDocuments">;
  remove: UseFieldArrayRemove;
}

export default function RequiredDocumentsField({
  fields,
  append,
  remove,
}: Props) {
  const {
    register,
    control,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<AdmissionProcessFormData>();
  const optDocTypes = [
    {
      value: "ab172940-4b5c-4af5-b8e9-699387ba2742",
      code: "ID_CARD",
      label: "Documento de Identidad",
    },
    {
      value: "eb55ddfd-90fb-4d28-b296-91ba4363ed58",
      code: "BIRTH_CERTIFICATE",
      label: "Certificado de Nacimiento",
    },
    {
      value: "28a063b5-c807-43f0-840f-fd89c19cdbb8",
      code: "ADDRESS_PROOF",
      label: "Comprobante de Domicilio",
    },
    {
      value: "1eff37b7-7909-40c9-be1b-0f71659b0825",
      code: "VACCINATION_CARD",
      label: "Carnet de Vacunación",
    },
    {
      value: "6e91ccc8-9729-4e72-8c58-f958a2e883fe",
      code: "SCHOOL_RECORD",
      label: "Certificado Académico Anterior",
    },
    {
      value: "e31532e5-b0ac-4c94-a162-c324efe041b5",
      code: "PARENT_ID",
      label: "Documento del Acudiente",
    },
    {
      value: "baaf6423-6be9-474a-93d3-c314d841a20e",
      code: "PHOTO",
      label: "Fotografía del Estudiante",
    },
  ];
  const typeFormats = [
      {label: "PDF", value: "PDF"},
      {label: "PNG", value: "PNG"},
      {label: "JPG", value: "JPG"},
  ]
  return (
    <div className="mb-[0.5rem]">
      <div className="flex justify-between items-center p-[0.5rem]">
        <h4 className="m-0 font-medium text-gray-900">Documentos Requeridos</h4>
        <ButtonComponent
          size="small"
          onClick={() => {
            append({
              name: "",
              description: "",
              documentType: "",
              allowedFormats: [""],
              maxSizeMB: 1,
              required: true,
            });
          }}
          className="primary"
          label="Agregar"
        />
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex w-max gap-[0.5rem]">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-[0.5rem] rounded-md min-w-[40rem] flex-shrink-0 bg-white shadow-sm"
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 text-sm"
                >
                  Eliminar
                </button>
              </div>
              <div className="grid grid-cols-2 gap-[0.5rem]">
                <InputComponent
                    label="Nombre"
                    placeholder="Nombre del documento"
                    name="name"
                    className="capitalize"
                    typeInput="text"
                    register={register(`requiredDocuments.${index}.name`)}
                    required
                    error={
                    errors.requiredDocuments?.[index]?.name &&
                    errors.requiredDocuments[index].name.message
                    }
                />
                <Controller
                    name={`requiredDocuments.${index}.documentType`}
                    control={control}
                    render={({ field }) => (
                    <DropdownComponent
                        name="documentType"
                        label="Tipo de documento"
                        className="primary"
                        placeholder="Escoger tipo de documento"
                        options={optDocTypes}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        required
                        error={
                        errors.requiredDocuments?.[index]?.documentType &&
                        errors.requiredDocuments[index].documentType.message
                        }
                    />
                    )}
                />
                <InputComponent
                    typeInput="number"
                    label="Tamaño máximo (MB)"
                    placeholder="Tamaño en MB"
                    className="text-right"
                    name="maxSizeMB"
                    register={register(`requiredDocuments.${index}.maxSizeMB`, {
                        valueAsNumber: true,
                        onChange(event) {
                            const value = event.target.value;
                            if (value < 1) {
                                setError(`requiredDocuments.${index}.maxSizeMB`, {
                                    type: "manual",
                                    message: "El tamaño debe ser mayor a 0",
                                });
                            } else {
                                setError(`requiredDocuments.${index}.maxSizeMB`, {
                                    type: "manual",
                                    message: "",
                                });
                                setValue(`requiredDocuments.${index}.maxSizeMB`, value);
                            }
                        },
                    })}
                    required
                    error={
                    errors.requiredDocuments?.[index]?.maxSizeMB &&
                    errors.requiredDocuments[index].maxSizeMB.message
                    }
                />
                <Controller
                    name={`requiredDocuments.${index}.allowedFormats`}
                    control={control}
                    render={({ field }) => (
                    <DropdownComponent
                        name="allowedFormats"
                        label="Tipo de formato"
                        className="primary"
                        placeholder="Escoger tipo de formato"
                        isMulti
                        options={typeFormats}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        required
                        error={
                            errors.requiredDocuments?.[index]?.allowedFormats &&
                            errors.requiredDocuments[index].allowedFormats.message
                        }
                    />
                    )}
                />
                <Controller
                    name={`requiredDocuments.${index}.required`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <CheckBoxComponent
                            {...field}
                            checked={getValues(`requiredDocuments.${index}.required`)}
                            setChecked={() => {
                                setValue(`requiredDocuments.${index}.required`, !getValues(`requiredDocuments.${index}.required`));
                            }}
                            label="Este documento es obligatorio"
                        />
                    )}
                />
              </div>
              <TextAreaComponent
                name="description"
                rows={3}
                placeholder="Descripción"
                label="Descripción"
                register={register(`requiredDocuments.${index}.description`)}
                required
                error={
                  errors.requiredDocuments?.[index]?.description &&
                  errors.requiredDocuments[index].description.message
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
