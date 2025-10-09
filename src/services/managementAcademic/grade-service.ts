import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";
import { AcademicGradeForm, AcademicGradeResponse } from "@/app/core/interfaces/academicManagement/academic-grade-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const GradeService = {

  /**
   * Creates a new academic grade.
   * @param data - The data of the grade to be created.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the creation fails.
   */
  createGrade: async (
    data: AcademicGradeForm
  ): Promise<AcademicGradeResponse> => 
    apiProxy("POST", `${API_V}/academic-grades`, undefined, data),
    
  

  updateGrade: async (
    data: AcademicGradeForm,
    gradeId: string
  ): Promise<AcademicGradeResponse> => 
    apiProxy("PUT", `${API_V}/academic-grades/${gradeId}`, undefined, data),


  /**
   * Retrieves a list of academic grades for a given level, filtered by pagination data.
   * @param levelId - The ID of the level to retrieve the grades for.
   * @param paginate - The pagination data to use when retrieving the grades.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getGradesByLevel: async (
    levelId: string,
    paginate?: PaginateIMPL,
  ): Promise<Response<AcademicGradeResponse>> => 
    apiProxy("GET", `${API_V}/academic-grades/level/${levelId}`, paginate),
  
  /**
   * Deletes an academic grade given its ID.
   * @param gradeId - The ID of the academic grade to delete.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the deletion fails.
   */
  deleteGrade: async (
    gradeId: string,
  ): Promise<Response> => 
    apiProxy("DELETE", `${API_V}/academic-grades/${gradeId}`),
};
