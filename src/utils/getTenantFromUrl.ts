export function getTenantFromUrl(hostname?: string): string | null {
  const host = hostname ?? (typeof window !== "undefined" ? window.location.hostname : "");

  if (!host) return null;

  const parts = host.split(".");

  // Ej: ["colegio1","nexuscore","com"] → subdomain = colegio1
  if (parts.length > 2) {
    return parts[0];
  }

  return null;
}
