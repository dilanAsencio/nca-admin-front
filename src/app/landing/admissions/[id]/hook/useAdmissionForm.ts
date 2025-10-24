import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewApplicationSchema } from "@/app/core/schemas/admissions-landing-schema";
import { NewApplication } from "@/app/core/interfaces/public/admissions-interfaces";

/**
 * Hook personalizado para gestionar el formulario de admisión.
 * Integra Zod y React Hook Form con validaciones tipadas.
 */
export function useAdmissionForm(defaultValues?: Partial<NewApplication>) {
  return useForm<NewApplication>({
    resolver: zodResolver(NewApplicationSchema),
    mode: "onSubmit",
    defaultValues: {
      admissionProcessId: "",
      campusId: "",
      gradeId: "",
      aspirantFirstName: "",
      aspirantLastName: "",
      aspirantDateOfBirth: "",
      yearRequested: new Date().getFullYear(),
      comments: "",
      ...defaultValues,
    },
  });
}
