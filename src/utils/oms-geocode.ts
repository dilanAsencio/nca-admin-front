export interface GeocodeResult {
  displayName: string;
  lat: number;
  lon: number;
}

export async function searchLocation(query: string): Promise<GeocodeResult[]> {
  if (!query) return [];

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
    { headers: { "User-Agent": "NCA-Admissions/1.0" } }
  );

  const data = await res.json();

  return data.map((item: any) => ({
    displayName: item.display_name,
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
  }));
}
