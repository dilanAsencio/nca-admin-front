import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";
import { BranchesForm, BranchesResponse } from "@/app/core/interfaces/academicManagement/branches-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const BranchesService = {

  /**
   * Creates multiple branches at once given a campus ID and the branch data.
   * @param campusId - The ID of the campus to create the branches in.
   * @param data - The data of the branches to be created.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the creation fails.
   */
  createBranche: async (
    campusId: string,
    data: BranchesForm
  ): Promise<Response<BranchesResponse>> => 
    apiProxy("POST", `${API_V}/campus/${campusId}/branches`, undefined, data),


  /**
   * Retrieves a list of branches from the database.
   * @param {PaginateIMPL} [paginate] - The pagination data to use when retrieving the branches.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getBranches: async (
    paginate?: PaginateIMPL
  ): Promise<Response<BranchesResponse>> => 
    apiProxy("GET", `${API_V}/campus/branches`, paginate),


  /**
   * Retrieves a list of branches from the database, filtered by a campus ID.
   * @param idCampus - The ID of the campus to filter the branches by.
   * @param paginate - The pagination data to use when retrieving the branches.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getBranchesByCampus: async (
    idCampus: string,
    paginate?: PaginateIMPL,
  ): Promise<Response<BranchesResponse>> => 
    apiProxy("GET", `${API_V}/campus/${idCampus}/branches`, paginate),

    
  /**
   * Deletes a branch from the database, given its campus ID and branch ID.
   * @param campusId - The ID of the campus to delete the branch from.
   * @param brancheId - The ID of the branch to delete.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the deletion fails.
   */
  deleteBramchesByCampus: async (
    campusId: string,
    brancheId: string,
  ): Promise<Response> => 
    apiProxy("DELETE", `${API_V}/campus/${campusId}/branches/${brancheId}`),
};
