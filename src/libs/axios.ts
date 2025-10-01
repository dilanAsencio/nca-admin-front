import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'X-Tenant-ID': '292084ef-6338-41f9-82c5-9ea04997fca7'
  },
});

// Interceptor de solicitud
instance.interceptors.request.use((config) => {
  // se agrega el token de auth
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de respuesta
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error('Network error or server not responding'));
  }
);

export default instance;