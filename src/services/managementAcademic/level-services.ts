import axios from "@/libs/axios";
import { Response } from "@/types/auth";
import { AcademicGrade, AcademicLevel } from "@/types/forms-types";

const API_V = process.env.NEXT_PUBLIC_API_V || "v1";

export const LevelService = {

  async createLevel({campusBranchId, description = "", name, code = "", levelOrder = 0, status = "active", valid = true}: AcademicLevel): Promise<Response> {
    try {
      const level = {campusBranchId, description, name, code, levelOrder, status, valid};
      const response: Response = await axios.post(`${API_V}/academic-levels`,
        level
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
  async createGrade({academicLevelId, description = "", name, code = "", gradeOrder = 0, maxCapacity = 0, status = "active", enrollmentOpen = false, defaultMaxCapacity = 0, defaultEnrollmentOpen = false, defaultStatus = "active", valid = true}: AcademicGrade): Promise<Response> {
    try {
      const level = {academicLevelId, description, name, code, gradeOrder, maxCapacity, enrollmentOpen, defaultMaxCapacity, defaultEnrollmentOpen, defaultStatus, status, valid};
      const response: Response = await axios.post(`${API_V}/academic-grades`,
        level
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
  async getLevels(page: number = 0, size: number = 20, sort: string = "levelOrder", direction: string = "ASC"): Promise<Response> {
    try {
        
      const response: any = await axios.get(`${API_V}/academic-levels?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
      const { success, data, message } = response.data;
        
      return response.data;
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
  async getLevelsCampusBranch(campusBranchId: string, page: number = 0, size: number = 5, sort: string = "levelOrder", direction: string = "ASC"): Promise<Response> {
    try {
        
      const response: any = await axios.get(`${API_V}/academic-levels/campus-branch/${campusBranchId}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`);
      const { success, data, message } = response.data;
        
      return response.data;
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
  
  async deleteLevel(levelId: string): Promise<Response> {
    try {
      const response: Response = await axios.delete(`${API_V}/academic-levels/${levelId}`);
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
