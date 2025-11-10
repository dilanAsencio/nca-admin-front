import { JwtPayload } from "@/app/core/interfaces/jwt/jwt-interfaces";
import { decodeJWT } from "@/utils/jwt/decodeJwt";

export function AuthHelper(token: string | null) {
  // Add authentication helper methods here in the future
    if (!token) return null;

    const payload = decodeJWT<JwtPayload>(token);
    if (!payload) return null;

    const tenantData = {
      tenantId: payload.tenant_id,
      tenantName: payload.tenant_id,
      subdomain: payload.sub,
      isLoading: false,
    };

    return tenantData;
};