// Función para realizar peticiones a la API
export const apiRequest = async (endpoint, options = {}) => {
  // URL base del backend
  const baseURL = import.meta.env.VITE_API_URL || 'https://velour-production.up.railway.app';
  
  // Configuración por defecto
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Combinar opciones
  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${baseURL}${endpoint}`, requestOptions);
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Intentar parsear como JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Función específica para enviar datos del formulario de contacto
export const submitContactForm = async (formData) => {
  return apiRequest('/api/contacts/submit', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};
