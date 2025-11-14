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

export interface PaymentConceptResponse {
  id: string;
  name: string;
  academicYear: number;
  paymentFrom: string;
  paymentUntil: string;
  statusId: string;
  statusName: string;
  paymentPurposeId: string;
  paymentPurposeName: string;
  amount: number;
  gradeId: string;
  gradeName: string;
  campusId: string;
  campusName: string;
  campusBranchId: string;
  campusBranchName: string;
  createdAt: string;
}
