import bgContact from '../assets/img/bg-concact.png';
import { FaFacebookF, FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";


const Concact = () => {
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
          <div className="flex w-full justify-center items-center mb-8 md:mb-12 px-2">
            <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl bg-secondary/50 rounded-full border border-secondary overflow-hidden">
              <input
                type="email"
                id="hero-field"
                name="hero-field"
                placeholder="✉ Correo Electrónico"
                className="w-full bg-transparent text-base outline-none text-gray-700 py-3 px-4 sm:py-2 text-center sm:text-left"
              />
              <button className="w-full sm:w-auto bg-white text-primary font-bold px-6 py-3 sm:py-2 rounded-none border-l-0 sm:border-l border-secondary hover:bg-primary hover:text-secondary transition-colors duration-200 text-lg md:text-xl">
                Suscribirse
              </button>
            </div>
          </div>
          
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
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent text-primary flex items-center justify-center border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="text-lg md:text-xl" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent text-primary flex items-center justify-center border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF className="text-lg md:text-xl" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent text-primary flex items-center justify-center border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaTiktok className="text-lg md:text-xl" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-transparent text-primary flex items-center justify-center border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <FaYoutube className="text-lg md:text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Concact