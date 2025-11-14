export interface PaymentConfig {
  name: string;
  academicYear: number;
  paymentPurposeId: string;
  paymentFrom: string;
  paymentUntil: string;
  amounts: amounts[];
  active: boolean;
}

interface amounts {
  gradeId: string;
  amount: number;
  currency: string;
};