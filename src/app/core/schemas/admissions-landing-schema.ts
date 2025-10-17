import { z } from "zod";

export const datosAspiranteSchema = z.object({
  name: z
    .string()
    .nonempty("Este campo es requerido!"),
  lastName: z
    .string()
    .nonempty("Este campo es requerido!"),
  typeDoc: z
    .string()
    .nonempty("Este campo es requerido!"),
  numberDoc: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/, "El documento no puede contener caracteres especiales, sólo letras y números")
    .nonempty("Este campo es requerido!"),
  birthDate: z
    .string()
    .date("Formato de fecha incorrecto")
    .nonempty("Este campo es requerido!"),
  description: z
    .string()
    .nonempty("Este campo es requerido!"),
  gender: z
    .string()
    .nonempty("Este campo es requerido!"),
  applyGradeId: z
    .string()
    .nonempty("Este campo es requerido!"),
  applyBranchId: z
    .string()
    .nonempty("Este campo es requerido!"),
  yearEntry: z
    .string()
    .nonempty("Este campo es requerido!"),
});
