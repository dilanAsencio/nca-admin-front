import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";

interface ApplicationsFilter {
    campusId?: string;
    gradeId?: string;
    status?: string;
}

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";


export const RegistrationsService = {
   
  /**
   * Retrieves a list of payment concepts for a given academic year, filtered by isActive and isVigente,
   * and paginated by pagination data.
   * @param academicYear - The academic year to filter the payment concepts by.
   * @param isActive - Whether to filter by active payment concepts.
   * @param isVigente - Whether to filter by payment concepts with a date of expiration.
   * @param paginate - The pagination data to use when retrieving the payment concepts.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getPaymentConcept: async (
    academicYear: number,
    isActive: boolean,
    isVigente: boolean,
    paginate: PaginateIMPL,
  ): Promise<Response<any>> => {
    try {
        const queryParams = new URLSearchParams();

        if (academicYear) queryParams.append("academicYear", academicYear.toString());
        if (isActive) queryParams.append("isActive", isActive.valueOf().toString());
        if (isVigente) queryParams.append("isVigente", isVigente.valueOf().toString());

        // Construye el endpoint final
        const endpoint = `${API_V}/admin/payment-concepts${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;
        const response = await apiProxy("GET", endpoint, paginate);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener las solicitudes" };
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
};
