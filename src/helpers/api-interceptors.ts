import { showToast } from "@/utils/alerts";
import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

// ✅ Interceptor de Requests
api.interceptors.request.use(
  (config) => {

    if (typeof window !== "undefined") {
      const tenantData = localStorage.getItem("tenant") || null;      
      if (tenantData && tenantData !== "null" && config.headers) {
        const { tenantId, subdomain } = JSON.parse(tenantData);
        config.headers["X-Tenant-ID"] = tenantId;
        config.headers["X-Subdomain"] = subdomain;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor de Responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Error inesperado";
    switch (status) {
      case 401:
        showToast("Tu sesión expiró. Por favor inicia sesión nuevamente.", "warning");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_tokenP");
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        document.cookie = "auth_tokenP=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const redirectTo = currentPath.includes("/landing")
            ? "/landing"
            : "/";
          window.location.href = redirectTo;
        }
        break;

      case 403:
        showToast("No tienes permisos para realizar esta acción.", "error");
        break;

      case 500:
        showToast("Error interno del servidor. Intenta más tarde.", "error");
        break;

      default:
        showToast(message, "error");
    }

    return Promise.reject(error);
  }
);

export default api;