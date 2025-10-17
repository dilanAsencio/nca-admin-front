import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";
import { AcademicGradeForm, AcademicGradeResponse } from "@/app/core/interfaces/academicManagement/academic-grade-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const AdmissionsServices = {

  /**
   * Creates a new academic grade.
   * @param data - The data of the grade to be created.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the creation fails.
   */
  createAdmissionProcess: async (
    data: any
  ): Promise<any> => 
    apiProxy("POST", `admin/admission-processes`, undefined, data),
    
  

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
  getAdmissionsProcess: async (
    paginate?: PaginateIMPL,
  ): Promise<any> => 
    apiProxy("GET", `admin/admission-processes`, paginate),

    
  /**
   * Retrieves a list of academic grades for a given campus.
   * @param campusId - The ID of the campus to retrieve the grades for.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getGradesByCampus: async (
    campusId: string,
  ): Promise<any> => 
    apiProxy("GET", `admissions/campuses/${campusId}/grades`),
  
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
