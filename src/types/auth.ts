export interface User {
    id: string;
    username: string;
    email: string;
}
export interface LoginFormData {
    username: string;
    password: string;
    rememberMe: boolean;
}
export const errorMessage: {[key: string]: string} = {
    required: "Este campo es requerido!",
    minLength: "Debe tener mínimo 5 caracteres!"
}