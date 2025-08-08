import { useState, useContext, createContext, useEffect, useCallback } from 'react';
import { apiRequest } from '../utils/api';

// Contexto de autenticación
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Cambiado a true para verificar auth al inicio
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Constantes de configuración
  const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutos en millisegundos
  const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // Renovar token cada 5 minutos si está activo

  // Actualizar última actividad
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Verificar si la sesión ha expirado por inactividad
  const isSessionExpired = useCallback(() => {
    return Date.now() - lastActivity > INACTIVITY_TIMEOUT;
  }, [lastActivity]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;
        // Guardar token y timestamp de login
        localStorage.setItem('token', token);
        localStorage.setItem('loginTime', Date.now().toString());
        localStorage.setItem('lastActivity', Date.now().toString());
        
        setUser(user);
        setIsAuthenticated(true);
        setLastActivity(Date.now());
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback((reason = 'manual') => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('lastActivity');
    setUser(null);
    setIsAuthenticated(false);
    
    if (reason === 'inactivity') {
      alert('Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.');
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    const storedLastActivity = localStorage.getItem('lastActivity');
    
    if (!token) {
      setLoading(false);
      return;
    }

    // Verificar si la sesión ha expirado por inactividad
    if (storedLastActivity) {
      const timeSinceLastActivity = Date.now() - parseInt(storedLastActivity);
      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        logout('inactivity');
        setLoading(false);
        return;
      }
      setLastActivity(parseInt(storedLastActivity));
    }

    try {
      const response = await apiRequest('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        setIsAuthenticated(true);
        updateActivity();
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout, updateActivity]);

  // Renovar token automáticamente
  const refreshToken = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || !isAuthenticated) return;

    try {
      const response = await apiRequest('/api/auth/refresh', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const { token: newToken } = await response.json();
        localStorage.setItem('token', newToken);
        updateActivity();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  }, [isAuthenticated, updateActivity]);

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Configurar listeners para detectar actividad del usuario
  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      if (isAuthenticated) {
        updateActivity();
        localStorage.setItem('lastActivity', Date.now().toString());
      }
    };

    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [isAuthenticated, updateActivity]);

  // Timer para verificar inactividad y renovar token
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      if (isSessionExpired()) {
        logout('inactivity');
      } else {
        // Renovar token si está cerca de expirar
        const timeSinceLastActivity = Date.now() - lastActivity;
        if (timeSinceLastActivity < TOKEN_REFRESH_INTERVAL) {
          refreshToken();
        }
      }
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [isAuthenticated, isSessionExpired, logout, refreshToken, lastActivity]);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
    updateActivity,
    isSessionExpired
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
