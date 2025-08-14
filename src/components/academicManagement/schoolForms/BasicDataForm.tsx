"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import { InputImageComponent } from "@/components/shared/input/InputImage";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import { SchoolService } from "@/services/managementAcademic/school-services";
import { useUI } from "@/providers/ui-context";
import showToast from "@/utils/toast";

const BasicDataForm: React.FC<{onBack: () => void, onNext: () => void}> = ({onBack, onNext}) => {

    const { updateBasicData, currentCampus } = useUI();
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
        defaultValues: currentCampus.basicData || {},
     });

    const [blockForm, setBlockForm] = useState(true);
    const [previewImg, setPreviewImg] = useState("");

    const onSubmit = async (data: any) => {
        try {
            const response = await SchoolService.createCampus(data);
            if(response.success){
                showToast(`Colegio ${response.data.name}, creado con exito!`, "success");
                updateBasicData(response.data);
                onNext();
            }
        } catch (error: any) {
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
            <div className="flex gap-[1rem]">
                <div className="py-[0.75rem] px-[1rem] basis-1/4">
                    <InputImageComponent
                        name="logo_url"
                        onImageChange={(url) => {
                        }}
                    />
                </div>
                <div className="basis-3/4">
                    <TextAreaComponent
                        register={register("description")}
                        name="description"
                        rows={6}
                        placeholder="Descripción del colegio"
                        label="Descripción colegio" />
                </div>
            </div>
            <hr className="my-[0.5rem]"/>
            <span className="m-0 font-bold text-[1rem] leading-[1.25rem]">Datos básicos</span>
            <div className="grid grid-cols-4 grid-rows-2 gap-[1rem]">
                <InputComponent
                    label="Nombre del colegio"
                    placeholder="Escribe el nombre del colegio"
                    name="name"
                    typeInput="text"
                    register={register("name")}
                    />
                <InputComponent
                    label="Nombre legal del colegio"
                    placeholder="Escribe el nombre legal del colegio"
                    name="legal_name"
                    typeInput="text"
                    register={register("legal_name")}
                    />
                <InputComponent
                    label="Código del colegio"
                    placeholder="Escribe el código del colegio"
                    name="code"
                    typeInput="text"
                    register={register("code")}
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
                        />
                    )}
                    />
                <InputComponent
                    typeInput="number"
                    label="Año de fundación del colegio"
                    placeholder='Año en que se fundó el colegio'
                    name="foundation_year"
                    register={register("foundation_year")}
                    />
                <InputComponent
                    typeInput="number"
                    label="Canitad de estudiantes"
                    placeholder='Cantidad de estudiantes'
                    name="max_students"
                    register={register("max_students")}
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
                        />
                    )}
                    />
            </div>
            <div className="flex gap-[1rem]">
                <div className="flex flex-col basis-1/2 ">
                    <label htmlFor="mission" className="font-bold text-[1.25rem]">Misión</label>
                    <TextAreaComponent
                        register={register("mission")}
                        name="mission"
                        rows={4}
                        placeholder="Misión del colegio"/>
                </div>
                <div className="flex flex-col basis-1/2 ">
                    <label htmlFor="vision" className="font-bold text-[1.25rem]">Visión</label>
                    <TextAreaComponent
                        register={register("vision")}
                        name="vision"
                        rows={4}
                        placeholder="Visión del colegio"/>
                </div>
            </div>
        </div>
        <div className="w-full absolute bottom-0 bg-white">
            <div className="flex justify-end gap-[1.25rem]">
            <ButtonComponent
                onClick={onBack}
                className="secondary"
                label="Cancelar"
            />
            <ButtonComponent
                blockAccess={blockForm}
                className="primary"
                onClick={handleSubmit(onSubmit)}
                type="submit"
                label="Siguiente"
            />
            </div>
        </div>
    </>);
}

export default BasicDataForm;