import { z } from "zod";

export const nivelAcademicoShema = z.object({
  name: z
    .string()
    .nonempty("Este campo es requerido!"),
  periodoAcademico: z
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
    .string()
    .regex(/^\d+$/, "El orden debe ser un número válido")
    .min(1, "El orden debe ser mayor a 0"),
  campusBranchId: z
    .string()
});

export const gradoAcademicoShema = z.object({
  name_grado: z
    .string()
    .nonempty("Este campo es requerido!"),
  capacidad: z
    .number()
    .min(0, "La capacidad debe ser mayor o igual a 0"),
  valor_grado: z
    .string()
    .min(1, "El valor debe ser mayor a 0"),
});