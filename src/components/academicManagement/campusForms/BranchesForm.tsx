import React, { useEffect, useState } from "react";
import InputComponent from "@/components/shared/input/InputComponent";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import ImageUploader from "@/components/shared/imageUploader/ImageUploader";
import MapComponent from "@/components/shared/map/MapComponent";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { Controller, useForm } from "react-hook-form";
import { BranchesType } from "@/types/forms-types";
import { barriosPorCiudad, ciudadesPorDepartamento, departamentos } from "@/types/location-data";
import { useUI } from "@/providers/ui-context";
import showToast from "@/utils/toast";
import { BranchesService } from "@/services/managementAcademic/branches-service";
import { LevelService } from "@/services/managementAcademic/level-services";
import DropTableComponent from "@/components/shared/drop-table/DropTable";
import { btnActions } from "@/types/tables-interfaces";
import Swal from "sweetalert2";

interface BranchesFormProps {
  title?: string;
  hideForm?: () => void;
  dataBranches?: (data: BranchesType[]) => BranchesType[];
  writeData?: BranchesType;
  resetForm?: boolean;
}

const BranchesForm: React.FC<BranchesFormProps> = ({
    title, hideForm, dataBranches, writeData, resetForm = false
}) => {
  
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
  } = useForm<BranchesType>();
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploadGreenAreasUrls, setUploadGreenAreasUrls] = useState<string[] | null>(null);
  const [uploadLabsUrls, setUploadLabsUrls] = useState<string[] | null>(null);
  const [uploadSportsAreasUrls, setUploadSportsAreasUrls] = useState<string[] | null>(null);
  const [checkGreenAreas, setCheckGreenAreas] = useState<boolean>(false);
  const [checkLabs, setCheckLabs] = useState<boolean>(false);
  const [checkSportsAreas, setCheckSportsAreas] = useState<boolean>(false);
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [levels, setLevels] = useState<any[]>([]);

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
  const [branches, setBranches] = useState<BranchesType[] | null>(null);

  const columnsLevels = [
    { nameField: "Nombre nivel académico", key: "displayName" },
    { nameField: "Periodo académico", key: "periodoAcademico" },
    { nameField: "Descripcion", key: "summary" },
    { nameField: "Codigo", key: "code" },
  ];

  const {currentCampus, iconsActionsTable, toggleModalNivel, toggleLoading} = useUI();

  const iconEdit = iconsActionsTable.edit;
  const iconDelete = iconsActionsTable.delete;

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
  
  const getLevelsCampusBranche = async (brancheId: string) => {
    try {
      const response: any = await LevelService.getLevelsCampusBranch(brancheId);
      if (response?.content) {
        const levels = response.content.map((level: any) => ({
          ...level,
          periodoAcademico: level.academicPeriod ? level.academicPeriod.name : "N/A",
          children: [],
        }));
        setLevels(levels);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const addBranche = async (data: BranchesType) => {
    try {
        if(currentCampus.basicData && currentCampus.basicData.id){
          const response = await BranchesService.createBranch(currentCampus.basicData.id, data);
          if(response.success){
              const sede: BranchesType = {
                ...response.data,
                display: false,
                title: `${response.data.name} - ${response.data.full_address}`,
              };
              let updatedBranches: BranchesType[] = [sede];
              branches && branches.map((item) => {
                if (item.id === sede.id) return;
                updatedBranches.push(item);
              })
              
              showToast(`Sede ${response.data.name}, creada con exito!`, "success");
              dataBranches && dataBranches(updatedBranches);
              setBranches(updatedBranches);
              hideForm && hideForm();
          }
        } else {
          showToast("Debe haber un colegio asociado", "warning");
        }
    } catch (error: any) {
        console.error(error);
    }
  };
  
  const btnActionsNivel = (item: any): btnActions[] =>{
    return [
      {
        tooltip: "Editar nivel",
        action: () => toggleModalNivel(true),
        icon: iconEdit,
      },
      {
        tooltip: "Eliminar nivel",
        action: () => handleDeleteLevel(item),
        icon: iconDelete,
      },
    ]
  }

  const handleDeleteLevel = (item: any) => {
    Swal.fire({
      title: "Está seguro?",
      text: `está apunto de eliminar el nivel "${item.displayName}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#610CF4",
      cancelButtonColor: "#FFE193",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleLoading(true);
        try {
          LevelService.deleteLevel(item.id)
            .then((response) => {
              if (response?.success) {
                toggleLoading(false);
                showToast(`Nivel "${item.displayName}", eliminado con exito!`, "info");
                getLevelsCampusBranche(item.campusBranchId);
              }
            })
            .catch((error) => {
              toggleLoading(false);
              console.error(error); 
          });
        } catch (error: any) {
          console.error(error);
        }
      }
    });
  }

  useEffect(() => {
    if(writeData){
      setValue("name", writeData.name);
      setValue("street_type", writeData.street_type);
      setValue("number_primary", writeData.number_primary);
      setValue("complement_primary", writeData.complement_primary);
      setValue("number_secondary", writeData.number_secondary);
      setValue("complement_secondary", writeData.complement_secondary);
      setValue("street_name", writeData.street_name);
      setValue("department", writeData.department);
      setCiudades(ciudadesPorDepartamento[writeData.department] || []);
      setValue("city", writeData.city);
      setBarrios(barriosPorCiudad[writeData.city] || []);
      setTimeout(() => {
        setValue("neighborhood", writeData.neighborhood);
      }, 100);
      setValue("has_green_zones", writeData.has_green_zones);
      setValue("has_laboratory", writeData.has_laboratory);
      setValue("has_sports_zones", writeData.has_sports_zones);
      getLevelsCampusBranche(writeData.id || "");
    }
  }, [writeData]);

  useEffect(() => {
    if (resetForm) {
      reset();
      setUploadedUrls([]);
      setUploadGreenAreasUrls(null);
      setUploadLabsUrls(null);
      setUploadSportsAreasUrls(null);
      setCheckGreenAreas(false);
      setCheckLabs(false);
      setCheckSportsAreas(false);
      setOpenMap(false);
    }
  }, [resetForm]);
  
  return(
  <div className="relative flex flex-col p-[1.25rem_1rem_1rem_1rem] gap-[1rem] rounded-[0.5rem] border-[0.068rem] border-solid border-[#610CF4]">
    <label className="absolute w-auto top-[-0.8rem] left-4 bg-white text-[#610CF4] font-normal text-[1rem]">
      {title && title || getName()}
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
            name="street_type"
            label="Calle/Carrera"
            className="primary"
            placeholder="Calle, Carrera,"
            options={[
              { label: "Calle", value: "Calle" },
              { label: "Carrera", value: "Carrera" },
              { label: "Diagonal", value: "Diagonal" },
              { label: "Transversal", value: "Transversal" },
            ]}
            onChange={field.onChange}
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
            name="department"
            label="Departamento"
            className="primary"
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
            name="city"
            label="Ciudad"
            className="primary"
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
            name="neighborhood"
            label="Barrio / Localidad"
            className="primary"
            placeholder="Escoger barrio"
            options={barrios}
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              handleBarrioChange && handleBarrioChange(value);
            }}
          />
        )}
      />
    </div>
    { levels.length > 0 && <>
      <hr className="my-[0.5rem]" />
      <DropTableComponent
        columns={columnsLevels}
        data={levels}
        title="Niveles asociados a la sede"
        btnActions={(row) => btnActionsNivel(row)}
      />
      <hr className="my-[0.5rem]" />
    </>}
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
        setChecked={() => setCheckGreenAreas(prev => !prev)}
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
        setChecked={() => setCheckLabs(prev => !prev)}
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
        setChecked={() => setCheckSportsAreas(prev => !prev)}
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
      {hideForm && <ButtonComponent
        className="secondary"
        label="Cancelar"
        onClick={() => hideForm()}
      />}
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

export default BranchesForm;