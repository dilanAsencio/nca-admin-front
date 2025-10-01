import axios from "@/libs/axios";
import { Response } from "@/types/auth";

export const authService = {
  /**
   * Authenticates a user using their username and password.
   * Upon successful authentication, stores access and refresh tokens in local storage
   * and sets a cookie for the auth token. If the authentication fails, an error
   * message is extracted from the response and thrown.
   *
   * @param username - The username of the user trying to authenticate.
   * @param password - The password of the user.
   * @param rememberMe - A boolean indicating if the session should be remembered.
   * @returns A promise that resolves to a Response object containing success status,
   *          data, message, and timestamp.
   * @throws An error object containing success status and message if authentication fails.
   */
  async login(
    username: string,
    password: string,
    rememberMe: boolean
  ): Promise<Response> {
    localStorage.setItem("username", username);
    try {
      const response: Response = await axios.post("/auth/login", {
        username,
        password,
        rememberMe,
      });
      if(response.status === 202 && response.data.message === "A temporary password has been sent to your email. Please check your email and try again.") {
        return {
          success: response.data.success,
          message: response.data.message,
          timestamp: response.data.timestamp,
          status: response.status
        };
      }
      const { success, data, message, timestamp } = response.data;
      const { accessToken, isFirstLogin, refreshToken } = data;
      localStorage.setItem("first_login", isFirstLogin ? "true" : "false");
      localStorage.setItem("auth_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      document.cookie = `auth_token=${accessToken}; path=/;`;
      document.cookie = `first_login=${isFirstLogin ? "true" : "false"}; path=/;`;
      
      return {
        success: success,
        data: data,
        message: message || "Login successful",
        timestamp: timestamp || new Date().toISOString(),
      };
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Login failed";
      if (error.response && error.response.data) {
        
        message = error.response.data.error
      }
      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },

  /**
   * Resets the password for a user given a reset token and new password.
   * Upon successful password reset, returns a Response object with success status,
   * data, message, and timestamp.
   * If the password reset fails, an error message is extracted from the response
   * and thrown.
   *
   * @param resetToken - The reset token received via email.
   * @param newPassword - The new password for the user.
   * @param confirmPassword - The confirmation of the new password.
   * @returns A promise that resolves to a Response object containing success status,
   *          data, message, and timestamp.
   * @throws An error object containing success status and message if password reset fails.
   */
  async resetPassword(
    resetToken: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<Response> {
    try {
      const response: Response = await axios.post("/auth/reset-password", {
        resetToken,
        newPassword,
        confirmPassword,
      });
      const { success, data, message } = response.data;

      return {
        success: success,
        data: data,
        message: message || "Password reset successful",
      };
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Password reset failed";
      if (error.response && error.response.data) {
        // Prioridad: error.response.data.message, luego error.response.data.error.message
        message = error.response.data.error
      }
      
      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },

  /**
   * Changes the password for the currently logged in user.
   * Sends a POST request to the server with the current password,
   * new password, and confirmation of the new password.
   *
   * @param currentPassword - The current password of the user.
   * @param newPassword - The new password to be set.
   * @param confirmPassword - The confirmation of the new password.
   * @returns A promise that resolves to a Response object containing
   *          the success status, data, message, and timestamp of the operation.
   * @throws An error object containing success status and message if the
   *         password change operation fails, with error information extracted
   *         from the server response or the error object.
   */
  async changePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<Response> {
    try {
      const response: Response = await axios.post("/auth/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      const { success, data, message } = response.data;

      return {
        success: success,
        data: data,
        message: message || "Password changed successfully",
      };
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Password change failed";
      if (error.response && error.response.data) {
        // Prioridad: error.response.data.message, luego error.response.data.error.message
        message = error.response.data.error
      }
      
      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },

  /**
   * Requests a password reset for a user given a username or email, and a
   * Google reCAPTCHA token.
   * Upon successful password reset request, returns a Response object with
   * success status, message, and timestamp.
   * If the password reset request fails, an error message is extracted from
   * the response and thrown.
   *
   * @param usernameOrEmail - The username or email of the user to request a
   *                          password reset for.
   * @param captchaToken - The Google reCAPTCHA token verifying the user is not
   *                       a robot.
   * @returns A promise that resolves to a Response object containing success
   *          status, message, and timestamp.
   * @throws An error object containing success status and message if the
   *         password reset request operation fails, with error information
   *         extracted from the server response or the error object.
   */
  async forgotPassword(
    usernameOrEmail: string,
    captchaToken: string
  ): Promise<Response> {
    try {
      const response: Response = await axios.post(
        "/public/auth/forgot-password",
        {
          email: usernameOrEmail,
        }
      );
      const { success, message } = response.data;

      return {
        success: success,
        message: message || "Password reset request successful",
      };
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Password reset request failed";
      if (error.response && error.response.data) {
        // Prioridad: error.response.data.message, luego error.response.data.error.message
        message = error.response.data.error
      }
      
      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },

  /**
   * Logs out the user from the application.
   * Removes the auth token, refresh token, and firstLogin flag from local storage.
   * Also removes the auth token cookie.
   * Redirects the user to the login page.
   */
  async logout() {
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      // localStorage.removeItem("username");
      localStorage.removeItem("firstLogin");
      document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        `first_login=; path=/;`;

      window.location.href = "/login";
      // Aquí lógica de cierre de sesión si es necesario
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Logout failed";
      if (error.response && error.response.data) {
        // Prioridad: error.response.data.message, luego error.response.data.error.message
        message = error.response.data.error
      }
      
      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },

  /**
   * Requests a refresh of the auth token using the given refresh token.
   * If the request is successful, the response will contain the new auth token
   * and the refresh token. The auth token will be stored in local storage as
   * "auth_token" and the refresh token will be stored as "refresh_token".
   * If the request fails, an error will be thrown with the success status and
   * message extracted from the response.
   *
   * @param refreshToken - The refresh token to use for the token refresh.
   * @returns A promise that resolves to a Response object containing the
   *          success status, message, and data (new auth token and refresh
   *          token) of the operation.
   * @throws An error object containing success status and message if the
   *         token refresh operation fails, with error information extracted
   *         from the server response or the error object.
   */
  async refreshToken(refreshToken: string): Promise<Response> {
    try {
      const response: Response = await axios.post("/auth/refresh-token", {
        refreshToken,
      });
      const { success, message, data } = response.data;

      return {
        success: success,
        message: message || "Token refreshed successfully",
        data: data || null,
      };
    } catch (error: any) {
      // Intenta extraer el mensaje del backend si existe
      let message = "Token refresh failed";
      if (error.response && error.response.data) {
        // Prioridad: error.response.data.message, luego error.response.data.error.message
        message = error.response.data.error
      }
      
      // Lanza el mensaje para que el thunk lo capture
      throw { success: false, error: message };
    }
  },
};
