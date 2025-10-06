export interface User {
    id: string;
    username: string;
    email?: string;
}
export interface LoginFormData {
    username: string;
    password: string;
    rememberMe?: boolean;
}
export interface ResetFormData {
    username?: string;
    currentPassword: string;
    password: string;
    confirmPassword: string;
    rememberMe?: boolean;
}

export interface LoginResponse extends LoginFormData {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  permissions?: string[];
  isFirstLogin?: boolean;
  isPasswordChangeRequired?: boolean;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPassword {
  usernameOrEmail: string;
  captchaToken: string;
}

export interface ResetPassword {
    reserToken: string;
    newPassword: string;
    confirmPassword: string;

}

export interface ResponseAuth<T = any> {
  data?: T;
  success?: boolean;
  message?: string;
  timestamp?: string;
  error?: any;
  path?: string;
  status?: number;
}

export interface ChangeFormData {
    password: string;
    confirmPassword: string;
}
export interface ForgotPasswordFormData {
    email: string;
}
export const errorMessage: {[key: string]: string} = {
    controlAccess: "Usuario o contraseña incorrectos!",
    matchPassword: "Las contraseñas no coinciden!",
    blockedUsername: "Usuario bloqueado por intentos fallidos!",
    blockedPassword: "Contraseña bloqueada por intentos fallidos!",
}

export const passwordRequeriments = [
    {status: false, name: "minLength", text: "Debe tener mínimo 8 caracteres"},
    {status: false, name: "upperCase", text: "Incluido una letra mayúscula"},
    {status: false, name: "number", text: "Incluido un número"},
    {status: false, name: "specialCharacter", text: "Incluido un caracter especial !@#$%*"},
]