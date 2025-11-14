import { PaginateIMPL } from "@/app/core/interfaces/api-interfaces";
import api from "./api-interceptors";

export async function apiProxy<T = any, R = any>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  endpoint: string,
  paginate?: PaginateIMPL,
  data?: T,
  contentType?: string,
  microservice: "payments" | "academicManagement" = "academicManagement"
): Promise<R> {
  try {
    const token = document.cookie.match(/auth_token=([^;]+)/)?.[1] || false;
    const tokenP = document.cookie.match(/auth_tokenP=([^;]+)/)?.[1] || false;
    const authToken = token || tokenP || "";

    let url = `/api/proxy?endpoint=${encodeURIComponent(endpoint)}&method=${method}`;
    url += `&microservice=${microservice}`;
    if (contentType) url += `&contentType=${encodeURIComponent(contentType)}`;

    // Agregar paginación
    if (paginate) {
      const params = new URLSearchParams();
      Object.entries(paginate).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
      url += `&${params.toString()}`;
    }

    const config = {
      method,
      url,
      data,
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...(contentType ? { "Content-Type": contentType } : {}),
      },
    };

    const response = await api(config);
    return response.data as R;
  } catch (error: any) {
    console.error("API HELPER Proxy Error:", error);    
    throw error.response?.data || error;
  }
}
