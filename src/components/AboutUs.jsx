import bannerA from '../assets/banners/banner-av2.png';
import bannerB from '../assets/banners/bannerb-v2.png';
import bannerAMovil from '../assets/banners/banner-v2.png';
import bannerBMovil from '../assets/banners/banner-v3.png';
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';


const AboutUs = () => {
  return (
    <>
    
        <section className='bg-gradient-to-b from-white via-secondary to-white yanone-kaffeesatz'>
            <div class="container lg:px-40 md:px-20 px-5 lg:py-24 md:py-16 py-12 mx-auto flex lg:flex-row md:flex-col flex-col lg:space-x-40 md:space-x-0 space-x-0 lg:space-y-0 md:space-y-8 space-y-6 content-center items-center">
                <div class="lg:w-1/4 md:w-full w-full lg:pl-6 md:pl-0 pl-0 lg:text-left md:text-center text-center">
                    <h2 className='text-morado lg:text-6xl md:text-5xl text-4xl font-semibold lg:mb-4 md:mb-3 mb-2'>
                        Nuestras categorias
                    </h2>
                    <p class="lg:text-2xl md:text-xl text-lg lg:mb-0 md:mb-6 mb-4">
                        Explora nuestros productos y encuentra todo lo que necesitas para reparar y cuidar tu cabello
                    </p>
                    <div class="flex lg:mt-4 md:mt-6 mt-4 lg:justify-start md:justify-center justify-center">
                        <button class="inline-flex text-secondary bg-morado border-0 lg:py-1 lg:px-4 md:py-2 md:px-6 py-2 px-4 focus:outline-none hover:bg-secondary hover:text-morado rounded-full items-center lg:text-2xl md:text-xl text-lg">
                            Ver todo <HiArrowLongRight className='ms-1 lg:text-3xl md:text-2xl text-xl' />
                        </button>
                    </div>
                </div>
                <div class="relative rounded-lg lg:h-64 md:h-48 h-40 lg:min-w-24 md:w-48 w-40 overflow-hidden mx-auto">
                    <img alt="content" class="object-cover object-center h-full w-full z-0" src="/assets/model22.png" />
                    <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-morado text-secondary p-1 content-center items-center rounded-full lg:text-2xl md:text-xl text-lg lg:w-32 md:w-28 w-24 text-center hover:bg-secondary hover:text-morado'>
                        <Link to="/shampoo" className=''>Shampoo</Link>
                    </div>
                </div>
                <div class="relative rounded-lg lg:h-64 md:h-48 h-40 lg:w-auto md:w-48 w-40 overflow-hidden mx-auto">
                    <img alt="content" class="object-cover object-center h-full w-full" src="/assets/model1.png" />
                    <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-morado text-secondary p-1 content-center items-center rounded-full lg:text-2xl md:text-xl text-lg lg:w-32 md:w-28 w-24 text-center hover:bg-secondary hover:text-morado'>
                        <Link to="/tratamiento" className=''>Tratamiento</Link>
                    </div>
                </div>
              
            </div>
            {/* Desktop bannerA */}
            <img src={bannerA} alt="info" className="w-full hidden sm:block" />
            {/* Mobile bannerA */}
            <img src={bannerAMovil} alt="info móvil" className="w-full block sm:hidden" />
            
            <div class="container px-5 py-12 mx-auto bg-secondary body-font">
                <div class="flex flex-wrap -m-4">
                    <div class="lg:w-1/3 md:w-1/2 w-full lg:mb-0 mb-6 p-4 lg:px-24 md:px-12 px-6">
                        <div class="h-full text-center text-primary border-4 border-y-primary border-x-secondary">
                            <span class="inline-block h-1 w-10 rounded bg-primary mb-4"></span>
                            <h1 className='yanone-kaffeesatz lg:text-5xl md:text-4xl text-3xl font-semibold mb-4'>NUEVA RUTINA</h1>
                        
                            <h2 class="text-primary font-medium title-font tracking-wider lg:text-2xl md:text-xl text-lg cormorant-garamond mb-7 leading-none">
                                Descubre el ritual perfecto para tu cabello
                            </h2>
                            <a href="#" className='text-primary yanone-kaffeesatz font-semibold lg:text-base md:text-sm text-sm'>Ver colección completa</a>
                        </div>
                    </div>
                    <div class="lg:w-1/3 md:w-1/2 w-full lg:mb-0 mb-6 p-4 lg:px-24 md:px-12 px-6">
                        <div class="h-full text-center text-accent border-4 border-y-accent border-x-secondary">
                            <span class="inline-block h-1 w-10 rounded bg-accent mb-4"></span>
                            <h1 className='yanone-kaffeesatz lg:text-5xl md:text-4xl text-3xl font-semibold mb-4'>NOS ENCANTA</h1>
                        
                            <h2 class="text-accent font-medium title-font tracking-wider lg:text-2xl md:text-xl text-lg cormorant-garamond mb-7 leading-none">
                                Encuentra tus favoritos con el poder de la naturaleza
                            </h2>
                            <a href="#" className='text-accent yanone-kaffeesatz font-semibold lg:text-base md:text-sm text-sm'>Inspírate con Velour</a>
                        </div>
                    </div>
                    <div class="lg:w-1/3 md:w-full w-full lg:mb-0 mb-6 p-4 lg:px-24 md:px-12 px-6">
                        <div class="h-full text-center text-morado border-4 border-y-morado border-x-secondary">
                            <span class="inline-block h-1 w-10 rounded bg-morado mb-4"></span>
                            <h1 className='yanone-kaffeesatz lg:text-5xl md:text-4xl text-3xl font-semibold mb-4'>VIVE DE VELOUR</h1>
                        
                            <h2 class="text-morado font-medium title-font tracking-wider lg:text-2xl md:text-xl text-lg cormorant-garamond mb-7 leading-none">
                                Conviértete en distribuidor oficial y haz parte del cambio
                            </h2>
                            <a href="#" className='text-morado yanone-kaffeesatz font-semibold lg:text-base md:text-sm text-sm'>Compra al por mayor</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gradient-to-b from-secondary to-white'>
                {/* Desktop bannerB */}
                <img src={bannerB} alt="sobre nosotros" className="w-full hidden sm:block" />
                {/* Mobile bannerB */}
                <img src={bannerBMovil} alt="sobre nosotros móvil" className="w-full block sm:hidden" />
            </div>
        </section>
        
    </>
  )
}

export default AboutUs