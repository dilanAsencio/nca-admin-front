import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";
import { PaymentConfig } from "@/app/payments/concepts/core/interfaces/paymentsConcepts-interfaces";

interface ApplicationsFilter {
    campusId?: string;
    gradeId?: string;
    status?: string;
}

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";


export const PaymentsConceptsService = {
   
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
    isActive: boolean | null,
    isVigente: boolean | null,
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
   * Retrieves a payment concept by its ID.
   * @param paymentConceptId - The ID of the payment concept to retrieve.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getPaymentConceptById: async (
    paymentConceptId: string, 
  ): Promise<Response<any>> => {
    try {
        const endpoint = `${API_V}/admin/payment-concepts/${paymentConceptId}`;
        const response = await apiProxy("GET", endpoint);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener las solicitudes" };
    }
  },

  
/**
 * Updates the status of a payment concept.
 * @param paymentConceptId - The ID of the payment concept to update the status for.
 * @param status - The new status of the payment concept, either "ACTIVE" or "INACTIVE".
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the update fails.
 */
  updatePaymentConceptStatus: async (
    paymentConceptId: string,
    status: "ACTIVE" | "INACTIVE",
  ): Promise<Response<any>> => {
    try {
        const data = { status };
        const endpoint = `${API_V}/admin/payment-concepts/${paymentConceptId}/status/${status}`;
        const response = await apiProxy("PATCH", endpoint, undefined, data);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener las solicitudes" };
    }
  },

  
/**
 * Creates a new payment concept.
 * @param {PaymentConfig} data - The data of the payment concept to create.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the creation fails.
 */
  createPaymentConcept: async (
    data: PaymentConfig,
  ): Promise<Response<any>> => {
    try {
        const response = await apiProxy("POST", `${API_V}/admin/payment-concepts`, undefined, data);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },
  
  /**
   * Updates a payment concept.
   * @param {PaymentConfig} data - The data of the payment concept to update.
   * @param {string} paymentConceptId - The ID of the payment concept to update.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the update fails.
   */
  updatePaymentConcept: async (
    data: PaymentConfig,
    paymentConceptId: string
  ): Promise<Response<any>> => {
    try {
        const response = await apiProxy("PUT", `${API_V}/admin/payment-concepts/${paymentConceptId}`, undefined, data);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },
};
