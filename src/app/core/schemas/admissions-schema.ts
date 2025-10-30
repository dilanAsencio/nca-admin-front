import { z } from "zod";

export const AdmissionProcessSchema = z.object({
  admissionProcessId: z.string().optional(),
  name: z
    .string()
    .nonempty("Este campo es requerido!"),
  description: z
    .string()
    .nonempty("Este campo es requerido!"),
  academicYear: z
    .preprocess((val) => (
      val === "" || isNaN(val as number) ? undefined : Number(val)
    ), z
    .number({ required_error: "Este campo es requerido!"})
    .min(new Date().getFullYear() - 1, "El año academico debe ser mayor o igual al año actual")
    ),
  startDate: z
    .string()
    .nonempty("Este campo es requerido!"),
  endDate: z
    .string()
    .nonempty("Este campo es requerido!"),
  campuses: z
    .array(z.string())
    .nonempty("Este campo es requerido!"),
  grades: z
    .array(z.string())
    .nonempty("Este campo es requerido!"),
  requiredDocuments: z
    .array(
      z.object({
        name: z.string().nonempty("Este campo es requerido!"),
        description: z.string().nonempty("Este campo es requerido!"),
        documentType: z.string().nonempty("Este campo es requerido!"),
        allowedFormats: z.array(z.string()).nonempty("Este campo es requerido!"),
        maxSizeMB: z.
            preprocess((val) => (
                val === "" || isNaN(val as number) ? undefined : Number(val)
            ), z
                .number({ required_error: "Este campo es requerido!"})
                .min(1, "El tamaño debe ser mayor a 0")
        ),
        required: z.boolean({ required_error: "Este campo es requerido!" }),
      })
    )
    .nonempty("Este campo es requerido!"),
  requiresInterview: z
    .boolean(),
  requiresEvaluation: z
    .boolean(),
  maxApplications: z
    .preprocess((val) => (
      val === "" || isNaN(val as number) ? undefined : Number(val)
    ), z
    .number({ required_error: "Este campo es requerido!"})
    .min(1, "El número de postulaciones debe ser mayor a 0")
    ),
  notifyOnNewApplication: z
    .boolean(),
  notifyOnDocumentUpload: z
    .boolean(),
  notifyOnStatusChange: z
    .boolean(),
});
