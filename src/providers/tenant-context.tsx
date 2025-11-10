"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getTenantFromUrl } from "@/utils/getTenantFromUrl";

interface TenantContextProps {
  tenantId: string | null;
  tenantName: string | null;
  subdomain: string | null;
  isLoading: boolean;
  setTenant: (tenant: Partial<Omit<TenantContextProps, "setTenant">>) => void;
}

const TenantContext = createContext<TenantContextProps | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [tenantName, setTenantName] = useState<string | null>(null);
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setTenant = (tenant: Partial<Omit<TenantContextProps, "setTenant">>) => {
    if (tenant.tenantId !== undefined) setTenantId(tenant.tenantId);
    if (tenant.tenantName !== undefined) setTenantName(tenant.tenantName);
    if (tenant.subdomain !== undefined) setSubdomain(tenant.subdomain);
    if (tenant.isLoading !== undefined) setIsLoading(tenant.isLoading);
  };

  useEffect(() => {
    const detectedSubdomain = getTenantFromUrl();
    setSubdomain(detectedSubdomain);
    setIsLoading(false);
  }, []);

  return (
    <TenantContext.Provider value={{ tenantId, tenantName, subdomain, isLoading, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextProps {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
