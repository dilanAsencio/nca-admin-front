import axios from "@/libs/axios";
import { Response } from "@/types/auth";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const BranchesService = {
  async createBranch(campusId: string, branch: any): Promise<Response> {
    try {
        
      const response: Response = await axios.post(`${API_V}/campus/${campusId}/branches`, branch);
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
  async getBranches(page: number = 0, size: number = 10, search: string = ""): Promise<Response> {
    try {
        
      const response: Response = await axios.get(`${API_V}/campus/branches?page=${page}&size=${size}&sort=&search=${search}`);
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
  async getBranchesByCampus(idCampus: string, page: number = 0, size: number = 10, search: string = ""): Promise<Response> {
    try {
      const response: Response = await axios.get(`${API_V}/campus/${idCampus}/branches?page=${page}&size=${size}&sort=&search=${search}`);
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
  async deleteBranches(campusId: string, branchId: string): Promise<Response> {
    try {
      const response: Response = await axios.delete(`${API_V}/campus/${campusId}/branches/${branchId}`);
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
};
