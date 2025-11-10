import { z } from "zod";


export const PreResgisterSchema = z.object({

    username: z
        .string()
        .min(5, "El nombre de usuario debe tener al menos 5 caracteres")
        .nonempty("Este campo es requerido!"),
    firstName: z
        .string()
        .min(5, "El nombre debe tener al menos 5 caracteres")
        .nonempty("Este campo es requerido!"),
    lastName: z
        .string()
        .min(5, "El apellido debe tener al menos 5 caracteres")
        .nonempty("Este campo es requerido!"),
    email: z
        .string()
        .nonempty("Este campo es requerido!")
        .email("Correo electrónico inválido"),
    phone: z
        .string()
        .min(7, "El teléfono debe tener 7 digitos")
        .max(10, "El teléfono debe tener 10 digitos")
        .nonempty("Este campo es requerido!"),
    acceptedPolicy: z.boolean().refine((val) => val === true, {
        message: "Debe aceptar la política de privacidad",
    }),
});
export type PreRegisterType = z.infer<typeof PreResgisterSchema>;