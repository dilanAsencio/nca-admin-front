# NexusCore Controller Frontend

Este repositorio contiene la aplicación web de NexusCore Controller, una plataforma integral.

## Tecnologías

- **Next.js 14**: Framework de React con soporte para SSR, SSG y App Router
- **TypeScript**: Tipado estático para mayor robustez y mantenibilidad
- **Tailwind CSS**: Framework de CSS utilitario para un desarrollo rápido
- **React Hook Form**: Manejo eficiente de formularios
- **TanStack Query**: Gestión de estado del servidor y caché
- **Zod**: Validación de esquemas
- **Axios**: Cliente HTTP para comunicación con el backend

## Requisitos

- Node.js 18.x o superior
- npm 9.x o superior

## Instalación

```bash
# Clonar el repositorio
git clone https://gitlab.com/[username]/nexuscore-frontend.git
cd nexuscore-frontend

# Instalar dependencias
npm install

# Crear archivo .env.local basado en el ejemplo
cp .env.example .env.local

# Editar las variables de entorno según sea necesario
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Construcción para producción

```bash
# Construir la aplicación
npm run build

# Iniciar la aplicación en modo producción
npm start
```

## Estructura de ramas

- `release/stable`: Rama principal para código de producción
- `develop`: Rama de integración para desarrollo
- `feature/*`: Ramas para nuevas características
- `bugfix/*`: Ramas para corrección de errores
- `hotfix/*`: Ramas para correcciones urgentes en producción

## Flujo de desarrollo

1. Crea una nueva rama desde `develop` para cada característica o corrección
2. Desarrolla y prueba localmente
3. Crea un Merge Request (PR) a la rama `develop`
4. Después de aprobar pruebas en `develop`, se fusionará en `release/stable` para producción

## Convenciones de código

- **Commits**: Seguir el formato [Conventional Commits](https://www.conventionalcommits.org/)
- **Estilos**: Usar reglas de Prettier y ESLint configuradas
- **Componentes**: Seguir principios de Atomic Design
- **Nomenclatura**: CamelCase para archivos de componentes, kebab-case para rutas

## Módulos principales

- **Control de Autenticación**: Gestión de usuarios, autenticación y autorización
- **Control de Acceso**: Gestión de accesos físicos y virtuales
- **Control de Activos**: Gestión de activos fijos y temporales
- **Control de Agendas**: Gestión de calendarios y programación

## Herramientas de desarrollo

- ESLint para linting de código
- Prettier para formateo consistente
- Husky para hooks de git
- lint-staged para ejecutar linters en archivos modificados

## Licencia

Propiedad de Secure Core Consulting SAS. Todos los derechos reservados.