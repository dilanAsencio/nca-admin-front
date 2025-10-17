import { datosAspiranteSchema } from "@/app/core/schemas/admissions-landing-schema";
import DropdownComponent from "@/components/shared/dropdown/DropdownComponent";
import InputComponent from "@/components/shared/input/InputComponent"
import InputDateComponent from "@/components/shared/input/InputDateComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const BasicDataForm: React.FC = () => {
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
    resolver: zodResolver(datosAspiranteSchema),
  });
    return (
        <div className="py-[1rem] px-[1.19rem] grid grid-cols-3 gap-[1.5rem]">
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="code"
            className="capitalize"
            typeInput="text"
            register={register("name")}
            required
            error={errors.name && errors.name.message}
          />
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="code"
            className="capitalize"
            typeInput="text"
            register={register("lastName")}
            required
            error={errors.lastName && errors.lastName.message}
          />
        <Controller
            name="typeDoc"
            control={control}
            render={({ field }) => (
            <DropdownComponent
                name="typeDoc"
                label="Nivel academico"
                className="primary"
                placeholder="Escoger nivel academico"
                options={[]}
                onChange={(value) => {
                    // selectedLevel(value);
                    field.onChange(value);
                }}
                value={field.value}
                required
                error={
                errors.typeDoc &&
                errors.typeDoc.message
                }
            />
            )}
        />
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="numberDoc"
            className="capitalize"
            typeInput="text"
            register={register("numberDoc")}
            required
            error={errors.numberDoc && errors.numberDoc.message}
          />
          <InputDateComponent
              label="Fecha de nacimiento"
              name="birthDate"
              control={control}
              required
              error={errors.birthDate && errors.birthDate.message}
          />
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="birthDate"
            className="capitalize"
            typeInput="text"
            register={register("birthDate")}
            required
            error={errors.birthDate && errors.birthDate.message}
          />
          {/* <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="code"
            className="capitalize"
            typeInput="text"
            register={register("code")}
            required
            error={errors.code && errors.code.message}
          />
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="code"
            className="capitalize"
            typeInput="text"
            register={register("code")}
            required
            error={errors.code && errors.code.message}
          />
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="code"
            className="capitalize"
            typeInput="text"
            register={register("code")}
            required
            error={errors.code && errors.code.message}
          />
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="code"
            className="capitalize"
            typeInput="text"
            register={register("code")}
            required
            error={errors.code && errors.code.message}
          />
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="code"
            className="capitalize"
            typeInput="text"
            register={register("code")}
            required
            error={errors.code && errors.code.message}
          />
          <InputComponent
            label="Codigo grado académico"
            placeholder="Codigo grado académico"
            name="code"
            className="capitalize"
            typeInput="text"
            register={register("code")}
            required
            error={errors.code && errors.code.message}
          /> */}
        </div>
    )
}

export default BasicDataForm;