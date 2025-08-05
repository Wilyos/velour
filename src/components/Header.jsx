import { MdOutlineAddShoppingCart } from "react-icons/md";
import { TbZoom } from "react-icons/tb";
import logob from '../assets/img/logo-banner.png';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-gray-600 body-font yanone-kaffeesatz bg-white">
      {/* Top nav */}
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">-</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">
            <MdOutlineAddShoppingCart className="text-primary font-semibold text-2xl cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300" />
          </a>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 px-3 focus:outline-none hover:bg-gray-200 rounded text-primary text-xl mt-4 md:mt-0">
          Search Store
          <TbZoom className="text-primary font-semibold ml-1" />
        </button>
      </div>

      {/* Fondo y logo */}
      <div className="bg-[url('/assets/fondo-logo.png')] bg-cover bg-center h-[150px] flex justify-center items-center">
        <img
          src={logob}
          alt="logo"
          className="w-2/3 max-w-[500px]"
        />

        {/* Redes sociales */}
        <div className="absolute top-30 right-20 flex gap-4  text-xl">
          <Link href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
            <FaFacebookF />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
            <FaInstagram />
          </Link>
          <Link href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
            <FaTiktok />
          </Link>
          <Link href="https://wa.me/573001112233" target="_blank" rel="noreferrer" className="text-[#5B1D1D] cursor-pointer transition ease-in-out delay-150 hover:text-accent hover:-translate-y-1 hover:scale-110 duration-300">
            <FaWhatsapp />
          </Link>
        </div>
      </div>
      <div>
          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-2xl justify-center font-semibold">
            <Link className="mr-1 text-primary hover:text-accent cursor-pointer transition ease-in-out delay-150" to='/'>Inicio</Link>
            <RxDotFilled className="mr-1 text-primary"/>
            <Link className="mr-1 text-primary hover:text-accent cursor-pointer transition ease-in-out delay-150" to='/shampoo'>Shampoo</Link>
            <RxDotFilled className="mr-1 text-primary"/>
            <Link className="mr-1 text-primary hover:text-accent cursor-pointer transition ease-in-out delay-150" to='/tratamiento' >Tratamiento</Link>
            <RxDotFilled className="mr-1 text-primary"/>
            <Link className="mr-1 text-primary hover:text-accent  cursor-pointer transition ease-in-out delay-150" to='/form' >Contacto</Link>
          </nav>
      </div>
      
    </header>
  );
};

export default Header;