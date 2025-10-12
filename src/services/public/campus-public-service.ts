import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, ResponseApiPublic } from "@/app/core/interfaces/api-interfaces";
import { BranchResponse, CampusDetailBackend } from "@/app/core/interfaces/public/campus-interfaces";

export const CampusPublicService = {  
  
  /**
   * Retrieves a list of campuses from the database, filtered by pagination data.
   * @param {PaginateIMPL} [paginate] - The pagination data to use when retrieving the campuses.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getCampus: async (
    paginate?: PaginateIMPL,
  ): Promise<ResponseApiPublic<any>> => 
    apiProxy("GET", `/public/tenants-with-campuses`, paginate),

    
  /**
   * Retrieves a campus from the database, given its ID.
   * @param campusId - The ID of the campus to retrieve.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getCampusById: async (
    tenantId: string,
  ): Promise<CampusDetailBackend> => 
    apiProxy("GET", `/public/tenants/${tenantId}`, undefined),

  
  getBranchesCampus: async (
    tenantId: string,
    campusId: string,
  ): Promise<BranchResponse[]> => 
    apiProxy("GET", `/public/tenants/${tenantId}/campus/${campusId}/branches`, undefined),
};
