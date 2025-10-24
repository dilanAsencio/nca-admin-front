export interface NewApplication {
  admissionProcessId: string;
  campusId: string;
  gradeId: string;
  aspirantFirstName: string;
  aspirantLastName: string;
  aspirantDateOfBirth: string;
  yearRequested: number;
  comments: string;
}

export interface AdmissionApplication {
  aspirant: {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    dateOfBirth: string;
    gender: "MALE" | "FEMALE" | "OTHER";
  };
  parent: {
    firstName: string;
    lastName: string;
    relationship: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    email: string;
    address: {
      street: string;
      neighborhood: string;
      city: string;
      department: string;
      postalCode: string;
    };
  };
  emergencyContact: {
    fullName: string;
    relationship: string;
    phone: string;
  };
  specialConditions?: string;
  howDidYouKnow?: string;
  observations?: string;
  saveAsDraft: boolean;
  acceptTerms: boolean;
  acceptDataProcessing: boolean;
}

