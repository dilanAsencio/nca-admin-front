"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdmissionApplication } from "@/app/core/interfaces/public/admissions-interfaces";
import { AdmissionApplicationSchema } from "@/app/core/schemas/admissions-landing-schema";

export const useAdmissionApplicationForm = () => {
  const methods = useForm<AdmissionApplication>({
    resolver: zodResolver(AdmissionApplicationSchema),
    mode: "onChange",
    defaultValues: {
      aspirant: {
        firstName: "",
        lastName: "",
        documentType: "",
        documentNumber: "",
        dateOfBirth: "",
        gender: "MALE",
      },
      parent: {
        firstName: "",
        lastName: "",
        relationship: "",
        documentType: "",
        documentNumber: "",
        phone: "",
        email: "",
        address: {
          street: "",
          neighborhood: "",
          city: "",
          department: "",
          postalCode: "",
        },
      },
      emergencyContact: {
        fullName: "",
        relationship: "",
        phone: "",
      },
      specialConditions: "",
      howDidYouKnow: "",
      observations: "",
      saveAsDraft: false,
      acceptTerms: false,
      acceptDataProcessing: false,
    },
  });

  return methods;
};
