import { useEffect } from "react";
import { authService } from "@/services/auth-services";

export function useTokenRefresh() {
  useEffect(() => {
    const interval = setInterval(
      () => {
        authService.refreshToken?.();
      },
      1000 * 60 * 10
    ); // cada 10 minutos
    return () => clearInterval(interval);
  }, []);
}
