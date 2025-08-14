// Departamentos
export const departamentos = [
  { label: "Cundinamarca", value: "cundinamarca" },
  { label: "Antioquia", value: "antioquia" },
];

// Ciudades agrupadas por departamento
export const ciudadesPorDepartamento: Record<string, { label: string; value: string }[]> = {
  cundinamarca: [
    { label: "Bogotá D.C.", value: "bogota" },
    { label: "Soacha", value: "soacha" },
  ],
  antioquia: [
    { label: "Medellín", value: "medellin" },
    { label: "Bello", value: "bello" },
  ],
};

// Barrios agrupados por ciudad
export const barriosPorCiudad: Record<string, { label: string; value: string }[]> = {
  bogota: [
    { label: "Chapinero", value: "chapinero" },
    { label: "Suba", value: "suba" },
  ],
  soacha: [
    { label: "San Mateo", value: "san_mateo" },
    { label: "Ciudad Verde", value: "ciudad_verde" },
  ],
  medellin: [
    { label: "El Poblado", value: "el_poblado" },
    { label: "Belén", value: "belen" },
  ],
  bello: [
    { label: "Niquía", value: "niquia" },
    { label: "Zamora", value: "zamora" },
  ],
};