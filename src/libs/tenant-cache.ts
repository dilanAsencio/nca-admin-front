interface TenantCacheItem {
  id: string;
  name: string;
  timestamp: number;
}

const CACHE_TTL = 1000 * 60 * 5; // 5 min cache
const tenantCache = new Map<string, TenantCacheItem>();

export function getCachedTenant(subdomain: string) {
  const item = tenantCache.get(subdomain);
  if (!item) return null;

  const expired = Date.now() - item.timestamp > CACHE_TTL;
  if (expired) {
    tenantCache.delete(subdomain);
    return null;
  }
  return item;
}

export function setCachedTenant(subdomain: string, tenantId: string, tenantName: string) {
  tenantCache.set(subdomain, {
    id: tenantId,
    name: tenantName,
    timestamp: Date.now(),
  });
}
