import axios from 'axios';
import Router from 'next/router';

const instance = axios.create({});

// Interceptor de solicitud
instance.interceptors.request.use((config) => {
  // se agrega el token de auth
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const tokenP = typeof window !== "undefined" ? localStorage.getItem("auth_tokenP") : null;
  const authToken = token || tokenP || null;
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${authToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de respuesta
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          // intentar refrescar token
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            refreshToken,
          });
          const newToken = res.data.accessToken;

          // guardar y reintentar request original
          localStorage.setItem("auth_token", newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return instance(error.config);
        } catch (refreshError) {
          // refresh falló → limpiar sesión
          localStorage.clear();
          Router.push("/login"); // App Router: router.push("/login")
        }
      } else {
        // No hay refresh → logout directo
        localStorage.clear();        
        Router.push("/");
      }
    }
    const { response } = error;
    if (response) {
      return Promise.reject(response.data);
    }
    return Promise.reject(new Error('Network error or server not responding'));
  }
);

export default instance;