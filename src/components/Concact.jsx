import { useState } from 'react';
import bgContact from '../assets/img/bg-concact.png';
import { FaFacebookF, FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { apiRequest } from '../utils/api';

const Concact = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Por favor ingresa tu email');
      setMessageType('error');
      return;
    }

    if (!email.includes('@')) {
      setMessage('Por favor ingresa un email válido');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await apiRequest('/api/subscriptions/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setEmail(''); // Limpiar el formulario
      } else {
        setMessage(data.message || 'Error al suscribirse');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error de conexión. Por favor intenta más tarde.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      className="text-primary yanone-kaffeesatz relative min-h-screen flex items-center"
      style={{ 
        backgroundImage: `url(${bgContact})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white/40"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col px-4 py-12 md:py-24 justify-center items-center">
        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-light mb-8 md:mb-16 text-center leading-tight">
          <strong>SÍGUENOS</strong> EN<br className="md:hidden" /> INSTAGRAM
        </h1>
        
        <div className="w-full max-w-4xl flex flex-col items-center text-center">
          {/* Subtítulo */}
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-light mb-6 md:mb-8 leading-relaxed px-2">
            <strong>RECIBE NUESTRAS OFERTAS EXCLUSIVAS</strong>
            <br />
            <span className="text-lg md:text-2xl lg:text-3xl xl:text-4xl">
              SIGAMOS CONECTADOS Y LOS MEJORES TIPS Y RUTINAS PARA CUIDAR TU CABELLO
            </span>
          </h2>
          
          {/* Formulario de suscripción */}
          <form onSubmit={handleSubmit} className="flex w-full justify-center items-center mb-4 md:mb-8 px-2">
            <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl bg-secondary/50 rounded-full border border-secondary overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="✉ Correo Electrónico"
                className="w-full bg-transparent text-base outline-none text-gray-700 py-3 px-4 sm:py-2 text-center sm:text-left"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-white text-primary font-bold px-6 py-3 sm:py-2 rounded-none border-l-0 sm:border-l border-secondary hover:bg-morado hover:text-secondary transition-colors duration-200 text-lg md:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Suscribiendo...' : 'Suscribirse'}
              </button>
            </div>
          </form>

          {/* Mensaje de estado */}
          {message && (
            <div className={`mb-4 md:mb-8 px-4 py-3 rounded-lg text-center max-w-2xl w-full ${
              messageType === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {message}
            </div>
          )}
          
          {/* Redes sociales */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
              SIGAMOS CONECTADOS
            </h3>
            
            <div className="flex gap-3 md:gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent text-primary flex items-center justify-center border-2 border-primary hover:bg-primary hover:text-secondary transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="text-lg md:text-xl hover:text-secondary" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent text-primary flex items-center justify-center border-2 border-primary hover:bg-primary hover:text-secondary transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF className="text-lg md:text-xl hover:text-secondary" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent text-primary flex items-center justify-center border-2 border-primary hover:bg-primary hover:text-secondary transition-all duration-300 hover:scale-110"
              >
                <FaTiktok className="text-lg md:text-xl hover:text-secondary" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent text-primary flex items-center justify-center border-2 border-primary hover:bg-primary hover:text-secondary transition-all duration-300 hover:scale-110"
              >
                <FaYoutube className="text-lg md:text-xl hover:text-secondary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Concact