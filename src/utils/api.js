// Utilidad para obtener la URL base de la API
export const getApiUrl = () => {
  // En producción, usar la variable de entorno
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || '';
  }
  // En desarrollo, usar localhost
  return '';
};

// Función helper para hacer requests a la API
export const apiRequest = async (endpoint, options = {}) => {
  const baseUrl = getApiUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  return fetch(url, { ...defaultOptions, ...options });
};
