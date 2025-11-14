import { z } from "zod";

export const PaymentConfigSchema = z.object({
  name: z
    .string()
    .nonempty("Este campo es requerido!")
    .min(1, "El nombre es obligatorio.")
    .max(200, "El nombre no puede exceder los 200 caracteres."),
  academicYear: z
    .number()
    .int()
    .gte(new Date().getFullYear(), "El año académico debe ser mayor o igual al año actual."),
  paymentPurposeId: z
    .string({ required_error: "Este campo es requerido!" })
    .uuid("El ID del propósito de pago debe ser un UUID válido."),
  paymentFrom: z
    .string({ required_error: "Este campo es requerido!" })
    .nonempty("Este campo es requerido!"),
  paymentUntil: z
    .string({ required_error: "Este campo es requerido!" })
    .nonempty("Este campo es requerido!"),
  gradeId: z
    .string({ required_error: "Este campo es obligatorio para seleccionar el grado!" })
    .nonempty("Se debe seleccionar al menos una sede!")
    .uuid("El ID del grado debe ser un UUID válido."),
  campusBranchId: z
    .string({ required_error: "Este campo es obligatorio para seleccionar el colegio!" })
    .nonempty("Se debe seleccionar al menos un colegio!")
    .uuid("El ID del grado debe ser un UUID válido."),
  campusId: z
    .string({ required_error: "Este campo es obligatorio para seleccionar la sede!" })
    .nonempty("Este campo es obligatorio para seleccionar la sede!")
    .uuid("El ID del grado debe ser un UUID válido."),
  amount: z
    .string({ required_error: "Este campo es requerido!" })
    // .regex(/^\$?\s?\d{1,3}(\.\d{3})*$/, "El valor debe ser un número válido con hasta dos decimales")sssssssssssssssssssssssss
    .nonempty("Este campo es requerido!"),
  currency: z.enum(["COP", "USD", "EUR"], {
    errorMap: () => ({ message: "Moneda inválida. Use COP, USD o EUR." }),
  }),
  active: z.boolean().default(true),
});
export type PaymentConfigType = z.infer<typeof PaymentConfigSchema>;
