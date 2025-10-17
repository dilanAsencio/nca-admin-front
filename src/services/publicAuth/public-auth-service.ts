import { apiProxy } from "@/helpers/api-proxy";
import { ResponseAuth } from "@/app/core/interfaces/auth-interfaces";
import axios from "axios";

export interface LoginPayload {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  documentType?: string;
  documentNumber?: string;
  phone?: string;
  mobilePhone?: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordPayload {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface VerifyEmailPayload {
  token: string;
}

export interface ResendVerificationPayload {
  email: string;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  mobilePhone?: string;
  gender?: string;
  dateOfBirth?: string;
}

export const authService = {
  async publicLogin(payload: LoginPayload): Promise<ResponseAuth> {
    localStorage.setItem("username", payload.username);
    try {
      const response = await apiProxy("POST", "/public/auth/login", undefined, payload);
      if (
        response.status === 202 &&
        response.data.message?.includes("temporary password")
      ) {
        return {
          success: response.success,
          message: response.message,
          timestamp: response.timestamp
        };
      }


      const { success, data, message, timestamp } = response;
      const { access_token, refresh_token } = data;

      localStorage.setItem("auth_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      document.cookie = `auth_token=${access_token}; path=/;`;
      
      return {
        success,
        data,
        message: message || "Login successful",
        timestamp: timestamp || new Date().toISOString(),
      };
    } catch (error: any) {
      let message = "Login failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicRegister(payload: RegisterPayload): Promise<ResponseAuth> {
    try {
      const response = await apiProxy("POST", "/public/auth/register", undefined, payload);
      const { success, data, message, timestamp } = response.data;

      return {
        success,
        data,
        message: message || "User registered successfully",
        timestamp: timestamp || new Date().toISOString(),
      };
    } catch (error: any) {
      let message = "Registration failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicForgotPassword(payload: ForgotPasswordPayload): Promise<ResponseAuth> {
    try {
      const response = await apiProxy("POST", "/public/auth/forgot-password", undefined, payload);
      const { success, message, timestamp } = response.data;

      return {
        success,
        message: message || "Password reset email sent successfully",
        timestamp: timestamp || new Date().toISOString(),
      };
    } catch (error: any) {
      let message = "Password reset request failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicResetPassword(payload: ResetPasswordPayload): Promise<ResponseAuth> {
    try {
      const response = await apiProxy("POST", "/public/auth/reset-password", undefined, payload);
      const { success, data, message, timestamp } = response.data;

      return {
        success,
        data,
        message: message || "Password reset successful",
        timestamp: timestamp || new Date().toISOString(),
      };
    } catch (error: any) {
      let message = "Password reset failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicChangePassword(payload: ChangePasswordPayload): Promise<ResponseAuth> {
    try {
      const response = await apiProxy("POST", "/public/auth/change-password", undefined, payload);
      const { success, data, message, timestamp } = response.data;

      return {
        success,
        data,
        message: message || "Password changed successfully",
        timestamp: timestamp || new Date().toISOString(),
      };
    } catch (error: any) {
      let message = "Password change failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicRefreshToken(payload: RefreshTokenPayload): Promise<ResponseAuth> {
    try {
      const response = await apiProxy("POST", "/public/auth/refresh-token", undefined, payload);
      const { success, data, message, timestamp } = response.data;

      if (data?.accessToken) {
        localStorage.setItem("auth_token", data.accessToken);
        document.cookie = `auth_token=${data.accessToken}; path=/;`;
      }
      if (data?.refreshToken) {
        localStorage.setItem("refresh_token", data.refreshToken);
      }

      return {
        success,
        data,
        message: message || "Token refreshed successfully",
        timestamp: timestamp || new Date().toISOString(),
      };
    } catch (error: any) {
      let message = "Token refresh failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicVerifyEmail(payload: VerifyEmailPayload): Promise<ResponseAuth> {
    try {
      const response = await apiProxy("POST", "/public/auth/verify-email", undefined, payload);
      return response.data;
    } catch (error: any) {
      let message = "Email verification failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicResendVerification(payload: ResendVerificationPayload): Promise<ResponseAuth> {
    try {
      const response = await apiProxy("POST", "/public/auth/resend-verification", undefined, payload);
      return response.data;
    } catch (error: any) {
      let message = "Resend verification failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicGetProfile(): Promise<ResponseAuth> {
    try {
      const response = await axios.get("/public/auth/profile");
      return response.data;
    } catch (error: any) {
      let message = "Fetch profile failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicUpdateProfile(payload: UpdateProfilePayload): Promise<ResponseAuth> {
    try {
      const response = await axios.put("/public/auth/profile", payload);
      return response.data;
    } catch (error: any) {
      let message = "Update profile failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicLogout(): Promise<void> {
    try {
      await axios.post("/public/auth/logout");

      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("first_login");
      localStorage.removeItem("persist:root");

      document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "first_login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (error: any) {
      let message = "Logout failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },
};
