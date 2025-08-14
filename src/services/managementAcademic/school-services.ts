import axios from "@/libs/axios";
import { Response } from "@/types/auth";
import { Campus } from "@/types/forms-types";

export const SchoolService = {
  async createCampus(campus: Campus): Promise<Response> {
    try {
      const response: Response = await axios.post("/v1/campus",
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
  async getCampus(page: number = 0, size: number = 10, search?: string): Promise<Response> {
    try {
        
      const response: Response = await axios.get(`/v1/campus?page=${page}&size=${size}&sort=&search=${search || ""}`);
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
  async createBranch(campusId: string, branch: any): Promise<Response> {
    try {
        
      const response: Response = await axios.post(`/v1/campus/${campusId}/branches`, branch);
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
  async getBranches(page: number = 0, size: number = 10, search?: string): Promise<Response> {
    try {
        
      const response: Response = await axios.get(`/v1/campus?page=${page}&size=${size}&sort=&search=${search || ""}`);
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
