import { apiProxy } from "@/helpers/api-proxy";
import { ChangePassword, ForgotPassword, LoginFormData, LoginResponse, ResetPassword, ResponseAuth } from "@/app/core/interfaces/auth-interfaces";
// import { hashPassword } from "@/helpers/bcryptjs";

export const authService = {
  
  /**
   * Autenticación de usuario
   * Verifica las credenciales de un usuario y emite un token de acceso en caso que sean correctas.
   * @param dataAuth - credenciales de usuario
   * @returns - promesa con la respuesta de autenticación
   */
    login: async (
      dataAuth: LoginFormData
    ): Promise<ResponseAuth<LoginResponse>> => {
      const resp = await apiProxy("POST", `auth/login`, undefined, dataAuth) as ResponseAuth<LoginResponse>;      
      if(resp.data?.isPasswordChangeRequired) {
        return resp;
      }
      
      const { data, message, success } = resp;
      if (!success) {
        throw { success: success, error: message };
      }
      localStorage.setItem("first_login", data?.isFirstLogin ? "true" : "false");
      localStorage.setItem("auth_token", data?.accessToken || "");
      localStorage.setItem("refresh_token", data?.refreshToken || "");
      localStorage.setItem("username", dataAuth.username);
      document.cookie = `auth_token=${data?.accessToken}; path=/;`;
      document.cookie = `first_login=${data?.isFirstLogin ? "true" : "false"}; path=/;`;
      return resp;
    },
    
    
  /**
   * Resets the password of a user given a reset token.
   * @param {ResetPassword} data - ResetPassword object containing the reset token and new password.
   * @returns {Promise<ResponseAuth>} - A promise that resolves to a ResponseAuth object containing the
   *          success status, data, and message of the operation.
   * @throws {Error} - An error object containing success status and message if password reset fails.
   */
    resetPassword: async (
      data: ResetPassword
    ): Promise<ResponseAuth> => 
      apiProxy("POST", `auth/auth/reset-password`, undefined, data) as ResponseAuth,


  /**
   * Cambia la contraseña actual del usuario por una nueva.
   * @param data - Objeto con la contraseña actual y la nueva contraseña.
   * @returns Una promesa que resuelve a un objeto ResponseAuth con el estado de la operaci n.
   * @throws Un objeto con el estado success=false y un mensaje de error si la operaci n falla.
   */
    changePassword: async (
      data: ChangePassword
    ): Promise<ResponseAuth> => 
      apiProxy("POST", `auth/change-password`, undefined, data) as ResponseAuth,

      
  /**
   * Requests a password reset for a user given an email address.
   * Sends a reset token to the user's email address.
   * @param data - ForgotPassword object containing the email address of the user.
   * @returns A promise that resolves to a ResponseAuth object containing the
   *          success status, data, and message of the operation.
   * @throws An error object containing success status and message if password reset fails.
   */
    forgotPassword: async (
      data: ForgotPassword
    ): Promise<ResponseAuth> => 
      apiProxy("POST", `auth/reset-password-request`, undefined, data) as ResponseAuth,

        
  /**
   * Logs out the user from the application, removing the authentication tokens and
   * redirecting to the login page.
   * @returns A promise that resolves to a ResponseAuth object containing the
   *          success status, data, and message of the operation.
   * @throws An error object containing success status and message if logout fails.
   */
    logout: async (
    ): Promise<ResponseAuth> => {
      const resp = await apiProxy("POST", `auth/logout`, undefined) as ResponseAuth;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("firstLogin");
      document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        `first_login=; path=/;`;
      window.location.href = "/login";
      
      return resp;
    },

      
  /**
   * Requests a new access token for the user given a valid refresh token.
   * @param refreshToken - The refresh token received after a successful login.
   * @returns A promise that resolves to a ResponseAuth object containing the
   *          success status, data, and message of the operation.
   * @throws An error object containing success status and message if refresh token fails.
   */
    refreshToken: async (
      refreshToken: string
    ): Promise<ResponseAuth> => 
      apiProxy("POST", `auth/refresh-token`, undefined, refreshToken) as ResponseAuth,
};
