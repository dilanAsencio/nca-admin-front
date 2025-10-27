import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const DocumentsTypeService = {

  /**
   * Retrieves all documents from the database.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getAllDocuments: async (
  ): Promise<any> => {
    try {
      const resp = await apiProxy("GET", `admin/documents`);
      return resp;    
    } catch (error) {
      throw { success: false, error: error || "Error al obtener la solicitud" };
    }    
  },
};
