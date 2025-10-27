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


export const NewApplicationSchema = z.object({
  admissionProcessId: z
    .string()
    .uuid("El ID del proceso de admisión debe ser un UUID válido."),
  campusId: z
    .string()
    .uuid("El ID del campus debe ser un UUID válido."),
  gradeId: z
    .string()
    .uuid("El ID del grado debe ser un UUID válido."),
  aspirantFirstName: z
    .string()
    .nonempty("El nombre del aspirante es requerido."),
  aspirantLastName: z
    .string()
    .nonempty("El apellido del aspirante es requerido."),
  aspirantDateOfBirth: z
    .string()
    .nonempty("La fecha de nacimiento es requerida."),
  yearRequested: z
    .number({ required_error: "El año solicitado es requerido." }),
  comments: z
    .string()
    .max(600, "El comentario no puede exceder los 600 caracteres."),
});

export const AdmissionApplicationSchema = z.object({
  aspirant: z.object({
    firstName: z.string().nonempty("El nombre es requerido"),
    lastName: z.string().nonempty("El apellido es requerido"),
    documentType: z.string().nonempty("El tipo de documento es requerido"),
    documentNumber: z.string().nonempty("El número de documento es requerido"),
    dateOfBirth: z
      .string()
      .nonempty("La fecha de nacimiento es requerida"),
    gender: z.string().nonempty("El campo genero es requerido"),
  }),

  parent: z.object({
    firstName: z.string().nonempty("El nombre del acudiente es requerido"),
    lastName: z.string().nonempty("El apellido del acudiente es requerido"),
    relationship: z.string().nonempty("El parentesco es requerido"),
    documentType: z.string().nonempty("El tipo de documento es requerido"),
    documentNumber: z.string().nonempty("El número de documento es requerido"),
    phone: z.string().nonempty("El teléfono es requerido"),
    email: z
      .string()
      .email("Correo electrónico inválido")
      .nonempty("El correo electrónico es requerido"),
    address: z.object({
      street: z.string().nonempty("La dirección es requerida"),
      neighborhood: z.string().nonempty("El barrio es requerido"),
      city: z.string().nonempty("La ciudad es requerida"),
      department: z.string().nonempty("El departamento es requerido"),
      postalCode: z.string().nonempty("El código postal es requerido"),
    }),
  }),

  emergencyContact: z.object({
    fullName: z.string().nonempty("El nombre del contacto es requerido"),
    relationship: z.string().nonempty("El parentesco es requerido"),
    phone: z.string().nonempty("El teléfono es requerido"),
  }),

  specialConditions: z.string().optional(),
  howDidYouKnow: z.string().optional(),
  observations: z.string().optional(),

  saveAsDraft: z.boolean().default(false),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debe aceptar los términos y condiciones",
    }),
  acceptDataProcessing: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debe aceptar el tratamiento de datos personales",
    }),
});
