import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const StudentsService = {
  /**
   * Retrieves a list of students for a given grade and campus, filtered by pagination data.
   * @param gradeId - The ID of the grade to retrieve the students for.
   * @param campusId - The ID of the campus to retrieve the students for.
   * @param paginate - The pagination data to use when retrieving the students.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getStudents: async (
    gradeId: string | null,
    campusId: string | null,
    paginate: PaginateIMPL
  ): Promise<Response<any>> => {
    try {
      const queryParams = new URLSearchParams();
      if (campusId)
        queryParams.append("campusId", campusId.valueOf().toString());
      if (gradeId) queryParams.append("gradeId", gradeId.valueOf().toString());

      // Construye el endpoint final
      const endpoint = `${API_V}/admin/students${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;
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
   * @param studentId - The ID of the student to retrieve.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getStudentById: async (
    studentId: string
  ): Promise<Response<any>> => {
    try {
      const endpoint = `${API_V}/admin/students/${studentId}`;
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
