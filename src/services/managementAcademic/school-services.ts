import axios from "@/libs/axios";
import { Response } from "@/types/auth";
import { Campus } from "@/types/forms-types";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const SchoolService = {
  async createCampus(campus: Campus): Promise<Response> {
    try {
      const response: Response = await axios.post(`${API_V}/campus`,
        campus
      );
      const { success, data, message } = response.data;

      return {
        success: success,
        data: data,
        message: message || "Creation successful",
      };
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Creation failed";
      if (error.response && error.response.data) {
        message = error.response.data.error;
      }

      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },
  async deleteCampus(campusId: string): Promise<Response> {
    try {
      const response: Response = await axios.delete(`${API_V}/campus/${campusId}`);
      const { success, data, message } = response.data;

      return {
        success: success,
        data: data,
        message: message || "Delete successful",
      };
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Delete failed";
      if (error.response && error.response.data) {
        message = error.response.data.error;
      }

      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },
  async getCampus(page: number = 0, size: number = 10, search?: string): Promise<Response> {
    try {
        
      const response: Response = await axios.get(`${API_V}/campus?page=${page}&size=${size}&sort=&search=${search || ""}`);
      const { success, data, message } = response.data;
        
      return {
        success: success,
        data: data,
        message: message || "Creation successful",
      };
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Creation failed";
      if (error.response && error.response.data) {
        message = error.response.data.error;
      }

      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },
};
