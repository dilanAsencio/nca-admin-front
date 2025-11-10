/**
 * Decodifica un JWT y retorna el payload como objeto tipado.
 * @param token El JWT a decodificar.
 * @returns El payload del token o null si es inválido.
 */
export function decodeJWT<T = any>(token: string): T | null {
  if (!token || typeof token !== "string") return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const json = JSON.parse(decoded);

    return json as T;
  } catch (error) {
    console.error("❌ Error decoding JWT:", error);
    return null;
  }
}
