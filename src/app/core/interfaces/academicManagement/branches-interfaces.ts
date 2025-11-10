import { CalendarType } from "../../enums/academic-enums";

interface CampusInfo {
  code: string;
  id: string;
  logo_url: string;
  name: string;
}

export interface BranchesForm {
  id?: string;
  name: string;
  title?: string;
  department: string;
  city: string;
  neighborhood: string;
  calendar_type: 'SEMESTER' | 'TRIMESTER' | 'BIMESTER';
  latitude: number;
  longitude: number;
  photos: string[];
  street_type: string;
  street_name: string | null;
  number_primary: string;
  complement_primary: string;
  number_secondary: string;
  complement_secondary: string;
  has_green_zones: boolean;
  has_laboratory: boolean;
  has_sports_zones: boolean;
}

export interface BranchesResponse extends BranchesForm {
    is_active?: boolean;
    campus_id: string;
    full_address?: string;
    features?: string[];
    photo_count?: string;
    campus_info?: CampusInfo;
    has_academic_levels?: boolean;
    has_academic_grades?: boolean;
    academic_level_count?: number;
    academic_grade_count?: number;
    created_at?: string;
    updated_at?: string;
}