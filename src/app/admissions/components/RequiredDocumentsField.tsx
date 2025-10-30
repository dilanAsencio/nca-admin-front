"use client";

import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  FieldArrayWithId,
  useFormContext,
  Controller,
  useForm,
} from "react-hook-form";
import { AdmissionProcessFormData } from "./ModalAdmissionProcess";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import TableComponent, {
  SimpleTableColumn,
} from "@/components/shared/table/TableComponent";
import { useUI } from "@/providers/ui-context";
import ModalComponent from "@/components/ui/ModalComponent";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  fields: FieldArrayWithId<
    AdmissionProcessFormData,
    "requiredDocuments",
    "id"
  >[];
  append: UseFieldArrayAppend<AdmissionProcessFormData, "requiredDocuments">;
  remove: UseFieldArrayRemove;
  isReadonly: boolean;
}

export default function RequiredDocumentsField({
  fields,
  append,
  remove,
  isReadonly,
}: Props) {
  const {
    register,
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().nonempty("Este campo es requerido!"),
        description: z.string().nonempty("Este campo es requerido!"),
        documentType: z.string().nonempty("Este campo es requerido!"),
        allowedFormats: z.array(z.string()).nonempty("Este campo es requerido!"),
        maxSizeMB: z
            .preprocess((val) => (
                val === "" || isNaN(val as number) ? undefined : Number(val)
            ), z
                .number({ required_error: "Este campo es requerido!"})
                .min(1, "El tamaño debe ser mayor a 0")
        ),
        required: z.boolean({ required_error: "Este campo es requerido!" }),
      })
    )
  });
  const { iconsActions } = useUI();
  const iconDelete = iconsActions.delete;
  const [openModal, setOpenModal] = useState<boolean>(false);
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
    { label: "PDF", value: "PDF" },
    { label: "PNG", value: "PNG" },
    { label: "JPG", value: "JPG" },
  ];

  const columnsDocRequired: SimpleTableColumn<any>[] = [
    { key: "name", nameField: "Nombre" },
    { key: "maxSizeMB", nameField: "Tamaño de archivo(MB)" },
    {
      key: "#",
      nameField: "Acción",
      render(row, idx) {
        return (
          <div className="flex gap-[0.5rem]">
            <ButtonComponent
              size="small"
              blockAccess={isReadonly}
              onClick={() => {
                remove(idx);
              }}
              icon={iconDelete}
              className="tertiary-outline"
              label="Eliminar"
            />
          </div>
        );
      },
    },
  ];

  const toggleModal = () => {
    setOpenModal(!openModal);
    resetField("name");
    resetField("maxSizeMB");
    resetField("documentType");
    resetField("allowedFormats");
    resetField("description");
  };

  const addDocument = () => {
    setOpenModal(true);
  };

  const submitedDocument = (data: any) => {
    append(data);
    toggleModal();
  };

  return (
    <>
      <div className="mb-[0.5rem]">
        <div className="flex justify-between items-center p-[0.5rem]">
          <h4 className="m-0 font-medium text-gray-900">
            Documentos Requeridos
          </h4>
          <ButtonComponent
            size="small"
            blockAccess={isReadonly}
            onClick={() => {
              addDocument();
            }}
            className="primary"
            label="Agregar"
          />
        </div>
        <div className="w-full overflow-x-auto">
          <TableComponent columns={columnsDocRequired} data={fields} />
        </div>
      </div>

      {openModal && (
        <ModalComponent
          title={"Agregar documento"}
          sizeModal="medium"
          typeButtonConfirm="button"
          handleSubmit={() => handleSubmit(submitedDocument)()}
          handleModal={() => {
            toggleModal();
          }}
        >
          <div
            className="border p-[0.5rem] rounded-md min-w-[40rem] flex-shrink-0 bg-white shadow-sm"
          >
            <div className="grid grid-cols-2 gap-[0.5rem]">
              <InputComponent
                label="Nombre"
                placeholder="Nombre del documento"
                name="name"
                className="capitalize"
                typeInput="text"
                disabled={isReadonly}
                register={register(`name`)}
                required
                error={
                  errors?.name &&
                  errors?.name.message?.toString()
                }
              />
              <Controller
                name={`documentType`}
                control={control}
                render={({ field }) => (
                  <DropdownComponent
                    name="documentType"
                    label="Tipo de documento"
                    className="primary"
                    placeholder="Escoger tipo de documento"
                    disabled={isReadonly}
                    options={optDocTypes}
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    required
                    error={
                      errors?.documentType &&
                      errors?.documentType?.message?.toString()
                    }
                  />
                )}
              />
              <InputComponent
                typeInput="number"
                label="Tamaño máximo (MB)"
                placeholder="Tamaño en MB"
                className="text-right"
                disabled={isReadonly}
                name="maxSizeMB"
                register={register(`maxSizeMB`, {
                  valueAsNumber: true,
                  onChange(event) {
                    const value = event.target.value;
                    if (value < 1) {
                      setError(`maxSizeMB`, {
                        type: "manual",
                        message: "El tamaño debe ser mayor a 0",
                      });
                    } else {
                      setError(`maxSizeMB`, {
                        type: "manual",
                        message: "",
                      });
                      setValue(
                        `maxSizeMB`,
                        value
                      );
                    }
                  },
                })}
                required
                error={
                  errors?.maxSizeMB &&
                  errors?.maxSizeMB.message?.toString()
                }
              />
              <Controller
                name={`allowedFormats`}
                control={control}
                render={({ field }) => (
                  <DropdownComponent
                    name="allowedFormats"
                    label="Tipo de formato"
                    className="primary"
                    placeholder="Escoger tipo de formato"
                    isMulti
                    disabled={isReadonly}
                    options={typeFormats}
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    required
                    error={
                      errors?.allowedFormats &&
                      errors.allowedFormats.message?.toString()
                    }
                  />
                )}
              />
              <Controller
                name={`required`}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <CheckBoxComponent
                    {...field}
                    disabled={isReadonly}
                    checked={getValues(
                      `required`
                    )}
                    setChecked={() => {
                      setValue(
                        `required`,
                        !getValues(`required`)
                      );
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
              disabled={isReadonly}
              register={register(`description`)}
              required
              error={
                errors?.description &&
                errors.description.message?.toString()
              }
            />
          </div>
        </ModalComponent>
      )}
    </>
  );
}
