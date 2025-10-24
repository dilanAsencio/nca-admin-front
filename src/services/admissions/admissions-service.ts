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
    
  

  /**
   * Updates an existing admission process.
   * @param {string} admissionProcessId - The ID of the admission process to update.
   * @param {any} data - The data of the admission process to update.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the update fails.
   */
  updateAdmissionProcess: async (
    admissionProcessId: string,
    data: any,
  ): Promise<any> => 
    apiProxy("PUT", `admin/admission-processes/${admissionProcessId}`, undefined, data),


  /**
   * Retrieves a list of academic grades for a given level, filtered by pagination data.
   * @param levelId - The ID of the level to retrieve the grades for.
   * @param paginate - The pagination data to use when retrieving the grades.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getAdmissionsProcess: async (
    paginate?: PaginateIMPL,
  ): Promise<any> => {
    try {
        const resp = await apiProxy("GET", `admin/admission-processes`, paginate)
        return resp;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }    
  },
    
  /**
   * Retrieves an admission process given its ID.
   * @param admissionProcessId - The ID of the admission process to retrieve.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getAdmissionsProcessById: async (
    admissionProcessId: string,
  ): Promise<any> => 
    apiProxy("GET", `admin/admission-processes/${admissionProcessId}`),
};
