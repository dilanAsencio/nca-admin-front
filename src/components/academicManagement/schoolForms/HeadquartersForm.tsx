"use client";

import { useEffect, useState } from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import InputComponent from "@/components/shared/input/InputComponent";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import ImageUploader from "@/components/shared/imageUploader/ImageUploader";
import MapComponent from "@/components/shared/map/MapComponent";
import { Branches } from "@/types/forms-types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useUI } from "@/providers/ui-context";
import { SchoolService } from "@/services/managementAcademic/school-services";
import showToast from "@/utils/toast";
import { barriosPorCiudad, ciudadesPorDepartamento, departamentos } from "@/types/location-data";

const HeadquartersForm: React.FC<{onNext: () => void, onBack: () => void}> = ({onNext, onBack}) => {
  const { currentCampus, addHeadquarter } = useUI();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    getValues,
    resetField,
    clearErrors,
    watch,
  } = useForm<Branches>();
  const [showForm, setShowForm] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [checkGreenAreas, setCheckGreenAreas] = useState(false);
  const [checkLabs, setCheckLabs] = useState(false);
  const [checkSportsAreas, setCheckSportsAreas] = useState(false);
  const [branches, setBranches] = useState<Branches[] | null>(null);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploadGreenAreasUrls, setUploadGreenAreasUrls] = useState<string[]>(
    []
  );
  const [uploadLabsUrls, setUploadLabsUrls] = useState<string[]>([]);
  const [uploadSportsAreasUrls, setUploadSportsAreasUrls] = useState<string[]>(
    []
  );

  const getName = (): string => {
    return watch("name") === "" ? "Sede" : getValues("name");
  };

  const handleImagesChange = (files: File[], urls: string[]) => {
    setUploadedUrls(urls);
  };
  const handleImagesGreenAreasChange = (files: File[], urls: string[]) => {
    setUploadGreenAreasUrls(urls);
  };
  const handleImagesLabsChange = (files: File[], urls: string[]) => {
    setUploadLabsUrls(urls);
  };
  const handleImagesSportsAreasChange = (files: File[], urls: string[]) => {
    setUploadSportsAreasUrls(urls);
  };

  const [ciudades, setCiudades] = useState<{ label: string; value: string }[]>([]);
  const [barrios, setBarrios] = useState<{ label: string; value: string }[]>([]);

  const handleDepartamentoChange = (value: any) => {
    
    setValue("department", value);
    setValue("city", ""); // Reset city
    setValue("neighborhood", ""); // Reset neighborhood

    setCiudades(ciudadesPorDepartamento[value] || []);
    setBarrios([]);
  };

  const handleCiudadChange = (value: any) => {
    setValue("city", value);
    setValue("neighborhood", ""); // Reset barrio

    setBarrios(barriosPorCiudad[value] || []);
  };
  const handleBarrioChange = (value: any) => {
    setValue("neighborhood", value);
  };

  const addBranche = async (data: Branches) => {
    try {
        if(currentCampus.basicData !== null && currentCampus.basicData.id !== null){
          const response = await SchoolService.createBranch(currentCampus.basicData.id, data);
          if(response.success){
              const sede: Branches = {
                ...response.data,
                display: false,
                title: `${response.data.name} - ${response.data.street_type} ${response.data.number_primary} ${response.data.complement_primary} # ${data.number_secondary} ${response.data.complement_secondary} - ${response.data.neighborhood} - ${response.data.city} - ${response.data.department}`,
              };
              let updatedBranches: Branches[] = [sede];
              branches && branches.map((item) => {
                if (item.id === sede.id) return;
                updatedBranches.push(item);
              })
              
              showToast(`Sede ${response.data.name}, creada con exito!`, "success");              
              addHeadquarter(updatedBranches);
              setBranches(updatedBranches);
              setShowForm(false);
          }
        } else {
          showToast("Debe haber un colegio asociado", "warning");
        }
    } catch (error: any) {
        console.error(error);
    }
  };

  const handleBranches = (sede: any) => {    
    
    setValue("name", sede.name);
    setValue("street_type", sede.street_type);
    setValue("number_primary", sede.number_primary);
    setValue("complement_primary", sede.complement_primary);
    setValue("number_secondary", sede.number_secondary);
    setValue("complement_secondary", sede.complement_secondary);
    setValue("street_name", sede.street_name);
    setValue("department", sede.department);
    setCiudades(ciudadesPorDepartamento[sede.department] || []);
    setValue("city", sede.city);
    setBarrios(barriosPorCiudad[sede.city] || []);
    setTimeout(() => {
      setValue("neighborhood", sede.neighborhood);
    }, 100);
    setValue("has_green_zones", sede.has_green_zones);
    setValue("has_laboratory", sede.has_laboratory);
    setValue("has_sports_zones", sede.has_sports_zones);
    setBranches((prevSedes) =>
      prevSedes && prevSedes.map((item) =>
        item.name === sede.name ? { ...item, display: !item.display } : item
      ) || []
    );
  };

  useEffect(() => {
    if (currentCampus.headquarters && currentCampus.headquarters.length > 0) {
      setBranches(currentCampus.headquarters);
      setShowForm(false);
    }
  }, [currentCampus.headquarters]);

  return (
    <div className="flex flex-col gap-[1rem]">
      <span className="m-0 font-bold text-[1rem] leading-[1.25rem]">
        Sedes Actuales
      </span>
      {!showForm && branches === null ? (
        <div className="flex justify-center gap-[1.5rem] py-[0.75rem]">
          <div className="py-[0.75rem] px-[1rem] ">
            <h5 className="font-medium text-[1.25rem]">
              No tienes sedes creadas, para crear una sede, presiona el botón
            </h5>
          </div>
          <div className="">
            <ButtonComponent
              className="primary"
              icon={{ path: "/assets/icon/Group.svg", alt: "school-icon" }}
              label="Crear sede"
              onClick={() => {setShowForm(true); reset();}}
            />
          </div>
        </div>
      ) : branches && !showForm ? (<>
        {branches.map((sede: any) => 
          <div key={sede.id}>
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex gap-[0.5rem]">
                  <Image
                    src="/assets/icon/marker-03.svg"
                    alt="school-icon"
                    width={24}
                    height={24}
                  />
                  <span className="m-0 font-medium text-[1rem] leading-[1.25rem]">
                    {sede.title}
                  </span>
                </div>
              </div>
              <div className="flex gap-[0.5rem] cursor-pointer" onClick={() => {handleBranches(sede)}}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <hr className="my-[0.5rem]" />
            {sede.display && (
              <div className="relative flex flex-col p-[1.25rem_1rem_1rem_1rem] gap-[1rem] rounded-[0.5rem] border-[0.068rem] border-solid border-[#610CF4]">
                <label className="absolute w-auto top-[-0.8rem] left-4 bg-white text-[#610CF4] font-normal text-[1rem]">
                  {sede.title}
                </label>
                <div className="grid grid-cols-4 gap-y-[2rem] gap-x-[1rem] pb-[1rem]">
                  <InputComponent
                    label="Nombre de la sede"
                    placeholder="Ej: Sede Sur, Sede Norte"
                    name="name"
                    className="capitalize"
                    typeInput="text"
                    register={register("name")}
                  />
                  <Controller
                      name="street_type"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                      <DropdownComponent
                          name='street_type'
                          label="Calle/Carrera"
                          className='primary'
                          placeholder="Calle, Carrera,"
                          options={[
                              { label: "Calle", value: "Calle" },
                              { label: "Carrera", value: "Carrera" },
                              { label: "Diagonal", value: "Diagonal" },
                              { label: "Transversal", value: "Transversal" },
                          ]}
                          onChange={(value) => field.onChange(value)}
                          value={field.value}
                          />
                      )}
                      />
                  <InputComponent
                    label="Nombre de la calle (Opcional)"
                    placeholder="Ej: Calle Bellavista"
                    name="street_name"
                    className="capitalize"
                    typeInput="text"
                    register={register("street_name")}
                  />
                  <InputComponent
                    typeInput="number"
                    label="Número"
                    placeholder=""
                    name="number_primary"
                    register={register("number_primary")}
                  />
                  <InputComponent
                    label="Complemento"
                    placeholder="Ej:A, B, Sur, Norte"
                    name="complement_primary"
                    className="capitalize"
                    typeInput="text"
                    register={register("complement_primary")}
                  />
                  <InputComponent
                    typeInput="number"
                    label="# Número"
                    placeholder=""
                    name="number_secondary"
                    register={register("number_secondary")}
                  />
                  <InputComponent
                    label="Complemento"
                    placeholder="Ej:Piso 3"
                    name="complement_secondary"
                    className="capitalize"
                    typeInput="text"
                    register={register("complement_secondary")}
                  />
                  <Controller
                      name="department"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                      <DropdownComponent
                          name='department'
                          label="Departamento"
                          className='primary'
                          placeholder="Ej: Atlántico, Cundinamarca"
                          options={departamentos}
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            handleDepartamentoChange(value);
                          }}
                          />
                      )}
                      />
                  <Controller
                      name="city"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                      <DropdownComponent
                          name='city'
                          label="Ciudad"
                          className='primary'
                          placeholder="Escoger ciudad"
                          options={ciudades}
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            handleCiudadChange(value);
                          }}
                          />
                      )}
                      />
                  <Controller
                      name="neighborhood"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                      <DropdownComponent
                          name='neighborhood'
                          label="Barrio / Localidad"
                          className='primary'
                          placeholder="Escoger barrio"
                          options={barrios}
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            handleBarrioChange(value);
                          }}
                          />
                      )}
                      />
                </div>
                <ImageUploader
                  maxImages={5}
                  maxSizeMB={30}
                  onChange={handleImagesChange}
                />
                <hr className="my-[0.5rem]" />
                <span className="mb-[1rem] text-[#262626] font-bold text-[1rem]">
                  Fotos adicionales (Opcional)
                </span>
                <div className="form-check">
                  <CheckBoxComponent
                    checked={checkGreenAreas}
                    name="checkGreenAreas"
                    setChecked={() => setCheckGreenAreas(!checkGreenAreas)}
                    label="¿La sede cuenta con zonas verdes? (Opcional)"
                  />
                </div>
                {checkGreenAreas && (
                  <ImageUploader
                    maxImages={5}
                    maxSizeMB={30}
                    onChange={handleImagesGreenAreasChange}
                  />
                )}
                <div className="form-check">
                  <CheckBoxComponent
                    checked={checkLabs}
                    name="checkLabs"
                    setChecked={() => setCheckLabs(!checkLabs)}
                    label="¿La sede cuenta con laboratorios? (Opcional)"
                  />
                </div>
                {checkLabs && (
                  <ImageUploader
                    maxImages={5}
                    maxSizeMB={30}
                    onChange={handleImagesLabsChange}
                  />
                )}
                <div className="form-check">
                  <CheckBoxComponent
                    checked={checkSportsAreas}
                    name="checkSportsAreas"
                    setChecked={() => setCheckSportsAreas(!checkSportsAreas)}
                    label="¿La sede cuenta con zonas deportivas? (Opcional)"
                  />
                </div>
                {checkSportsAreas && (
                  <ImageUploader
                    maxImages={5}
                    maxSizeMB={30}
                    onChange={handleImagesSportsAreasChange}
                  />
                )}
                <div className="flex justify-end gap-4">
                  <ButtonComponent
                    className="tertiary-outline"
                    icon={{ path: "/assets/icon/map-02.svg", alt: "localizar-icon" }}
                    label="Localizar en el mapa"
                    onClick={() => setOpenMap((prev) => !prev)}
                  />
                  <ButtonComponent
                    className="secondary"
                    label="Cancelar"
                    onClick={() => setShowForm(false)}
                  />
                  <ButtonComponent
                    className="primary"
                    type="submit"
                    label="Crear sede"
                    onClick={handleSubmit(addBranche)}
                  />
                </div>
                {openMap && <MapComponent />}
              </div>)
            }
          </div>
        )}
        <div className="flex justify-end">
          <ButtonComponent
            className="primary"
            icon={{ path: "/assets/icon/Group.svg", alt: "school-icon" }}
            label="Crear otra sede"
            onClick={() => {setShowForm(true); reset();}}
          />
        </div></>
      ) : (
        <div className="relative flex flex-col p-[1.25rem_1rem_1rem_1rem] gap-[1rem] rounded-[0.5rem] border-[0.068rem] border-solid border-[#610CF4]">
          <label className="absolute w-auto top-[-0.8rem] left-4 bg-white text-[#610CF4] font-normal text-[1rem]">
            {getName()}
          </label>
          <div className="grid grid-cols-4 gap-y-[2rem] gap-x-[1rem] pb-[1rem]">
            <InputComponent
              label="Nombre de la sede"
              placeholder="Ej: Sede Sur, Sede Norte"
              name="name"
              className="capitalize"
              typeInput="text"
              register={register("name")}
            />
            <Controller
                name="street_type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <DropdownComponent
                    name='street_type'
                    label="Calle/Carrera"
                    className='primary'
                    placeholder="Calle, Carrera,"
                    options={[
                        { label: "Calle", value: "Calle" },
                        { label: "Carrera", value: "Carrera" },
                        { label: "Diagonal", value: "Diagonal" },
                        { label: "Transversal", value: "Transversal" },
                    ]}
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                    />
                )}
                />
            <InputComponent
              label="Nombre de la calle (Opcional)"
              placeholder="Ej: Calle Bellavista"
              name="street_name"
              className="capitalize"
              typeInput="text"
              register={register("street_name")}
            />
            <InputComponent
              typeInput="number"
              label="Número"
              placeholder=""
              name="number_primary"
              register={register("number_primary")}
            />
            <InputComponent
              label="Complemento"
              placeholder="Ej:A, B, Sur, Norte"
              name="complement_primary"
              className="capitalize"
              typeInput="text"
              register={register("complement_primary")}
            />
            <InputComponent
              typeInput="number"
              label="# Número"
              placeholder=""
              name="number_secondary"
              register={register("number_secondary")}
            />
            <InputComponent
              label="Complemento"
              placeholder="Ej:Piso 3"
              name="complement_secondary"
              className="capitalize"
              typeInput="text"
              register={register("complement_secondary")}
            />
            <Controller
                name="department"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <DropdownComponent
                    name='department'
                    label="Departamento"
                    className='primary'
                    placeholder="Ej: Atlántico, Cundinamarca"
                    options={departamentos}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      handleDepartamentoChange(value);
                    }}
                    />
                )}
                />
            <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <DropdownComponent
                    name='city'
                    label="Ciudad"
                    className='primary'
                    placeholder="Escoger ciudad"
                    options={ciudades}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      handleCiudadChange(value);
                    }}
                    />
                )}
                />
            <Controller
                name="neighborhood"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <DropdownComponent
                    name='neighborhood'
                    label="Barrio / Localidad"
                    className='primary'
                    placeholder="Escoger barrio"
                    options={barrios}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    />
                )}
                />
          </div>
          <ImageUploader
            maxImages={5}
            maxSizeMB={30}
            onChange={handleImagesChange}
          />
          <hr className="my-[0.5rem]" />
          <span className="mb-[1rem] text-[#262626] font-bold text-[1rem]">
            Fotos adicionales (Opcional)
          </span>
          <div className="form-check">
            <CheckBoxComponent
              checked={checkGreenAreas}
              name="checkGreenAreas"
              setChecked={() => setCheckGreenAreas(!checkGreenAreas)}
              label="¿La sede cuenta con zonas verdes? (Opcional)"
            />
          </div>
          {checkGreenAreas && (
            <ImageUploader
              maxImages={5}
              maxSizeMB={30}
              onChange={handleImagesGreenAreasChange}
            />
          )}
          <div className="form-check">
            <CheckBoxComponent
              checked={checkLabs}
              name="checkLabs"
              setChecked={() => setCheckLabs(!checkLabs)}
              label="¿La sede cuenta con laboratorios? (Opcional)"
            />
          </div>
          {checkLabs && (
            <ImageUploader
              maxImages={5}
              maxSizeMB={30}
              onChange={handleImagesLabsChange}
            />
          )}
          <div className="form-check">
            <CheckBoxComponent
              checked={checkSportsAreas}
              name="checkSportsAreas"
              setChecked={() => setCheckSportsAreas(!checkSportsAreas)}
              label="¿La sede cuenta con zonas deportivas? (Opcional)"
            />
          </div>
          {checkSportsAreas && (
            <ImageUploader
              maxImages={5}
              maxSizeMB={30}
              onChange={handleImagesSportsAreasChange}
            />
          )}
          <div className="flex justify-end gap-4">
            <ButtonComponent
              className="tertiary-outline"
              icon={{ path: "/assets/icon/map-02.svg", alt: "localizar-icon" }}
              label="Localizar en el mapa"
              onClick={() => setOpenMap((prev) => !prev)}
            />
            <ButtonComponent
              className="secondary"
              label="Cancelar"
              onClick={() => setShowForm(false)}
            />
            <ButtonComponent
              className="primary"
              type="submit"
              label="Crear sede"
              onClick={handleSubmit(addBranche)}
            />
          </div>
          {openMap && <MapComponent />}
        </div>
      )}
      <hr className="my-[0.5rem]" />
      <div className="w-full absolute bottom-0 bg-white">
          <div className="flex justify-end gap-[1.25rem]">
          <ButtonComponent
              onClick={onBack}
              className="secondary"
              label="Cancelar"
          />
          <ButtonComponent
              blockAccess={branches && branches?.length > 0 ? false : true}
              className="primary"
              onClick={onNext}
              type="submit"
              label="Siguiente"
          />
          </div>
      </div>
    </div>
  );
};

export default HeadquartersForm;
