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
    .preprocess((val) => (
      val === "" || isNaN(val as number) ? undefined : Number(val)
    ), z
    .number({ required_error: "Este campo es requerido!"})
    .min(1, "El orden debe ser mayor a 0")
    ),
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
    .preprocess((val) => (
      val === "" || isNaN(val as number) ? undefined : Number(val)
    ), z
    .number({ required_error: "Este campo es requerido!"})
    .min(1, "El orden debe ser mayor a 0")
    ),
  code: z
    .string()
    .nonempty("Este campo es requerido!")
    .min(2, "El codigo debe tener al menos 2 caracteres!"),
  description: z
    .string()
    .nonempty("Este campo es requerido!"),
  gradeOrder: z
    .preprocess((val) => (
      val === "" || isNaN(val as number) ? undefined : Number(val)
    ), z
    .number({ required_error: "Este campo es requerido!"})
    .min(1, "El orden debe ser mayor a 0")
    ),
  valorString: z
    .string()
    .regex(/^\$?\s?\d{1,3}(\.\d{3})*$/, "El valor debe ser un número válido con hasta dos decimales")
    .nonempty("Este campo es requerido!")
    .optional(),
  academicLevelId: z
    .string({ required_error: "Este campo es requerido!"})
    .nonempty("Este campo es requerido!"),
});

export const BranchesFormSchema = z.object({

  name: z
    .string()
    .nonempty("Este campo es requerido!")
    .max(200, "El nombre no puede tener más de 200 caracteres"),


  department: z.string().nonempty("Este campo es requerido!"),
  city: z.string().nonempty("Este campo es requerido!"),
  neighborhood: z.string().nonempty("Este campo es requerido!"),

  calendar_type: z.enum(["SEMESTER", "TRIMESTER", "BIMESTER"], {
    errorMap: () => ({ message: "Tipo de calendario inválido" }),
  }),

  latitude: z.number({ required_error: "Este campo es requerido!"}),
  longitude: z.number({ required_error: "Este campo es requerido!"}),

  // fotos: permitimos array vacío, y aceptamos strings (podría validarse como URL si lo deseas)

  number_primary: z.string().nonempty("Este campo es requerido!"),
  street_type: z.string({ required_error: "Este campo es requerido!"}).nonempty("Este campo es requerido!"),
  street_name: z.string().nullable().default(""),
  complement_primary: z.string().nonempty("Este campo es requerido!"),
  number_secondary: z.string().nonempty("Este campo es requerido!"),
  complement_secondary: z.string().nonempty("Este campo es requerido!"),

  has_green_zones: z.boolean().default(false),
  has_laboratory: z.boolean().default(false),
  has_sports_zones: z.boolean().default(false),
  id: z.string().uuid().optional(),

  title: z.string().max(300).optional(),

  photos: z.array(z.string().nonempty()).default([]),
});

/**
 * Tipo TypeScript inferido desde el schema
 */
export type BranchesFormType = z.infer<typeof BranchesFormSchema>;
