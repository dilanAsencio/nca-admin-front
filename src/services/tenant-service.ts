import { apiProxy } from "@/helpers/api-proxy";
import { Response } from "@/app/core/interfaces/api-interfaces";

export const TenantService = {
    
  /**
   * Retrieves a tenant by its ID.
   * @param tenantId - The ID of the tenant to retrieve.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getTenantById: async (
    tenantId: string,
  ): Promise<Response<any>> => {
    try {
      const response = await apiProxy("GET", `/public/tenants/${tenantId}`);
      return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener las solicitudes" };
    }
  },
};
