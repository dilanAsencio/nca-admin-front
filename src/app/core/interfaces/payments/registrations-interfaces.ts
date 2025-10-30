export interface RegistrationProcess {
  name: string;
  academicYear: number;
  paymentPurposeId: string;
  paymentFrom: string; 
  paymentUntil: string; 
  amounts: PaymentAmount[];
  active: boolean;
}

export interface PaymentAmount {
  gradeId: string;
  amount: number;
  currency: string;
}
