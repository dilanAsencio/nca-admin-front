import { PaginateIMPL } from "@/app/core/interfaces/api-interfaces";
import axios from "@/libs/axios";

/**
 * Proxies a request to the given endpoint, using the provided method and data.
 *
 * @param method - The HTTP method to use for the request.
 * @param endpoint - The endpoint to proxy the request to.
 * @param data - The data to send with the request (optional).
 * @param token - Authorization token (optional).
 * @returns {Promise<Response<T>>} The proxied response.
 */
export async function apiProxy<T = any, R = any>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  endpoint: string,
  paginate?: PaginateIMPL,
  data?: T,
): Promise<R> {
  try {
    const token = document.cookie.match(/auth_token=([^;]+)/)?.[1];
    let url = `/api/proxy?endpoint=${encodeURIComponent(endpoint)}`;
    paginate?.page && (url += `&page=${paginate.page}`);
    paginate?.size && (url += `&size=${paginate.size}`);
    paginate?.search && (url += `&search=${paginate.search}`);
    paginate?.isActive && (url += `&isActive=${paginate.isActive}`);
    paginate?.sort && paginate.sort.length > 0 && (url += paginate.sort.map((s) => `&sort=${s}`).join(""));
    const config = {
      method,
      url: url,
      data,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json" 
      },
    };

    const response = await axios(config);
    return response.data as R;
  } catch (error: any) {
    return {
      success: false,
      error: error,
    } as R;
  }
}