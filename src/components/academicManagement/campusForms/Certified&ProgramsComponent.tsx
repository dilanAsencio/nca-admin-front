"use client";

import { useState } from "react";
import InputComponent from "@/components/shared/input/InputComponent";
import { InputImageComponent } from "@/components/shared/input/InputImage";
import TextAreaComponent from "@/components/shared/input/TextAreaComponent";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import ImageUploader from "@/components/shared/imageUploader/ImageUploader";
import Image from "next/image";
import ModalComponent from "@/components/ui/ModalComponent";
import { useForm } from "react-hook-form";
import { transformarCadena } from "@/utils/utils";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { useUI } from "@/providers/ui-context";

const CertifiedAndProgramsForm: React.FC<{ onClose: () => void }> = ({onClose}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
  } = useForm();

  const { handlerSteps, updateCertifications } = useUI();

    const [showModalProgram, setShowModalProgram] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const [previewLogoProgram, setPreviewLogoProgram] = useState<string | null>(null);

    const [models, setModels] = useState([
        { name: "Model#1", label: "IB", checked: false },
        { name: "Model#2", label: "Trabajo Colaborativo", checked: false },
        { name: "Model#3", label: "Multidisciplinaria", checked: false },
        { name: "Model#4", label: "Pedagogía del amor", checked: false },
        { name: "Model#5", label: "Otros", checked: false },
    ]);

    const [programs, setPrograms] = useState<any[]>([]);

    const handleCheck = (name: string) => () => {
        setModels((prevModels) =>
            prevModels.map((model) => ({
                ...model,
                checked: model.name === name ? !model.checked : model.checked,
            }))
        );
        setPrograms((prevPrograms: any) =>
            prevPrograms.map((program: any) => ({
                ...program,
                checked: program.name === name ? !program.checked : program.checked,
            }))
        );
    };

    const toggleAddProgramModal = () => {
        setShowModalProgram(false);
        clearModalProgram();
    };
    const handleAddProgram = () => {
        const name = transformarCadena(getValues("nameProgram"));
        const program = {
            name: name,
            description: getValues("descriptionProgram"),
            img: previewLogoProgram,
            label: getValues("nameProgram"),
            checked: true,
        }
        programs.push(program);
        
        clearModalProgram();
    };

    const onSubmit = () => {
        handlerSteps(3);
        updateCertifications(getValues("certifications"));
        setConfirmation(true);
    };

    const clearModalProgram = () => {
        setValue("nameProgram", "");
        setValue("descriptionProgram", "");
        setValue("linkProgram", "");
        setPreviewLogoProgram(null);
        setShowModalProgram(false);
    };
    
    return(<>
        <div className="flex flex-col gap-[1rem]">
            <span className="m-0 font-bold text-[1rem] leading-[1.25rem]">Modelo pedagógico (Opcional)</span>
            <div className="flex gap-[1rem]">
                {models.map((model, index) => (
                    <CheckBoxComponent
                        key={index}
                        checked={model.checked}
                        name={model.name}
                        typeCheck="checkbadge"
                        setChecked={handleCheck(model.name)}
                        label={model.label}
                    />
                ))}
            </div>
            <hr className="my-[0.5rem]"/>
            <span className="m-0 font-bold text-[1rem] leading-[1.25rem]">Certificaciones</span>
            <ImageUploader
              maxImages={10}
              maxSizeMB={30}
              label="Arrastra o sube los certificados"
              format="PDF"
            />
            <hr className="my-[0.5rem]"/>
            <span className="m-0 font-bold text-[1rem] leading-[1.25rem]">Programas internacionales</span>
            <div className="grid grid-cols-5 gap-[1rem]">
                { programs && programs.map((pr, index) => (
                    <div key={index} className="relative flex flex-col gap-[0.68rem] p-[1rem]">
                        <div>
                            <Image
                                src={pr.img}
                                alt={pr.name}
                                width={235}
                                height={61}
                            />
                            <div className="absolute top-[0.5rem] left-[0.5rem]">
                                <CheckBoxComponent
                                    checked={pr.checked}
                                    name={pr.name}
                                    setChecked={handleCheck(pr.name)}
                                />
                            </div>
                        </div>
                        <span className="m-0 font-normal text-[1rem] leading-[1.25rem] text-center">{pr.label}</span>
                    </div>
                ))}
                <div className="relative cursor-pointer max-w-2/5 self-center" onClick={() => setShowModalProgram(true)}>
                    <div className="flex items-center border border-dashed border-[#D9D9D9] p-[1rem] rounded-[0.5rem]">
                        <Image
                            src={"/assets/img/plus-01.png"}
                            alt={"puls"}
                            width={64}
                            height={64}
                        />
                    </div>
                </div>
            </div>
            <hr className="my-[0.5rem]" />
            <div className="w-full absolute bottom-0 bg-white">
                <div className="flex justify-end gap-[1.25rem]">
                <ButtonComponent
                    onClick={onClose}
                    className="secondary"
                    label="Cancelar"
                />
                <ButtonComponent
                    className="primary"
                    onClick={() => {onSubmit()
                    }}
                    type="submit"
                    label="Guardar"
                />
                </div>
            </div>
        </div>
        { showModalProgram &&
            <ModalComponent handleModal={toggleAddProgramModal} handleSubmit={handleAddProgram} labelBtnAccept="Agregar" title="Agregar Programa">
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-y-[1rem] gap-x-[1rem] pb-[1rem]">
                        <InputComponent
                            label="Programa"
                            placeholder="Nombre del programa internacional"
                            name="nameProgram"
                            className="capitalize"
                            typeInput="text"
                            register={register("nameProgram")}/>
                        <InputComponent
                            typeInput="text"
                            label="Link del programa"
                            placeholder="Url del programa"
                            name="linkProgram"
                            register={register("linkProgram")}/>
                    </div>
                    <div className="flex gap-[1rem]">
                        <div className="py-[0.75rem] px-[1rem] basis-1/4">
                            <InputImageComponent
                                onImageChange={setPreviewLogoProgram}/>
                        </div>
                        <div className="basis-3/4">
                            <TextAreaComponent
                                name="descriptionProgram"
                                rows={6}
                                placeholder="Descripción"
                                label="Descripción"
                                register={register("descriptionProgram")}/>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        }
        
        { confirmation &&
            <ModalComponent sizeModal="medium" handleModal={() => setConfirmation(prev => !prev)} handleSubmit={() => {setConfirmation(false); onClose();}} labelBtnAccept="Acepar" title="Crear Colegio">
                <div className="p-[1rem] flex justify-center">
                    <span className="m-0 text-center text-2xl font-medium max-w-[80%] text-gray-900">Está seguro que desea  crear la el colegio con la información, e imágenes suministradas?</span>
                </div>
            </ModalComponent>
        }
    </>);
}

export default CertifiedAndProgramsForm;