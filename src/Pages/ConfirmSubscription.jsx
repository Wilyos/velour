import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const ConfirmSubscription = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmSubscription = async () => {
      try {
        const response = await apiRequest(`/api/subscriptions/confirm/${token}`);
        const data = await response.json();
        
        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message || 'Error al confirmar la suscripción');
        }
      } catch (error) {
        console.error('Error:', error);
        setStatus('error');
        setMessage('Error de conexión. Por favor intenta más tarde.');
      }
    };

    if (token) {
      confirmSubscription();
    } else {
      setStatus('error');
      setMessage('Token de confirmación no válido');
    }
  }, [token]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center yanone-kaffeesatz">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Confirmando tu suscripción...
          </h2>
          <p className="text-gray-600">Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center yanone-kaffeesatz">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {status === 'success' ? (
            <>
              {/* Success State */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  ¡Suscripción Confirmada! 🎉
                </h1>
                <p className="text-gray-600 mb-6">{message}</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Ahora recibirás nuestras ofertas exclusivas, tips de cuidado capilar y novedades directamente en tu email.
                </p>
                
                <div className="bg-primary/10 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-primary mb-2">¿Qué recibirás?</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>🎁 Ofertas exclusivas y descuentos</li>
                    <li>💡 Tips de cuidado capilar</li>
                    <li>✨ Novedades de productos</li>
                    <li>📰 Newsletter con contenido de valor</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link 
                    to="/" 
                    className="block w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Explorar Productos
                  </Link>
                  
                  <Link 
                    to="/about" 
                    className="block w-full border-2 border-primary text-primary py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold"
                  >
                    Conocer más sobre Velour
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Error State */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-red-600 mb-2">
                  Error de Confirmación
                </h1>
                <p className="text-gray-600 mb-6">{message}</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  El enlace puede haber expirado o ya fue utilizado. Puedes intentar suscribirte nuevamente.
                </p>
                
                <div className="space-y-3">
                  <Link 
                    to="/" 
                    className="block w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Volver al Inicio
                  </Link>
                  
                  <Link 
                    to="/#contact" 
                    className="block w-full border-2 border-primary text-primary py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold"
                  >
                    Intentar Suscribirse de Nuevo
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-6">
          ¿Tienes problemas? Contáctanos en{' '}
          <a href="mailto:correos.sistemaslit@gmail.com" className="text-primary hover:underline">
            correos.sistemaslit@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConfirmSubscription;
