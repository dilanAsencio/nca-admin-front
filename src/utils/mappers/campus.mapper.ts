import { CampusDetail, CampusDetailBackend } from "@/app/core/interfaces/public/campus-interfaces";

/**
 * Convierte un objeto recibido desde el backend (snake_case)
 * a un objeto tipado para el frontend (camelCase).
 */
export function mapCampusDetail(data: CampusDetailBackend): CampusDetail {
  return {
    primaryContactInfo: data.primaryContactInfo,
    id: data.id,
    subdomain: data.subdomain,
    systemName: data.system_name,
    displayName: data.display_name,
    galleryImages: data.gallery_images,
    fullLocation: data.full_location,
    planType: data.plan_type,
    isFeatured: data.is_featured,
    status: data.status,
    lastUpdated: data.last_updated,
    profileCompleteness: data.profile_completeness,
  };
}
