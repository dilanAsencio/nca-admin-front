export interface Institution {
  effectiveName: string;
  profileCompleteness: number;
  featuredInstitution: boolean;
  publiclySearchable: boolean;
  recentlyUpdated: boolean;
  id: string;
  subdomain: string;
  system_name: string;
  display_name: string;
  description_excerpt: string;
  full_location: string;
  has_contact_info: boolean;
  plan_type: string;
  is_active: boolean;
  is_public_visible: boolean;
  is_featured: boolean;
  featured_order: number;
  relevance_score: number;
  search_name: string;
  last_updated: string;
  updated_time_ago: string;
  public_url: string;
  admission_url: string;
  tenantId?: string;
}

export interface CampusDetailBackend {
  primaryContactInfo: string;
  id: string;
  subdomain: string;
  system_name: string;
  display_name: string;
  gallery_images: string[];
  full_location: string;
  plan_type: string;
  is_featured: boolean;
  status: string;
  last_updated: string;
  profile_completeness: number;
}
export interface CampusDetail {
  primaryContactInfo: string;
  id: string;
  subdomain: string;
  systemName: string;
  displayName: string;
  galleryImages: string[];
  fullLocation: string;
  planType: string;
  isFeatured: boolean;
  status: string;
  lastUpdated: string;
  profileCompleteness: number;
}
export interface CampusInfo {
  id: string;
  code: string;
  name: string;
  logoUrl: string | null;
}

export interface BranchResponse {
  id: string;
  name: string;
  code: string;
  phone: string | null;
  email: string | null;
  address: string;
  city: string;
  department: string;
  latitude: number | null;
  longitude: number | null;
  main: boolean;
  isActive: boolean;
  campusId: string;
  streetType: string;
  streetName: string;
  numberPrimary: string;
  complementPrimary: string;
  numberSecondary: string;
  complementSecondary: string;
  neighborhood: string;
  photos: string[];
  hasGreenZones: boolean;
  hasLaboratory: boolean;
  hasSportsZones: boolean;
  fullAddress: string;
  photoCount: number;
  features: string[];
  hasAcademicLevels: boolean;
  hasAcademicGrades: boolean;
  academicLevelCount: number;
  academicGradeCount: number;
  campusInfo: CampusInfo;
}
