import { apiProxy } from "@/helpers/api-proxy";
import { PaginateIMPL, Response } from "@/app/core/interfaces/api-interfaces";

export const PreregistrationService = {
    
  /**
   * Review a pre-registration admission process.
   * @param {string} admissionProcessId - The ID of the pre-registration admission process to review.
   * @param {any} data - The status of the pre-registration admission process to review.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the review fails.
   */
  admissionProcessReview: async (
    admissionProcessId: string,
    data: {status: string},
  ): Promise<any> => 
    apiProxy("PUT", `admissions/pre-registrations/${admissionProcessId}/review`, undefined, data),
    
  /**
   * Rejects a pre-registration admission process.
   * @param {string} admissionProcessId - The ID of the pre-registration admission process to reject.
   * @param {any} data - The reason for rejecting the pre-registration admission process.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the rejection fails.
   */
  admissionProcessReject: async (
    admissionProcessId: string,
    data: {reason: string},
  ): Promise<any> => 
    apiProxy("PUT", `admissions/pre-registrations/${admissionProcessId}/reject`, undefined, data),
    
/**
 * Approves a pre-registration admission process.
 * @param admissionProcessId - The ID of the pre-registration admission process to approve.
 * @returns A Promise with a Response object containing the response data.
 * @throws { success: false, error: string } - If the approval fails.
 */
  admissionProcessApprove: async (
    admissionProcessId: string,
    data: {comments: string},
  ): Promise<any> => 
    apiProxy("PUT", `admissions/pre-registrations/${admissionProcessId}/approve`, undefined, data),

    
  /**
   * Retrieves a list of admissions pre-registrations for a given campus, status, date from and date to,
   * filtered by pagination data.
   * @param {PaginateIMPL} [paginate] - The pagination data to use when retrieving the pre-registrations.
   * @param campusId - The ID of the campus to filter the pre-registrations by.
   * @param status - The status of the pre-registrations to filter by.
   * @param dateFrom - The start date to filter the pre-registrations by.
   * @param dateTo - The end date to filter the pre-registrations by.
   * @returns A Promise with a Response object containing the response data.
   * @throws { success: false, error: string } - If the retrieval fails.
   */
  getAdmissionsPreRegister: async (
    paginate?: PaginateIMPL,
    campusId: string = "",
    status: string = "",
    dateFrom: string = "",
    dateTo: string = ""
  ): Promise<any> => 
    apiProxy("GET", `admissions/pre-registrations?campusId=${campusId}&status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`, paginate),

    
  getAdmissionsApplications: async (
    paginate?: PaginateIMPL,
    campusId: string = "",
    status: string = "",
    dateFrom: string = "",
    dateTo: string = ""
  ): Promise<any> => 
    apiProxy("GET", `admissions/pre-registrations?campusId=${campusId}&status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`, paginate),
};
