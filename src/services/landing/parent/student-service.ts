import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const StudentsParentService = {
  /**
   * Retrieves a list of students for a given parent, filtered by pagination data.
   * @param {PaginateIMPL} [paginate] - The pagination data to use when retrieving the students.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getStudents: async (paginate: PaginateIMPL): Promise<Response<any>> => {
    try {
      const endpoint = `${API_V}/parent/students`;
      const response = await apiProxy("GET", endpoint, paginate);
      return response;
    } catch (error) {
      throw {
        success: false,
        error: error || "Error al obtener las solicitudes",
      };
    }
  },

  /**
   * Retrieves a student by ID.
   * @param {string} studentId - The ID of the student to retrieve.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getStudentById: async (studentId: string): Promise<Response<any>> => {
    try {
      const endpoint = `${API_V}/parent/students/${studentId}`;
      const response = await apiProxy("GET", endpoint);
      return response;
    } catch (error) {
      throw {
        success: false,
        error: error || "Error al obtener las solicitudes",
      };
    }
  },
};
