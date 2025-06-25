import { z } from "zod";

export const nivelAcademicoShema = z.object({
  name_nivel: z
    .string()
    .nonempty("Este campo es requerido!"),
  periodo: z
    .string()
    .date("Formato de fecha inválido")
    .nonempty("Este campo es requerido!"),
  sede: z
    .string()
    .nonempty("Este campo es requerido!"),
  valor_nivel: z
    .string()
    .min(1, "El valor debe ser mayor a 0"),
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