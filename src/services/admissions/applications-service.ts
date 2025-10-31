import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";

interface ApplicationsFilter {
    campusBrancheId?: string;
    gradeId?: string;
    status?: string;
}


export const ApplicationsService = {
    
/**
 * Retrieves a list of admissions applications for a given filter and pagination data.
 * @param filter - An object containing the filter data (campusId, status, gradeId)
 * @param paginate - The pagination data to use when retrieving the applications
 * @returns A Promise with a Response object containing the response data
 * @throws { success: false, error: string } - If the retrieval fails
 */
  getAdmissionsApplications: async (
    paginate: PaginateIMPL,
    filter: ApplicationsFilter,
  ): Promise<Response<any>> => {
    try {
        const basePath = `admin/admission-applications?${
            filter.campusBrancheId ? `campusBrancheId=${filter.campusBrancheId}&` : ""}${
            filter.gradeId ? `gradeId=${filter.gradeId}&` : ""}${
            filter.status ? `status=${filter.status}` : ""
            }`;
        const response = await apiProxy("GET", basePath, paginate);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener las solicitudes" };
    }
  },
  
/**
 * Retrieves an admission application given its ID.
 * @param applicationId - The ID of the admission application to retrieve.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the retrieval fails.
 */
  getAdmissionsApplicationsById: async (
    applicationId: string,
  ): Promise<Response<any>> => {
    try {
        const response = await apiProxy("GET", `admin/admission-applications/${applicationId}/detail`);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },

  
/**
 * Rejects an admission application.
 * @param applicationId - The ID of the admission application to reject.
 * @param data - An object containing the reason for rejecting the application, a comment and a flag indicating if an email should be sent to the applicant.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the rejection fails.
 */
  admissionApplicationReject: async (
    applicationId: string,
    data: {reason: string, comments: string, sendEmail: boolean},
  ): Promise<Response<any>> => {
    try {
        const response = await apiProxy("POST", `admin/admission-applications/${applicationId}/reject`, undefined, data);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },
  
/**
 * Adds a comment to an admission application.
 * @param applicationId - The ID of the admission application to add the comment to.
 * @param data - An object containing the comment to add.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the comment addition fails.
 */
  admissionApplicationComment: async (
    applicationId: string,
    data: {comment: string},
  ): Promise<Response<any>> => {
    try {
        const response = await apiProxy("POST", `admin/admission-applications/${applicationId}/comments`, undefined, data);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },
  
/**
 * Approves an admission application.
 * @param applicationId - The ID of the admission application to approve.
 * @param data - An object containing the comments to add to the application, a flag indicating if an email should be sent to the applicant and the next steps instructions.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the approval fails.
 */
  admissionApplicationApprove: async (
    applicationId: string,
    data: {comments: string, sendEmail: boolean, nextSteps: string},
  ): Promise<Response<any>> => {
    try {
        const response = await apiProxy("POST", `admin/admission-applications/${applicationId}/approve`, undefined, data);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },
};
