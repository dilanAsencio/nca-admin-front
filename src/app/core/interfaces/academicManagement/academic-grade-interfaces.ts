import { AcademicStatus } from "../../enums/academic-enums";   

export interface AcademicGradeForm {
  academicLevelId: string;
  name: string;
  description: string;
  code: string;
  gradeOrder: number;
  maxCapacity: number;
  valor: number;
  valorString?: string;
  customFields?: {
      [key: string]: Record<string, any>;
  };
}

export interface AcademicGradeResponse extends AcademicGradeForm {
  id?: string;
  status?: AcademicStatus;
  enrollmentOpen?: boolean;
  valid?: boolean;
  sanitizedName?: string;
  sanitizedDescription?: string;
  sanitizedCode?: string;
  defaultMaxCapacity?: number;
  defaultStatus?: AcademicStatus;
  defaultEnrollmentOpen?: boolean;
}
