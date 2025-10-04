export interface AcademicLevel {
  campusBranchId: string;
  name: string;
  description?: string;
  code?: string;
  levelOrder?: number;
  status?: string,
  valid?: boolean
}

export interface AcademicGrade {
  academicLevelId: string;
  name: string;
  description?: string;
  code?: string;
  gradeOrder?: number;
  maxCapacity?: number;
  status?: string;
  enrollmentOpen?: boolean;
  defaultMaxCapacity?: number;
  defaultEnrollmentOpen?: boolean;
  defaultStatus?: string;
  valid?: boolean;
}

export interface BranchesType {
  id?: string;
  name: string;
  campus_id: string;
  title?: string;
  display?: boolean;
  department: string;
  city: string;
  neighborhood: string;
  photos: string[];
  full_address?: string;
  street_type: string;
  street_name: string;
  number_primary: string;
  complement_primary: string;
  number_secondary: string;
  complement_secondary: string;
  has_green_zones: boolean;
  has_laboratory: boolean;
  has_sports_zones: boolean;
  academic_grade_count?: number;
  academic_level_count?: number;
  campus_info: CampusInfo;
}

interface CampusInfo {
  code: string;
  id: string;
  logo_url: string;
  name: string;
}

export interface Campus {
  code: string;
  name: string;
  address: string;
  description: string;
  gender: 'male' | 'female' | 'mixed';
  languages: string[];
  religion: string;
  mission: string;
  vision: string;
  legal_name: string;
  max_students: number;
  foundation_year: number;
  calendar_type: 'A' | 'B' | 'Flexible';
  logo_url?: string;
  custom_fields?: {
    [key: string]: Record<string, any>;
  };
}
export interface SchoolResponse {
  id: string;
  code: string;
  name: string;
  address: string | null;
  description: string | null;
  gender: string | null;
  languages: string[] | null;
  religion: string | null;
  mission: string | null;
  vision: string | null;
  status: "LOW_ENROLLMENT" | string;
  tenant_id: string;
  legal_name: string | null;
  max_students: number;
  branch_count: number;
  foundation_year: number | null;
  calendar_type: string | null;
  logo_url: string | null;
  custom_fields: Record<string, unknown> | null;
  is_active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  current_students: number | null;
  enrollment_percentage: number;
  branch_names: string[];
}
