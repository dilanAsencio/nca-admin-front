import { z } from "zod";

export const campusSchema = z.object({
  id: z
    .string()
    .optional(),
  description: z
    .string()
    .nonempty("Este campo es requerido!"),
  name: z
    .string()
    .nonempty("Este campo es requerido!"),
  legal_name: z
    .string()
    .nonempty("Este campo es requerido!"),
  code: z
    .string()
    .regex(/[^a-zA-Z0-9-]*$/, "El codigo debe ser alphanumérico")
    .max(10, "El codigo debe tener menos de 10 caracteres")
    .nonempty("Este campo es requerido!"),
  gender: z
    .string()
    .nonempty("Este campo es requerido!"),
  languages: z
    .array(z.string())
    .nonempty("Este campo es requerido!"),
  foundation_year: z
    .number()
    .int()
    .positive("El año debe ser mayor a 0")
    .max(new Date().getFullYear() - 4, "La fecha debe ser 4 años inferior a la actual")
    .min(1, "El año debe ser mayor a 0"),
  max_students: z
    .number({ required_error: "Este campo es requerido!"})
    .int()
    .positive("La capacidad debe ser mayor a 0")
    .min(1, "La capacidad debe ser mayor a 0")
    .default(1),
  religion: z
    .string()
    .nonempty("Este campo es requerido!"),
  calendar_type: z
    .string()
    .nonempty("Este campo es requerido!"),
  mission: z
    .string()
    .nonempty("Este campo es requerido!"),
  vision: z
    .string()
    .nonempty("Este campo es requerido!"),
});

export const brancheSchema = z.object({
  name: z
    .string()
    .nonempty("Este campo es requerido!"),
  description: z
    .string()
    .nonempty("Este campo es requerido!"),
  
})

export const nivelAcademicoSchema = z.object({
  id: z
    .string()
    .optional(),
  name: z
    .string()
    .nonempty("Este campo es requerido!"),
  description: z
    .string()
    .nonempty("Este campo es requerido!"),
  code: z
    .string()
    .nonempty("Este campo es requerido!")
    .min(2, "El codigo debe tener al menos 2 caracteres!"),
  levelOrder: z
    .number()
    .int()
    .positive("Debe ser mayor a 0")
    .min(1, "El orden debe ser mayor a 0"),
  campusBranchId: z
    .string()
});

export const gradoAcademicoSchema = z.object({
  id: z
    .string()
    .optional(),
  name: z
    .string()
    .nonempty("Este campo es requerido!"),
  maxCapacity: z
    .number()
    .int()
    .positive("Debe ser mayor a 0")
    .min(1, "La capacidad debe ser mayor a 0")
    .max(30, "La capacidad maxima debe ser de 30"),
  code: z
    .string()
    .nonempty("Este campo es requerido!")
    .min(2, "El codigo debe tener al menos 2 caracteres!"),
  description: z
    .string()
    .nonempty("Este campo es requerido!"),
  gradeOrder: z
    .number()
    .int()
    .positive("Debe ser mayor a 0")
    .min(1, "El orden debe ser mayor a 0"),
  valorString: z
    .string()
    .nonempty("Este campo es requerido!")
    .optional(),
  academicLevelId: z
    .string()
});