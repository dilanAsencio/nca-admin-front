import { CalendarType, Gender } from "../../enums/academic-enums";

export interface CampusForm {
    id?: string;
    code: string;
    name: string;
    address: string;
    description: string;
    gender: Gender;
    languages: string[];
    religion: string;
    mission: string;
    vision: string;
    legal_name: string;
    max_students: number;
    foundation_year: number;
    calendar_type: CalendarType;
    logo_url?: string;
    custom_fields?: {
        [key: string]: Record<string, any>;
    };
}
export interface CampusResponse extends CampusForm {
  is_active?: boolean;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
  current_students?: number | null;
  enrollment_percentage?: number;
  branch_names?: string[];
}