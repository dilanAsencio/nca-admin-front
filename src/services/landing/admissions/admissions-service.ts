import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";
import { AdmissionApplication } from "@/app/core/interfaces/public/admissions-interfaces";
import axios from "axios";

const token = document.cookie.match(/auth_token=([^;]+)/)?.[1] || false;
const tokenP = document.cookie.match(/auth_tokenP=([^;]+)/)?.[1] || false;
const authToken = token || tokenP || "";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Authorization": `Bearer ${authToken}`,
    "Content-Type": "multipart/form-data",
  },
});

interface ApplicationsFilter {
    campusId?: string;
    gradeId?: string;
    status?: string;
}


export const AdmissionsLandingService = {

/**
 * Retrieves a list of admission processes for a given campus.
 * @param campusId - The ID of the campus to retrieve the admission processes for.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the retrieval fails.
 */
  getAdmissionsProcessByCampus: async (
    campusId?: string,
  ): Promise<any> => {
    try {
        const response = await apiProxy("GET", `parent/admission-processes${campusId ? `?campusId=${campusId}` : ""}`);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },

  
/**
 * Retrieves the detail of an admission process given its ID.
 * @param admissionProcessId - The ID of the admission process to retrieve.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the retrieval fails.
 * @example
 */
  getDetailAdmissionsProcess: async (
    admissionProcessId?: string,
  ): Promise<any> => {
    try {
        const response = await apiProxy("GET", `parent/admission-processes/${admissionProcessId}`);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener la solicitud" };
    }
  },
  
/**
 * Retrieves a list of admission applications for a parent.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the retrieval fails.
 */
  getApplicationsByParent: async (
  ): Promise<any> => {
    try {
        const response = await apiProxy("GET", `parent/admission-applications`);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener los Procesos" };
    }
  },

  
/**
 * Retrieves an admission application given its ID.
 * @param applicationId - The ID of the admission application to retrieve.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the retrieval fails.
 */
  getApplicationsById: async (
    applicationId: string
  ): Promise<any> => {
    try {
        const response = await apiProxy("GET", `parent/admission-applications/${applicationId}`);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al obtener los Procesos" };
    }
  },
  
  /**
   * Creates a new admission application.
   * @param {AdmissionApplication} data - The data of the admission application to create.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the creation fails.
   */
  newAdmissionApplication: async (
    data: AdmissionApplication,
  ): Promise<any> => {
    try {
        const response = await apiProxy("POST", `parent/admission-applications`, undefined, data);
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al crear la solicitud" };
    }
  },

  
  /**
   * Uploads a document for an admission application.
   * @param {string} applicationId - The ID of the admission application to upload the document for.
   * @param {string} documentTypeId - The ID of the document type to upload the document for.
   * @param {File[]} files - The files to upload.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the upload fails.
   */
  uploadDocument: async (
    applicationId: string,
    documentTypeId: string,
    files: File[],
  ): Promise<any> => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });
    try {
        const response = await apiProxy("POST",
          `parent/admission-applications/${applicationId}/documents?documentTypeId=${documentTypeId}`, undefined, formData, "multipart/form-data");
        return response;
    } catch (error) {
        throw { success: false, error: error || "Error al crear la solicitud" };
    }
  },
};
