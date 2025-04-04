import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud
instance.interceptors.request.use((config) => {
  // se agrega el token de auth
  const token = localStorage.getItem('token');
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
      if (response.status === 401) {
        console.error('Unauthorized access');
      } else if (response.status === 403) {
        console.error('Access forbidden');
      }
      return Promise.reject(new Error(response.data?.message || 'An error occurred'));
    }
    return Promise.reject(new Error('Network error or server not responding'));
  }
);

export default instance;