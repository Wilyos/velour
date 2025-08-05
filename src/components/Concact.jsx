import bgContact from '../assets/img/bg-concact.png';
import { FaFacebookF, FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";


const Concact = () => {
  return (
    <section class="text-primary yanone-kaffeesatz" style={{ backgroundImage: `url(${bgContact})`, opacity:50,  backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat", }}
>
        <div class="  z-10 container mx-auto flex flex-col px-4 py-24 justify-center items-center content-between">
            <h1 className=' text-6xl font-light mb-16'> <strong>SIGUENOS</strong> EN INSTAGRAM</h1>
            <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
                    <h1 class="title-font sm:text-4xl md:text-5xl  font-light mb-6 ">
                        <strong>RECIBE NUESTRAS OFERTAS EXCLUSIVAS</strong> 
                        <br />SIGAMOS CONECTADOS Y LOS MEJORES TIPS Y RUTINAS PARA CUIDAR TU CABELLO
                    </h1>
                    
                
                <div class="flex w-full justify-center items-end mb-18">
                    <div class="flex items-center w-full md:w-2/3 xl:w-1/2 bg-secondary/50 rounded-full border border-secondary overflow-hidden">
                        <input
                        type="text"
                        id="hero-field"
                        name="hero-field"
                        placeholder="✉Correo Electrónico"
                        class="w-full bg-transparent text-base outline-none text-gray-700 py-2 px-4"
                        />
                        <button class="bg-white text-primary font-bold px-6 py-2 rounded-none border-l border-secondary hover:bg-primary hover:text-secondary transition-colors duration-200 text-xl">
                            Suscribirse
                        </button>
                    </div>
                </div>

                
                <div class="flex flex-col mt-8 items-center text-center">
                    <h3 class="text-2xl font-semibold mb-4">SIGAMOS CONECTADOS</h3>  
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-transparent text-primary flex items-center justify-center border-primary border hover:bg-primary hover:text-white transition-colors duration-200">
                            <FaInstagram />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-transparent text-primary flex items-center justify-center border-primary border hover:bg-primary hover:text-white transition-colors duration-200">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-transparent text-primary flex items-center justify-center  border-primary border hover:bg-primary hover:text-white transition-colors duration-200">
                            <FaTiktok />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-transparent text-primary flex items-center justify-center border-primary border  hover:bg-primary hover:text-white transition-colors duration-200">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Concact