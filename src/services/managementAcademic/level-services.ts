import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";
import { AcademicLevelForm, AcademicLevelResponse } from "@/app/core/interfaces/academicManagement/academic-level-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const LevelService = {

  /**
   * Creates a new academic level.
   * @param data - The data of the level to be created.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the creation fails.
   */
  createLevel: async (
    data: AcademicLevelForm
  ): Promise<AcademicLevelResponse> => 
    apiProxy("POST", `${API_V}/academic-levels`, undefined, data),

    
  /**
   * Updates an existing academic level.
   * @param {AcademicLevelForm} data - The data of the level to be updated.
   * @param {string} levelId - The ID of the level to update.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the update fails.
   */
  updateLevel: async (
    data: AcademicLevelForm,
    levelId: string
  ): Promise<AcademicLevelResponse> => 
    apiProxy("PUT", `${API_V}/academic-levels/${levelId}`, undefined, data),
  
    
  /**
   * Retrieves a list of academic levels.
   * @param {PaginateIMPL} [paginate] - The pagination data to use when retrieving the levels.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getLevels: async (
    paginate?: PaginateIMPL
  ): Promise<Response<AcademicLevelResponse>> => 
    apiProxy("GET", `${API_V}/academic-levels`, paginate),
  

  /**
   * Retrieves a list of academic levels filtered by a campus branch ID.
   * @param brancheId - The ID of the campus branch to filter the levels by.
   * @param {PaginateIMPL} [paginate] - The pagination data to use when retrieving the levels.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getLevelsCampusBranch: async (
    brancheId: string,
    paginate?: PaginateIMPL
  ): Promise<Response<AcademicLevelResponse>> => 
    apiProxy("GET", `${API_V}/academic-levels/campus-branch/${brancheId}`, paginate),
  
  /**
   * Deletes an academic level given its ID.
   * @param levelId - The ID of the academic level to delete.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the deletion fails.
   */
  deleteLevel: async (
    levelId: string,
  ): Promise<Response> => 
    apiProxy("DELETE", `${API_V}/academic-levels/${levelId}`),
};
