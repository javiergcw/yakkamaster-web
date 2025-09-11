/**
 * Archivo centralizado de rutas para la aplicación YakkaMaster
 * 
 * Este archivo contiene todas las rutas de la aplicación para facilitar
 * el mantenimiento y evitar rutas hardcodeadas en el código.
 */

export const Routes = {
  // Rutas principales
  HOME: '/',
  
  // Rutas de autenticación (yakka)
  LOGIN: '/login',
  EMAIL: '/email',
  REGISTER: '/register',
  REGISTER_WORK: '/register/work',
  REGISTER_HIRE: '/register/hire',
  
  // Rutas del builder
  BUILDER: '/builder',
  BUILDER_POST_JOB: '/builder/post_a_job',
  BUILDER_PROFILE: '/builder/profile',
  BUILDER_PROFILE_EDIT: '/builder/profile/edit',
  JOBSITE: '/builder/jobsite',
  BUILDER_REQUEST_WORKERS: '/builder/request-workers',
  BUILDER_APPLICANTS: '/builder/applicants',
  BUILDER_CHAT_WITH_WORKERS: '/builder/chat-with-workers',
  BUILDER_INVOICES: '/builder/invoices',
  BUILDER_EXPENSES: '/builder/expenses',
  

  
  // Rutas abiertas
  JOB: '/job',
  PROFILE: '/profile',
  REFERENCE: '/reference',
  
  // Rutas de gestión (futuras)
  MANAGE_STAFF: '/manage-staff',
  CHECK_APPLICANTS: '/check-applicants',
  CHAT: '/chat',
  INVOICES: '/invoices',
  EXPENSES: '/expenses',
  WHATSAPP: '/whatsapp',
  
  // Rutas de verificación de trabajos (futuras)
  CHECK_JOBS: '/check-jobs',
  
  // Rutas de ayuda y soporte
  HELP: '/help',
  SUPPORT: '/support',
  
  // Rutas de configuración
  SETTINGS: '/settings',
  ACCOUNT: '/account',
  
  // Rutas de empresa
  COMPANY: '/company',
  LINK_COMPANY: '/link-company',
} as const;

// Tipo para las rutas (para TypeScript)
export type RouteKey = keyof typeof Routes;

// Función helper para obtener una ruta
export const getRoute = (routeKey: RouteKey): string => {
  return Routes[routeKey];
};

// Función helper para navegación con parámetros
export const buildRoute = (routeKey: RouteKey, params?: Record<string, string | number>): string => {
  let route: string = Routes[routeKey];
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`:${key}`, String(value));
    });
  }
  
  return route;
};

// Rutas con parámetros dinámicos (para futuras implementaciones)
export const DynamicRoutes = {
  JOB_DETAIL: (jobId: string | number) => `/job/${jobId}`,
  PROFILE_DETAIL: (userId: string | number) => `/profile/${userId}`,
  JOBSITE_DETAIL: (jobsiteId: string | number) => `/jobsite/${jobsiteId}`,
  CHAT_CONVERSATION: (conversationId: string | number) => `/chat/${conversationId}`,
} as const;

// Exportar por defecto para facilitar la importación
export default Routes;
