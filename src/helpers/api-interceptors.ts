import { showToast } from "@/utils/alerts";
import axios from "axios";

const api = axios.create({
  // Cuando usamos el proxy de Next.js, no seteamos baseURL externa aqui.
  // El api-proxy helper construirá "/api/proxy?...", que ira al servidor Next.js
  withCredentials: true,
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Error inesperado";
    switch (status) {
      case 401:
        // Ignorar 401 en login para que el catch del componente lo maneje
        // El endpoint viene como query param encoded en el proxy: auth%2Flogin
        if (
          error.config.url && (
            error.config.url.includes("auth/login") ||
            error.config.url.includes("auth%2Flogin") ||
            error.config.url.includes("auth%2Frefresh-token") ||
            error.config.url.includes("auth/refresh-token")
          )
        ) {
          return Promise.reject(error);
        }

        showToast("Tu sesión expiró. Por favor inicia sesión nuevamente.", "warning");
        localStorage.removeItem("auth_token");
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        if (typeof window !== "undefined") {
          window.location.href = "/login";
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