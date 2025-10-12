"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import { InputImageComponent } from "@/components/shared/input/InputImage";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import { CampusService } from "@/services/managementAcademic/campus-services";
import { useUI } from "@/providers/ui-context";
import * as alerts from "@/utils/alerts";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import { campusSchema } from "@/app/core/schemas/forms-academic-schemas";
import clsx from "clsx";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { CampusForm } from "@/app/core/interfaces/academicManagement/campus-interfaces";

const BasicDataForm: React.FC<{onBack: () => void, onNext: () => void, isEdit: boolean, isDetail: boolean}> = ({onBack, onNext, isEdit, isDetail}) => {
    const showToast = alerts.showToast;
    const { updateBasicData, currentCampus, handlerSteps, activeNavSteps, toggleLoading } = useUI();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setError,
        setValue,
        getValues,
     } = useForm({
        resolver: zodResolver(campusSchema),
        defaultValues: currentCampus.basicData || {},
     });

    const [blockForm, setBlockForm] = useState(true);
    const [previewImg, setPreviewImg] = useState("");

    const onSubmit = async (data: any) => {
        toggleLoading(true);
        try {
            let response: any;
            if(isEdit){
                response = await CampusService.updateCampus(currentCampus.basicData.id,data) as Response;
            } else {
                response = await CampusService.createCampus(data) as Response;
            }
            console.log("Response create/update campus:", response);
            
            if(response.success){
                showToast(`Colegio ${response.data.name}, fue ${isEdit ? "actualizado" : "creado"} con exito!`, "success");
                updateBasicData(response.data);
                handlerSteps(1);
                activeNavSteps(2);
                toggleLoading(false);
                onNext();
            } else {
                toggleLoading(false);
                showToast(`Error al ${isEdit ? "actualizar" : "crear"} el colegio: ${response.message}`, "error");
            }
        } catch (error: any) {
            toggleLoading(false);
            showToast(`Error al ${isEdit ? "actualizar" : "crear"} el colegio`, "error");
            console.error(error);
        }
    };
    
    const requiredFields = [
        "description",
        "name",
        "gender",
        "languages",
        "foundation_year",
        "religion",
        "calendar_type",
        "mission",
        "vision",
    ];
    const watchedFields = watch(requiredFields);
    useEffect(() => {
        const isComplete = requiredFields.every((field, index) => {
            const value = watchedFields[index];
            return value !== undefined && value !== null && value !== "";
        });

        setBlockForm(!isComplete); // bloquea si no están todos completos
    }, [watchedFields]);    
    
    return(<>
        <div className="flex flex-col gap-[1rem] mb-[3rem]">
            <span className="m-0 font-bold text-[1rem] leading-[1.25rem]">Logo y descripción</span>
            <div className="flex gap-[1rem] max-md:flex-col">
                <div className="py-[0.75rem] flex justify-center px-[1rem] basis-1/4">
                    <InputImageComponent
                        name="logo_url"
                        onImageChange={(url) => {
                        }}
                    />
                </div>
                <div className="basis-3/4">
                    <TextAreaComponent
                        register={register("description", {
                            disabled: isDetail,
                        })}
                        name="description"
                        rows={6}
                        placeholder="Descripción del colegio"
                        label="Descripción colegio"
                        required
                        error={errors.description && errors.description.message as string}
                        />
                </div>
            </div>
            <hr className="my-[0.5rem]"/>
            <span className="m-0 font-bold text-[1rem] leading-[1.25rem]">Datos básicos</span>
            <div className={clsx(
                "grid grid-cols-4 gap-[1rem] max-lg:grid-cols-2 max-md:grid-cols-1",
            )}>
                <InputComponent
                    label="Nombre del colegio"
                    placeholder="Escribe el nombre del colegio"
                    className="capitalize"
                    name="name"
                    typeInput="text"
                    register={register("name", {
                        disabled: isDetail,
                    })}
                    required
                    error={errors.name && errors.name.message as string}
                    />
                <InputComponent
                    label="Nombre legal del colegio"
                    placeholder="Escribe el nombre legal del colegio"
                    className="capitalize"
                    name="legal_name"
                    typeInput="text"
                    register={register("legal_name", {
                        disabled: isDetail,
                    })}
                    required
                    error={errors.legal_name && errors.legal_name.message as string}
                    />
                <InputComponent
                    label="Código del colegio"
                    placeholder="Ejemplo: ST-01"
                    className="uppercase"
                    name="code"
                    typeInput="text"
                    register={register("code", {
                        onChange(e) {
                            const replace = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
                            setValue("code", replace.toUpperCase());
                        },
                        disabled: isDetail,
                    })}
                    required
                    error={errors.code && errors.code.message as string}
                    />
                <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                    <DropdownComponent
                        name='gender'
                        label="Género del colegio"
                        className='primary'
                        placeholder="Escoger género"
                        options={[
                            { label: "Masculino", value: "male" },
                            { label: "Femenino", value: "female" },
                            { label: "Mixto", value: "mixed" },
                        ]}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        disabled={isDetail}
                        required
                        error={errors.gender && errors.gender.message as string}
                        />
                    )}
                />
                <Controller
                    name="languages"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                    <DropdownComponent
                        isMulti={true}
                        name='languages'
                        label="Idiomas"
                        className='primary'
                        placeholder="Idiomas"
                        options={[
                            { label: "Español", value: "Spanish" },
                            { label: "Inglés", value: "English" },
                            { label: "Francéss", value: "French" },
                        ]}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        required
                        disabled={isDetail}
                        error={errors.languages && errors.languages.message as string}
                        />
                    )}
                />
                <InputComponent
                    typeInput="number"
                    label="Año de fundación del colegio"
                    placeholder='Año en que se fundó el colegio'
                    name="foundation_year"
                    register={register("foundation_year", {
                        valueAsNumber: true,
                        onChange(e) {
                            const value = e.target.value;
                            if (value > new Date().getFullYear() - 4) {
                                setError("foundation_year", {
                                    type: "manual",
                                    message: "El colegio debe haber sido fundado 4 años antes de la fecha actual",
                                })
                            } else if(value < 1){
                                setError("foundation_year", {
                                    type: "manual",
                                    message: "El año debe ser mayor a 0",
                                })
                            } else {
                                setError("foundation_year", { type: "manual", message: "" });
                                setValue("foundation_year", value);
                            }
                        },
                        disabled: isDetail,
                    })}
                    required
                    error={errors.foundation_year && errors.foundation_year.message as string}
                    />
                <InputComponent
                    typeInput="number"
                    label="Cantidad de estudiantes"
                    placeholder='Cantidad de estudiantes'
                    name="max_students"
                    register={register("max_students", {
                        valueAsNumber: true,
                        min: 1,
                        onChange(event) {
                            const value = event.target.value;
                            if (value < 1) {
                                setError("max_students", {
                                    type: "manual",
                                    message: "La capacidad debe ser mayor a 0",
                                });
                            } else {
                                setError("max_students", { type: "manual", message: "" });
                                setValue("max_students", value);
                            }
                        },
                        disabled: isDetail,
                    })}
                    required
                    error={errors.max_students && errors.max_students.message as string}
                    />
                <Controller
                    name="religion"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                    <DropdownComponent
                        name='religion'
                        label="Religión"
                        className='primary'
                        placeholder="Escoge la religión"
                        options={[
                            { label: "Catolica", value: "Cathalic" },
                            { label: "Evangélico", value: "Evangelical" },
                            { label: "Mormon", value: "Mormon" },
                        ]}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        required
                        disabled={isDetail}
                        error={errors.religion && errors.religion.message as string}
                        />
                    )}
                    />
                <Controller
                    name="calendar_type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DropdownComponent
                        name='calendar_type'
                        label="Tipo de calendario"
                        className='primary'
                        placeholder="Ejemplo: Calendario A"
                        options={[
                            { label: "A", value: "A" },
                            { label: "B", value: "B" },
                            { label: "Flexible", value: "Flexible" },
                        ]}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                        required
                        disabled={isDetail}
                        error={errors.calendar_type && errors.calendar_type.message as string}
                        />
                    )}
                    />
            </div>
            <div className="flex max-md:flex-wrap gap-[1rem]">
                <div className="flex flex-col w-full basis-1/2 max-md:basis-full">
                    <label htmlFor="mission" className="font-bold text-[1.25rem]"><b className="text-red-500">{"*"}</b> Misión</label>
                    <TextAreaComponent
                        register={register("mission")}
                        name="mission"
                        rows={4}
                        placeholder="Misión del colegio"
                        error={errors.mission && errors.mission.message as string}
                        required
                        disabled={isDetail}
                        />
                </div>
                <div className="flex flex-col basis-1/2 max-md:basis-full">
                    <label htmlFor="vision" className="font-bold text-[1.25rem]"><b className="text-red-500">{"*"}</b> Visión</label>
                    <TextAreaComponent
                        register={register("vision", {
                            disabled: isDetail,
                        })}
                        name="vision"
                        rows={4}
                        placeholder="Visión del colegio"
                        error={errors.vision && errors.vision.message as string}
                        required
                        />
                </div>
            </div>
        </div>
        <div className="w-full absolute bottom-0 bg-white">
            <div className="flex justify-end gap-[1.25rem] pr-[3rem]">
            <ButtonComponent
                onClick={onBack}
                className="secondary"
                label="Cancelar"
            />
            {isDetail ? null : <ButtonComponent
                blockAccess={blockForm}
                className="primary"
                onClick={handleSubmit(onSubmit)}
                type="submit"
                label={isEdit ? "Actualizar" : "Siguiente"}
            />}
            </div>
        </div>
    </>);
}

export default BasicDataForm;