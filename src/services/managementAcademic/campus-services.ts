import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";
import { CampusForm, CampusResponse } from "@/app/core/interfaces/campus-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const CampusService = {

  /**
   * Creates a new campus in the database.
   * @param data - The data of the campus to be created.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the creation fails.
   */
  createCampus: async (
    data: CampusForm
  ): Promise<CampusResponse> => 
    apiProxy("POST", `${API_V}/campus`, undefined, data),
  
  
  /**
   * Deletes a campus from the database, given its ID.
   * @param campusId - The ID of the campus to delete.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the deletion fails.
   */
  deleteCampus: async (
    campusId: string,
  ): Promise<Response> => 
    apiProxy("DELETE", `${API_V}/campus/${campusId}`),
  
  
  /**
   * Retrieves a list of campuses from the database, filtered by pagination data.
   * @param {PaginateIMPL} [paginate] - The pagination data to use when retrieving the campuses.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getCampus: async (
    paginate?: PaginateIMPL
  ): Promise<Response<CampusResponse>> => 
    apiProxy("GET", `${API_V}/campus`, paginate),
};
