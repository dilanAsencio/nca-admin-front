import { apiProxy } from "@/helpers/api-proxy";
import { Response } from "@/app/core/interfaces/api-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const ConceptsTypesService = {

  /**
   * Retrieves a list of payment concept types.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getPaymentConceptTypes: async (
  ): Promise<Response<any>> => {
    try {
        const endpoint = `payment-purpose`;
        const response = await apiProxy("GET", endpoint, undefined, undefined, undefined, "payments");
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener las solicitudes" };
    }
  },

};
