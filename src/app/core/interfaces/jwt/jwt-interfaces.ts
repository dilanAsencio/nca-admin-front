export interface JwtPayload {
  sub: string;
  tenant_id: string;
  user_id: string;
  roles: string[];
  token_type: string;
  first_login: false,
  authorities: string[];
  jti: string;
  iat: number;
  exp: number;
}