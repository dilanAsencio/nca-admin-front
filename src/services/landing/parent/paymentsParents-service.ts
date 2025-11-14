import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";
import { PaymentConfig } from "@/app/payments/concepts/core/interfaces/paymentsConcepts-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const PaymentsParentsService = {
   
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
  getPayments: async (
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
        const endpoint = `${API_V}/parent/payment-concepts${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
        }`;
        const response = await apiProxy("GET", endpoint, paginate);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener las solicitudes" };
    }
  },

  /**
   * Submits a payment for a given payment concept ID.
   * @param paymentConceptId - The ID of the payment concept to submit.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the submission fails.
   */
  submitPayment: async (
    paymentConceptId: string,
  ): Promise<Response<any>> => {
    try {
        const response = await apiProxy("PATCH", `${API_V}/parent/payment-concepts/${paymentConceptId}`);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },
};
