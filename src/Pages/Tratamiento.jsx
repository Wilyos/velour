import Header from "../components/Header"
import { useState } from "react";
import Footer from "../components/Footer"
import bgProduct from '../assets/img/bg-product.png';
import ttmFront from '../assets/img/tratamiento.png';
import ttmBack from '../assets/img/tratamiento2.png';
import { FaStar } from "react-icons/fa";
import Concact from '../components/Concact.jsx';
import payCard from '../assets/iconos/pay-card.png'
import map from '../assets/iconos/map.png'
import send from '../assets/iconos/send.png'
import shopping from '../assets/iconos/shopping.png'

const Tratamiento = () => {

    
      const [mainImage, setMainImage] = useState(ttmFront);
    
  return (
    <>
        <Header />
        <section
        className="bg-white text-primary body-font overflow-hidden yanone-kaffeesatz bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgProduct})` }}
        >
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full flex flex-col items-center">
                  <img
                    alt="producto principal"
                    className="w-full h-auto object-cover rounded-xl"
                    src={mainImage}
                  />
    
                  <div className="flex justify-center gap-4 mt-4">
                    <img
                      src={ttmFront}
                      alt="Frente"
                      className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${mainImage === ttmFront ? 'border-secondary' : 'border-transparent'}`}
                      onClick={() => setMainImage(ttmFront)}
                    />
                    <img
                      src={ttmBack}
                      alt="Reverso"
                      className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${mainImage === ttmBack ? 'border-secondary' : 'border-transparent'}`}
                      onClick={() => setMainImage(ttmBack)}
                    />
                  </div>
    
                  <p className="text-center text-sm mt-2 text-black">Las imágenes se desplazan a medida que mira la info</p>
                </div>
    
                <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
                  <h2 className="text-lg font-bold tracking-widest uppercase">Inicio</h2>
                  <hr className="h-0.5 bg-secondary mb-4" />
                  <h1 className="text-3xl font-medium mb-1">Tratamiento Reparador</h1>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-accent text-xl" />
                    ))}
                    <span className="text-gray-600 ml-3">4.8 (4)</span>
                  </div>
    
                  <div className="leading-relaxed text-xl font-light text-black mb-6">
                    Repara el daño capilar causado por herramientas de calor como planchas, secadores o rizadores, restaurando la estructura interna del cabello desde la médula hasta la corteza. Su fórmula avanzada actúa profundamente, revitalizando la fibra capilar y devolviéndole fuerza, suavidad y elasticidad natural.
    
                    <br /><br />
                    Ideal para cabellos dañados por calor o procesos térmicos intensos. Tratamiento reparador intensivo..
                  </div>
    
                  <div className="flex items-center pb-5 ">
                    <span className="text-3xl font-medium text-primary">$69.900 COP</span>
                    <div className="ml-6">
                      <span className="mr-2">Tamaño</span>
                      <select className="rounded border border-secondary py-2 px-3">
                        <option>300 ml</option>
                      </select>
                    </div>
                    
                  </div>
                  <div className='pb-5 border-b-2 border-secondary mb-5'>
                    <button className="w-full text-white text-xl bg-secondary py-3 rounded hover:bg-morado transition">
                      Agregar al carrito
                    </button>
                  </div>
    
                  <div className="mt-10 pb-5 border-b-2 border-secondary ">
                    <h3 className="text-3xl font-semibold mb-2 ">Beneficios</h3>
                    <ul className="list-disc list-inside leading-relaxed">
                      <li className='text-black text-xl'>Reparación, fuerza y brillo capilar</li>
                      <li className='text-black text-xl'>Protección del color</li>
                      <li className='text-black text-xl'>Intensifica el brillo</li>
                      <li className='text-black text-xl'>Vitaminas: Biotina, Panthenol y Vitamina E</li>
                      <li className='text-black text-xl'>Control de caida</li>
                    </ul>
                  </div>
    
                  <div className="mt-6 pb-5 border-b-2 border-secondary ">
                    <h3 className="text-3xl font-semibold mb-2">Modo de uso</h3>
                    <p className='text-black text-xl font font-light'>
                      Lavar el cabello con shampoo, luego aplicar una cantidad considerable del tratamiento capilar sobre el cabello, masajear y dejar actuar
                    </p>
                  </div>
    
                  <div className="mt-6 pb-5 border-b-2 border-secondary ">
                    <h3 className="text-3xl font-semibold mb-2">Precauciones</h3>
                    <p className='text-black text-xl font font-light'>
                    Evitar el contacto con los ojos; si esto sucede enjuagar con abundante agua, en caso de irritación o reacción desfavorable suspender su uso y consulte a su médico, mantener fuera del alcance de los niños y mascotas, almacenar fuera de la luz directa del sol, en temperaturas inferiores a 30 ºC. Sólo uso externo, no ingerir. por el contenido de ingredientes naturales su tonalidad de color puede variar, no debe utilizarse en niños menores de 3 años 
                    </p>
                  </div>
    
                  <div className="mt-10 pb-5 border-b-2 border-secondary ">
                    <h3 className="text-3xl font-semibold mb-2 ">Ingredientes</h3>
                    <p className='text-xl font-light mb-2'>Algunos de los ingredientes activos principales</p>
                    <ul className="list-disc list-inside leading-relaxed">
                      <li className='text-black text-2xl'>Leche de Cabra</li>
                      <li className='text-black text-2xl'>Romero</li>
                      <li className='text-black text-2xl'>Embrión de Pato</li>
                      <li className='text-black text-2xl'>Aceite de Aloe vera</li>
                      <li className='text-black text-2xl'>Aceite de Argán</li>
                    </ul>
                  </div>
                </div>
              </div>
    
                  
              <div className="flex inset-0 opacity-10  mt-8"></div>
    
                {/* Contenido */}
                <div className="relative z-10 text-center">
                    <div className='flex flex-row place-content-around mb-32'>
                            <div className="content-start">
                                <h2 className="text-5xl font-semibold text-primary yanone-kaffeesatz tracking-wide">COMENTARIOS</h2>
                                <p className="text-2xl font-light text-black mt-1">4 Opiniones</p>
                            </div>
                            
                        <div className="flex justify-center items-center mt-4 gap-2">
                        <span className="bg-secondary text-4xl text-primary px-3 py-1 rounded font-semibold">4.8</span>
                        <div className="flex text-accent text-4xl">
                            {[...Array(5)].map((_, i) => (
                            <FaStar key={i} />
                            ))}
                        </div>
                        </div>
                    </div>
                    
                  {/* Beneficios */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-sm text-primary">
                    <div className="flex flex-row items-center ">
                      <img src={payCard} className="text-2xl mb-2 me-4" width='32px'/>
                      <span className='text-xl text-black'>Múltiples métodos de pago</span>
                    </div>
                    <div className="flex flex-row items-center  ">
                      <img src={map} className="text-2xl mb-2 me-4" width='32px'/>
                      <span className='text-xl text-black'>Rastrea tu pedido</span>
                    </div>
                    <div className="flex flex-row items-center ">
                      <img src={send} className="text-2xl mb-2 me-4" width='32px'/>
                      <span className='text-xl text-black'>Envíos a todo el país</span>
                    </div>
                    <div className="flex flex-row items-center ">
                      <img src={shopping} className="text-2xl mb-2 me-4" width='32px'/>
                      <span className='text-xl text-black'>Compra de forma segura</span>
                    </div>
                  </div>
                </div>
                          
    
              </div>
        </section>
        <Concact />
        <Footer />
    </>
  )
}

export default Tratamiento;