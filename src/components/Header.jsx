import { MdOutlineAddShoppingCart } from "react-icons/md";
import { TbZoom } from "react-icons/tb";
import { HiMenu, HiX } from "react-icons/hi";
import logob from '../assets/img/logo-banner.png';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearch } from '../Pages/SearchContext';




const Header = () => {

  const { searchTerm, setSearchTerm } = useSearch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setSearchTerm(e.target.value);
  }

  const handleSearch = () => {
    const term = searchTerm.trim();
    if (term) {
      // Meta Pixel: evento de búsqueda
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        try {
          window.fbq('track', 'Search', {
            search_string: term,
            content_category: 'Site Search'
          });
        } catch {}
      }
      navigate(`/search?q=${encodeURIComponent(term)}`);
      setIsMenuOpen(false); // Cerrar menú si está abierto
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const location = useLocation();

    

  return (
    <header className="text-primary body-font yanone-kaffeesatz bg-white w-full relative">
      {/* Top nav */}
      

      {/* Búsqueda móvil - aparece cuando el menú está abierto */}
      {isMenuOpen && (
        <div className="md:hidden px-3 pb-3">
          <div className="relative flex">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Buscar productos, secciones..."
              className="bg-secondary/50 px-4 py-2 rounded-l-md border-2 border-secondary focus:outline-none text-primary w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-white px-4 py-2 rounded-r-md text-primary hover:text-accent transition"
            >
              <TbZoom />
            </button>
          </div>
        </div>
      )}

      {/* Fondo y logo */}

      <div className="relative bg-[url('/assets/fondo-logo.png')] bg-cover bg-center h-[120px] md:h-[150px] flex flex-col md:flex-row justify-center items-center">
        <img
          src={logob}
          alt="logo"
          className="w-2/3 max-w-[300px] md:max-w-[500px] mx-auto"
        />
        {/* Redes y carrito/menú en barra inferior solo en móvil */}
        <div className="w-full flex justify-between items-center px-4 py-2 md:hidden absolute left-0 bottom-0">
          {/* Redes sociales a la izquierda */}
          <div className="flex gap-2 text-lg">
            <Link to="#" onClick={() => window.open('www.facebook.com/share/15HL8a5SZAe/?mibextid=wwXIfr', '_blank')} className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
              <FaFacebookF />
            </Link>
            <Link to="#" onClick={() => window.open('https://www.instagram.com/velourvitalize', '_blank')} className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
              <FaInstagram />
            </Link>
            <Link to="#" onClick={() => window.open('https://www.tiktok.com/@velourvitalize?_t=ZS-90bBGU2KWYP&_r=1', '_blank')} className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
              <FaTiktok />
            </Link>
           
          </div>
          {/* Carrito y menú hamburguesa a la derecha */}
          <div className="flex items-center gap-2">
            <a className="hover:text-gray-900">
              <MdOutlineAddShoppingCart className="text-primary font-semibold text-2xl cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300" />
            </a>
            <button
              onClick={toggleMenu}
              className="text-primary text-2xl transition ease-in-out delay-150 hover:text-accent"
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Redes sociales en desktop (posición original) */}
        <div className="hidden md:flex absolute top-8 right-20 gap-4 text-xl bg-transparent">
          <Link to="#" onClick={() => window.open('www.facebook.com/share/15HL8a5SZAe/?mibextid=wwXIfr', '_blank')} className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
            <FaFacebookF />
          </Link>
          <Link to="#" onClick={() => window.open('https://www.instagram.com/velourvitalize', '_blank')} className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
            <FaInstagram />
          </Link>
          <Link to="#" onClick={() => window.open('https://www.tiktok.com/@velourvitalize?_t=ZS-90bBGU2KWYP&_r=1', '_blank')} className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
            <FaTiktok />
          </Link>
          
        </div>
      </div>
      
      {/* Menú de navegación */}
      <div className="w-full">
        {/* Menú desktop - siempre visible en desktop */}
        <nav className="hidden md:flex items-center justify-center text-2xl font-semibold py-2">
          <Link className={`mr-1 ${location.pathname === '/' ? 'text-accent' : 'text-primary'} hover:text-accent cursor-pointer transition ease-in-out delay-150`} to='/'>Inicio</Link>
          <RxDotFilled className="mr-1 text-primary"/>
          <Link className={`mr-1 ${location.pathname === '/shampoo' ? 'text-accent' : 'text-primary'} hover:text-accent cursor-pointer transition ease-in-out delay-150`} to='/shampoo'>Shampoo</Link>
          <RxDotFilled className="mr-1 text-primary"/>
          <Link className={`mr-1 ${location.pathname === '/tratamiento' ? 'text-accent' : 'text-primary'} hover:text-accent cursor-pointer transition ease-in-out delay-150`} to='/tratamiento' >Tratamiento</Link>
          <RxDotFilled className="mr-1 text-primary"/>
          <Link className={`mr-1 ${location.pathname === '/form' ? 'text-accent' : 'text-primary'} hover:text-accent cursor-pointer transition ease-in-out delay-150`} to='/form' >Contacto</Link>
        </nav>
        
        {/* Menú móvil - solo visible cuando isMenuOpen es true */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col items-center justify-center text-xl font-semibold py-4 bg-white border-t border-secondary/20">
            <Link 
              className={`py-2 ${location.pathname === '/' ? 'text-accent' : 'text-primary'} hover:text-accent cursor-pointer transition ease-in-out delay-150`} 
              to='/'
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link 
              className={`py-2 ${location.pathname === '/shampoo' ? 'text-accent' : 'text-primary'} hover:text-accent cursor-pointer transition ease-in-out delay-150`} 
              to='/shampoo'
              onClick={closeMenu}
            >
              Shampoo
            </Link>
            <Link 
              className={`py-2 ${location.pathname === '/tratamiento' ? 'text-accent' : 'text-primary'} hover:text-accent cursor-pointer transition ease-in-out delay-150`} 
              to='/tratamiento'
              onClick={closeMenu}
            >
              Tratamiento
            </Link>
            <Link 
              className={`py-2 ${location.pathname === '/form' ? 'text-accent' : 'text-primary'} hover:text-accent cursor-pointer transition ease-in-out delay-150`} 
              to='/form'
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;