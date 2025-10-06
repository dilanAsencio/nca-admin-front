import { AcademicStatus } from "../../enums/academic-enums";

export interface AcademicLevelForm {
  campusBranchId: string;
  name: string;
  description: string;
  code: string;
  levelOrder: number;
  periodoAcademico?: string;
  customFields?: {
      [key: string]: Record<string, any>;
  };
}

export interface AcademicLevelResponse extends AcademicLevelForm {
  id?: string;
  tenantId?: string;
  status?: AcademicStatus;
  valid?: boolean;
  sanitizedName?: string;
  sanitizedDescription?: string;
  sanitizedCode?: string;
  defaultStatus?: AcademicStatus;
  summary?: string;
  active?: boolean;
  displayName?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}
