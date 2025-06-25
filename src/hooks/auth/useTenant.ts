export function useTenant() {
  // Ejemplo: extraer tenant del subdominio
  if (typeof window === "undefined") return null;
  const host = window.location.hostname;
  const [tenant] = host.split(".");
  return tenant;
}
