import { z } from "zod";

export const PaymentAmountSchema = z.object({
  gradeId: z
    .string()
    .uuid("El ID del grado debe tener formato UUID válido"),
  amount: z
    .number({ required_error: "El valor es requerido" })
    .positive("El valor debe ser mayor a 0"),
  currency: z
    .string()
    .min(1, "La moneda es requerida")
    .max(3, "El código de moneda debe tener máximo 3 caracteres"),
});

export const PaymentProcessSchema = z.object({
  name: z
    .string()
    .nonempty("El nombre es requerido"),
  academicYear: z
    .number({ required_error: "El año académico es requerido" })
    .min(2000, "El año académico no puede ser menor a 2000")
    .max(2100, "El año académico no puede ser mayor a 2100"),
  paymentPurposeId: z
    .string()
    .uuid("El ID de propósito de pago debe tener formato UUID válido"),
  paymentFrom: z
    .string()
    .nonempty("La fecha de inicio de pago es requerida")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  paymentUntil: z
    .string()
    .nonempty("La fecha de fin de pago es requerida")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  amounts: z
    .array(PaymentAmountSchema)
    .nonempty("Debe existir al menos un monto asociado"),
  active: z.boolean({
    required_error: "El estado activo es requerido",
  }),
});

export type PaymentProcessType = z.infer<typeof PaymentProcessSchema>;
