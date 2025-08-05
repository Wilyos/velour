import logoD from '../assets/img/logo-d.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white body-font bg-backgroundn yanone-kaffeesatz">
    <div className="container px-10 pt-10 pb-16 mx-auto flex flex-col md:flex-row md:items-center">
        
        {/* LOGO Y REDES */}
        <div className="w-full md:w-1/3 text-center md:text-left mb-10 md:mb-0">
        <a className="flex title-font font-medium items-start md:justify-start justify-center text-gray-900">
            <img src={logoD} width="700" height="auto" alt="logo" />
        </a>
        <p className="mt-6 font-light lg:text-2xl md:text-xl sm:text-base text-white">
            Velour nació con una visión clara: transformar el cuidado capilar a través de productos que conectan con la esencia natural de cada persona. Desde sus inicios, la marca ha mantenido el enfoque en brindar tratamientos capilares que combinen efectividad, belleza y autenticidad. Hoy, seguimos fieles a esa misión.
        </p>
        </div>

        {/* SEPARADOR */}
        <div className="hidden md:block h-auto w-0.5 bg-white/50 mx-4" />

        {/* COLUMNAS */}
        <div className="flex-grow flex flex-wrap md:flex-nowrap justify-between">
        
        {/* CATEGORÍAS */}
        <div className="w-full md:w-1/3 px-4 text-center md:text-left mb-6 md:mb-0">
            <h2 className="title-font font-medium text-white tracking-widest text-3xl mb-3">CATEGORÍAS</h2>
            <nav className="list-none text-2xl font-light">
            <li><Link className="text-white hover:text-accent cursor-pointer">Shampoo</Link></li>
            <li><Link className="text-white hover:text-accent cursor-pointer">Tratamiento</Link></li>
            </nav>
        </div>

        {/* SEPARADOR */}
        <div className="hidden md:block min-h-[160px] w-0.5 bg-white/50 mx-4" />

        {/* MENÚ */}
        <div className="w-full md:w-1/3 px-4 text-center md:text-left mb-6 md:mb-0">
            <h2 className="title-font font-medium text-white tracking-widest text-3xl mb-3">MENÚ</h2>
            <nav className="list-none text-2xl font-light">
            <li><Link className="text-white hover:text-accent cursor-pointer" to='/'>Principal</Link></li>
            <li><Link className="text-white hover:text-accent cursor-pointer" to='/shampoo'>Shampoo</Link></li>
            <li><Link className="text-white hover:text-accent cursor-pointer" to='/tratamiento'>Tratamiento</Link></li>
            <li><Link className="text-white hover:text-accent cursor-pointer" to='/contactus'>Contacto</Link></li>
            </nav>
        </div>

        {/* SEPARADOR */}
        <div className="hidden md:block h-auto w-0.5 bg-white/30 mx-4" />

        {/* CONTACTO */}
        <div className="w-full md:w-1/3 px-4 text-center md:text-left">
            <h2 className="title-font font-medium text-white tracking-widest text-3xl mb-3">INFORMACIÓN DE CONTACTO</h2>
            <nav className="list-none text-2xl font-light">
            <li><a className="text-white hover:text-accent cursor-pointer">Dirección</a></li>
            <li><a className="text-white hover:text-accent cursor-pointer">Teléfono</a></li>
            <li><a className="text-white hover:text-accent cursor-pointer">Correo</a></li>
            </nav>
        </div>
        </div>
    </div>

    {/* COPYRIGHT */}
    <div className="bg-backgroundn">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-500 text-sm text-center sm:text-left">© 2025 Velour — Todos los derechos reservados</p>
        </div>
    </div>
    </footer>

  )
}

export default Footer