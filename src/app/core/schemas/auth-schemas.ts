import { z } from "zod";

// Esquema para login
export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Este campo es requerido!"),
  password: z
    .string()
    .nonempty("Este campo es requerido!") // Mensaje para campo vacío
    .min(8, "Debe tener mínimo 8 caracteres!"),
});

// Esquema para cambio de contraseña
export const changePasswordSchema = z.object({
  password: z.string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z][a-z]/, "Debe incluir una mayúscula")
    .regex(/\d/, "Debe incluir un número")
    .regex(/[!@#$%&*.,+\-:;]/, "Debe incluir un caracter especial"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

// Esquema para recuperación de contraseña (email)
export const forgotPasswordSchema = z.object({
  email: z.string()
  .min(8, "El email o usuario es requerido"),
});

// Esquema para reset de contraseña
export const resetPasswordSchema = z.object({
  username: z.string().optional(),
  currentPassword: z.string()
  .min(8, "Debe colocar la contraseña temporal suministrada"),
  password: z.string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z][a-z]/, "Debe incluir una mayúscula")
    .regex(/\d/, "Debe incluir un número")
    .regex(/[!@#$%&*.,+\-:;]/, "Debe incluir un caracter especial"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});