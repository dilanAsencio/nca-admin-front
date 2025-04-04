import axios from "@/libs/axios";
import { User } from "@/types/auth";
import { mockUsers } from "./mockUsers";

export const authService = {
  async login(username: string, password: string): Promise<String> {
    //User
    try {
      const user = mockUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (!user) {
        throw new Error("Invalid username or password"); // Lanza un error si las credenciales son incorrectas
      }

      // Simula la creación de un token de autenticación
      const token = "mock_token";
      localStorage.setItem("user", username);
      localStorage.setItem("auth_token", token);
      // Establecer la cookie de autenticación
      document.cookie = `auth_token=${token}; path=/;`;

      return username;
      // const response = await axios.post('/auth/login', { username, password });
      // const { token } = response.data;
      // document.cookie = `auth_token=${token}; path=/;`;
      // return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Login failed");
      } else {
        throw new Error("Unknown error");
      }
    }
  },

  async logout() {
    try {
      // await axios.post('/auth/logout');
      document.cookie = "auth_token=; Max-Age=0; path=/;";

      window.location.href = "/login";
      // Aquí lógica de cierre de sesión si es necesario
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Login failed");
      } else {
        throw new Error("Unknown error");
      }
    }
  },
};
