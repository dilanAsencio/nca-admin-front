import axios from "@/libs/axios";
import { Response } from "@/types/auth";

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
  async publicLogin(payload: LoginPayload): Promise<Response> {
    localStorage.setItem("username", payload.username);
    try {
      const response = await axios.post("/public/auth/login", payload);

      if (
        response.status === 202 &&
        response.data.message?.includes("temporary password")
      ) {
        return {
          success: response.data.success,
          message: response.data.message,
          timestamp: response.data.timestamp,
          status: response.status,
        };
      }

      console.log(response.data);
      

      const { success, data, message, timestamp } = response.data;
      const { access_token, refresh_token, isFirstLogin } = data;

      localStorage.setItem("auth_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("first_login", isFirstLogin ? "true" : "false");

      document.cookie = `auth_token=${access_token}; path=/;`;
      document.cookie = `first_login=${isFirstLogin ? "true" : "false"}; path=/;`;

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

  async publicRegister(payload: RegisterPayload): Promise<Response> {
    try {
      const response = await axios.post("/public/auth/register", payload);
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

  async publicForgotPassword(payload: ForgotPasswordPayload): Promise<Response> {
    try {
      const response = await axios.post("/public/auth/forgot-password", payload);
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

  async publicResetPassword(payload: ResetPasswordPayload): Promise<Response> {
    try {
      const response = await axios.post("/public/auth/reset-password", payload);
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

  async publicChangePassword(payload: ChangePasswordPayload): Promise<Response> {
    try {
      const response = await axios.post("/public/auth/change-password", payload);
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

  async publicRefreshToken(payload: RefreshTokenPayload): Promise<Response> {
    try {
      const response = await axios.post("/public/auth/refresh-token", payload);
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

  async publicVerifyEmail(payload: VerifyEmailPayload): Promise<Response> {
    try {
      const response = await axios.post("/public/auth/verify-email", payload);
      return response.data;
    } catch (error: any) {
      let message = "Email verification failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicResendVerification(payload: ResendVerificationPayload): Promise<Response> {
    try {
      const response = await axios.post("/public/auth/resend-verification", payload);
      return response.data;
    } catch (error: any) {
      let message = "Resend verification failed";
      if (error.response?.data?.error) {
        message = error.response.data.error;
      }
      throw { success: false, error: message };
    }
  },

  async publicGetProfile(): Promise<Response> {
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

  async publicUpdateProfile(payload: UpdateProfilePayload): Promise<Response> {
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
