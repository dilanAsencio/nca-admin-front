import React, { useEffect, useState } from "react";
import InputComponent from "@/components/shared/input/InputComponent";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import ImageUploader from "@/components/shared/imageUploader/ImageUploader";
import MapComponent from "@/components/shared/map/MapComponent";
import CheckBoxComponent from "@/components/shared/check/CheckBoxComponent";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { Controller, useForm } from "react-hook-form";
import { BranchesForm, BranchesResponse } from "@/app/core/interfaces/academicManagement/branches-interfaces";
import { barriosPorCiudad, ciudadesPorDepartamento, departamentos } from "@/app/core/constants/location-data";
import { useUI } from "@/providers/ui-context";
import * as alerts from "@/utils/alerts";
import { BranchesService } from "@/services/managementAcademic/branches-service";
import { LevelService } from "@/services/managementAcademic/level-services";
import DropTableComponent from "@/components/shared/drop-table/DropTable";
import { ButtonActions, Columns } from "@/app/core/interfaces/tables-interfaces";
import { GradeService } from "@/services/managementAcademic/grade-service";
import { ProgressSpinner } from 'primereact/progressspinner';
import { GradeLevelChildColumnsDropTable, LevelColumnsDropTable } from "@/app/core/interfaces/columns-interfaces";
import { Response } from "@/app/core/interfaces/api-interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { brancheSchema } from "@/app/core/schemas/forms-academic-schemas";

interface BranchesFormProps {
  title?: string;
  hideForm?: () => void;
  dataBranches?: (data: BranchesForm[]) => BranchesForm[];
  writeData?: BranchesForm;
  resetForm?: boolean;
}

const BranchesFormComponent: React.FC<BranchesFormProps> = ({
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
  } = useForm<BranchesForm>({
    // resolver: zodResolver(brancheSchema),
  });
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploadGreenAreasUrls, setUploadGreenAreasUrls] = useState<string[] | null>(null);
  const [uploadLabsUrls, setUploadLabsUrls] = useState<string[] | null>(null);
  const [uploadSportsAreasUrls, setUploadSportsAreasUrls] = useState<string[] | null>(null);
  const [checkGreenAreas, setCheckGreenAreas] = useState<boolean>(false);
  const [checkLabs, setCheckLabs] = useState<boolean>(false);
  const [checkSportsAreas, setCheckSportsAreas] = useState<boolean>(false);
  const [openMap, setOpenMap] = useState<boolean>(false);
  const [levels, setLevels] = useState<any[]>([]);
  const showToast = alerts.showToast;
  const showConfirm = alerts.showConfirm;

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
  const [branches, setBranches] = useState<BranchesForm[] | null>(null);
  const [isLandingTable, setIsLoadingTable] = useState<boolean>(true);

  const columnsLevels: Columns<LevelColumnsDropTable>[] = [
    { nameField: "Nombre nivel", key: "displayName" },
    { nameField: "Periodo académico", key: "periodoAcademico" },
    { nameField: "Descripcion", key: "summary" },
    { nameField: "Codigo", key: "code" },
  ];
  const childColumnsGrade: Columns<GradeLevelChildColumnsDropTable>[] = [
    { nameField: "Nombre grado", key: "displayName" },
    { nameField: "Capacidad máxima", key: "maxCapacity" },
    { nameField: "Valor grado", key: "formattedPrice" },
  ]

  const {currentCampus, iconsActionsTable, handleOptionLevel, toggleModalNivel, toggleModalGrado, toggleLoading, addBranches, handlerSteps, activeNavSteps} = useUI();

  const iconEdit = iconsActionsTable.edit;
  const iconDelete = iconsActionsTable.delete;
  const isEdit = writeData ? true : false; 

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
    setIsLoadingTable(true);
    try {
      const response: any = await LevelService.getLevelsCampusBranch(brancheId);
      if (response?.content) {
        let levels: any[] = [];
        let levelsDrop: any[] = [];
        for (const item of response.content) {
          const gradesLevel: any = await GradeService.getGradesByLevel(item.id);
          let grades = [];
          levelsDrop.push({value: item.id, label: item.name});
          if(gradesLevel?.content){
            grades = gradesLevel.content;
            levels.push({
              ...item,
              periodoAcademico: item.academicPeriod ? item.academicPeriod.name : "N/A",
              children: grades.length > 0 ? grades : []
            })
          }
        }
        handleOptionLevel(levelsDrop);
        setLevels(levels);
      }
      setIsLoadingTable(false);
    } catch (error: any) {
      setIsLoadingTable(false);
      console.error(error);
    }
  };

  const addBranche = async (data: BranchesForm) => {
    try {
        if(currentCampus.basicData && currentCampus.basicData.id){
          const response = await BranchesService.createBranche(currentCampus.basicData.id, data) as any;
          if(response?.success){
              const sede: BranchesResponse = {
                ...response.data,
                display: false,
                title: response.data?.name ? `${response.data.name} - ${response.data.full_address}` : '',
              };
              let updatedBranches: BranchesForm[] = [sede];
              branches && branches.map((item) => {
                if (item.id === sede.id) return;
                updatedBranches.push(item);
              })
              
              showToast(`Sede ${response.data.name}, creada con exito!`, "success");
              addBranches(updatedBranches);
              dataBranches && dataBranches(updatedBranches);
              setBranches(updatedBranches);
              handlerSteps(2);
              activeNavSteps(2);
              activeNavSteps(3);
              hideForm && hideForm();
          }
        } else {
          showToast("Debe haber un colegio asociado", "warning");
        }
    } catch (error: any) {
        console.error(error);
    }
  };
  
  const btnActionsNivel = (item: any): ButtonActions[] =>{
    return [
      {
        tooltip: "Editar nivel",
        action: () => toggleModalNivel(true, 1, item),
        icon: iconEdit,
      },
      {
        tooltip: "Eliminar nivel",
        action: () => handleDeleteLevel(item),
        icon: iconDelete,
      },
    ]
  }
  const btnActionsNivelGrados = (item: any): ButtonActions[] =>{
    return [
      {
        tooltip: "Editar grado",
        action: () => toggleModalGrado(true, 1, item),
        icon: iconEdit,
      },
      {
        tooltip: "Eliminar grado",
        action: () => handleDeleteGrade(item),
        icon: iconDelete,
      },
    ]
  }

  const handleDeleteLevel = async (item: any) => {
    const consfirm = await showConfirm(
      "Está seguro?",
      `está apunto de eliminar el nivel "${item.displayName}"`,
      "warning",
    );
    if (consfirm) {
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
  }
  const handleDeleteGrade = async (item: any) => {
    const consfirm = await showConfirm(
      "Está seguro?",
      `está apunto de eliminar el grado "${item.displayName}"`,
      "warning",
    );
    if (consfirm) {
      toggleLoading(true);
      try {
        GradeService.deleteGrade(item.id)
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
  <div className="relative flex flex-col p-[1.25rem_1rem_1rem_1rem] gap-[1rem] rounded-[0.5rem] border border-solid border-[#610CF4]">
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
        required
        error=""
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
    <hr className="my-[0.5rem]" />
    { levels.length === 0 ?
      <div className="flex flex-col justify-center text-center">
        <ProgressSpinner aria-label="Cargando..." />
        <span className="text-gray-800 font-bold text-[1rem]">Cargando...</span>
      </div>
    : <DropTableComponent<LevelColumnsDropTable, GradeLevelChildColumnsDropTable>
        columns={columnsLevels}
        childrenColumns={childColumnsGrade}
        data={levels}
        title="Niveles asociados a la sede"
        btnActions={(row) => btnActionsNivel(row)}
        btnActionsChild={(row) => btnActionsNivelGrados(row)}
      />
    }
    <hr className="my-[0.5rem]" />
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
        label={`${isEdit ? "Actualizar" : "Crear"} sede`}
        onClick={handleSubmit(addBranche)}
      />
    </div>
    {openMap && <MapComponent />}
  </div>
)}

export default BranchesFormComponent;