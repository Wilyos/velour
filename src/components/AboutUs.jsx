import bannerA from '../assets/banners/banner-2.png';
import bannerB from '../assets/banners/banner-about-us.png';
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';


const AboutUs = () => {
  return (
    <>
    
        <section class="bg-white body-font">
            <div class="container px-5 py-12 mx-auto">
                <div class="flex flex-wrap -m-4">
                    <div class="lg:w-1/3 lg:mb-0 mb-6 p-4 px-24">
                        <div class="h-full text-center text-primary border-4 border-y-primary border-x-white">
                            <span class="inline-block h-1 w-10 rounded bg-primary  mb-4"></span>
                            <h1 className='yanone-kaffeesatz text-5xl font-semibold mb-4'>NUEVA RUTINA</h1>
                        
                            <h2 class="text-primary font-medium title-font tracking-wider text-2xl cormorant-garamond mb-7 leading-none">
                                Descubre el ritual perfecto para tu cabello
                            </h2>
                            <a href="#" className='text-primary yanone-kaffeesatz font-semibold'>Ver colección completa</a>
                        </div>
                    </div>
                    <div class="lg:w-1/3 lg:mb-0 mb-6 p-4 px-24">
                        <div class="h-full text-center text-accent border-4 border-y-accent border-x-white">
                            <span class="inline-block h-1 w-10 rounded bg-accent  mb-4"></span>
                            <h1 className='yanone-kaffeesatz text-5xl font-semibold mb-4'>NOS ENCANTA</h1>
                        
                            <h2 class="text-accent font-medium title-font tracking-wider text-2xl cormorant-garamond mb-7 leading-none">
                                Encuentra tus favoritos con el poder de la naturaleza
                            </h2>
                            <a href="#" className='text-accent yanone-kaffeesatz font-semibold'>Inspírate con Velour</a>
                        </div>
                    </div>
                    <div class="lg:w-1/3 lg:mb-0 mb-6 p-4 px-24">
                        <div class="h-full text-center text-morado border-4 border-y-morado border-x-white">
                            <span class="inline-block h-1 w-10 rounded bg-morado  mb-4"></span>
                            <h1 className='yanone-kaffeesatz text-5xl font-semibold mb-4'>VIVE DE VELOUR </h1>
                        
                            <h2 class="text-morado font-medium title-font tracking-wider text-2xl cormorant-garamond mb-7 leading-none">
                                Conviértete en distribuidor oficial y haz parte del cambio
                            </h2>
                            <a href="#" className='text-morado yanone-kaffeesatz font-semibold'>Compra al por mayor</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className='bg-white yanone-kaffeesatz'>
            <img src={bannerA} alt="info" />
            <div class="container px-40 py-24 mx-auto flex md:flex-row space-x-40 content-center items-center sm:flex-col">
                <div class="md:w-1/4 md:pl-6">
                    <h2 className='text-morado text-6xl font-semibold'>
                        Nuestras categorias
                    </h2>
                    <p class=" text-2xl">
                        Explora nuestros productos y encuentra todo lo que necesitas para reparar y cuidar tu cabello
                    </p>
                    <div class="flex md:mt-4 mt-6">
                        <button class="inline-flex text-secondary bg-morado border-0 py-1 px-4 focus:outline-none hover:bg-secondary hover:text-morado rounded-full items-center text-2xl">
                            Ver todo <HiArrowLongRight className='ms-1 text-3xl ' />
                        </button>
                    </div>
                </div>
                <div class="relative rounded-lg h-64 min-w-24 overflow-hidden">
                    <img alt="content" class="object-cover object-center h-full w-full z-0" src="/assets/about-model2.jpg" />
                    <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-morado text-secondary p-1 content-center items-center rounded-full text-2xl w-32 text-center  hover:bg-secondary hover:text-morado'>
                        <Link to="/shampoo" className=''>Shampoo</Link>
                    </div>
                </div>
                <div class="relative rounded-lg h-64 overflow-hidden">
                    <img alt="content" class="object-cover object-center h-full w-full" src="/assets/about-model1.png" />
                    <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-morado text-secondary p-1 content-center items-center rounded-full text-2xl w-32 text-center  hover:bg-secondary hover:text-morado'>
                        <Link to="/tratamiento" className=''>Tratamiento</Link>
                    </div>
                </div>
              
            </div>
            <img src={bannerB} alt="sobre nosotros" />
        </section>
    </>
  )
}

export default AboutUs