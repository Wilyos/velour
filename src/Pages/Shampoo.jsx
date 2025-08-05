import { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import bgProduct from '../assets/img/bg-product.png';
import shampooFront from '../assets/img/fondo-mg.png';
import shampooBack from '../assets/img/fondo-mg.png';
import { FaStar } from "react-icons/fa";
import Contact from '../components/Concact.jsx';
import payCard from '../assets/iconos/pay-card.png'
import map from '../assets/iconos/map.png'
import send from '../assets/iconos/send.png'
import shopping from '../assets/iconos/shopping.png'

const Shampoo = () => {
  const [mainImage, setMainImage] = useState(shampooFront);

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
                className="w-full h-auto object-cover rounded"
                src={mainImage}
              />

              <div className="flex justify-center gap-4 mt-4">
                <img
                  src={shampooFront}
                  alt="Frente"
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${mainImage === shampooFront ? 'border-secondary' : 'border-transparent'}`}
                  onClick={() => setMainImage(shampooFront)}
                />
                <img
                  src={shampooBack}
                  alt="Reverso"
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${mainImage === shampooBack ? 'border-secondary' : 'border-transparent'}`}
                  onClick={() => setMainImage(shampooBack)}
                />
              </div>

              <p className="text-center text-sm mt-2 text-black">Las imágenes se desplazan a medida que mira la info</p>
            </div>

            <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
              <h2 className="text-lg font-bold tracking-widest uppercase">Inicio</h2>
              <hr className="h-0.5 bg-secondary mb-4" />
              <h1 className="text-3xl font-medium mb-1">Shampoo Revitalizador</h1>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-accent text-xl" />
                ))}
                <span className="text-gray-600 ml-3">4.8 (5)</span>
              </div>

              <p className="leading-relaxed text-xl font-light text-black mb-6">
                Fórmula revitalizadora diseñada para activar la raíz y reducir la caída capilar...Fórmula revitalizadora diseñada para activar la raíz y reducir la caída capilar. El shampoo de Velour combina almidón de maíz y arroz que ayuda a equilibrar el exceso de grasa, mientras que las proteínas hidrolizadas de trigo y arroz fortalecen desde la raíz y mejoran la textura del cabello. Su innovador complejo con extracto de microalgas nutre profundamente, disminuyendo el quiebre por peinado y devolviendo vitalidad a tu cabelloz. 

                <br /><br />
                Ideal para todo tipo de cabello. Aporta brillo, frescura y un volumen saludable con cada uso, dejando tu cabello más fuerte, ligero y naturalmente renovado.
              </p>

              <div className="flex items-center pb-5 ">
                <span className="text-3xl font-medium text-primary">$60.000 COP</span>
                <div className="ml-6">
                  <span className="mr-2">Tamaño</span>
                  <select className="rounded border border-secondary py-2 px-3">
                    <option>500 ml</option>
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
                  <li className='text-black text-xl'>Mejora fuerza y brillo capilar</li>
                  <li className='text-black text-xl'>Mayor resistencia capilar, intensifica brillo</li>
                  <li className='text-black text-xl'>Protección térmica capilar</li>
                  <li className='text-black text-xl'>Disciplina hebras</li>
                </ul>
              </div>

              <div className="mt-6 pb-5 border-b-2 border-secondary ">
                <h3 className="text-3xl font-semibold mb-2">Modo de uso</h3>
                <p className='text-black text-xl font font-light'>
                  Humedecer el cabello aplicar el Shampoo Capilar sobre el cuero cabelludo y masajear suavemente con la yema de los dedos, dejando que sus componentes y propiedades actúen, finalmente enjugar con abundante agua.
                </p>
              </div>

              <div className="mt-6 pb-5 border-b-2 border-secondary ">
                <h3 className="text-3xl font-semibold mb-2">Precauciones</h3>
                <p className='text-black text-xl font font-light'>
                 Evitar el contacto con los ojos: si esto sucede enjuagar con abundante agua, en caso de irritación o reacción desfavorable suspender su uso y consulte a su médico, mantener fuera del alcance de los niños y mascotas, almacenar fuera de la luz directa del sol, en temperaturas inferiores a 30°C. Sólo uso extremo, no ingerir. Por el contenido de ingredientes naturales su tonalidad de color puede variar. No debe utilizarse en niños menores de 3 años.
                </p>
              </div>

              <div className="mt-10 pb-5 border-b-2 border-secondary ">
                <h3 className="text-3xl font-semibold mb-2 ">Ingredientes</h3>
                <p className='text-xl font-light mb-2'>Algunos de los ingredientes activos principales</p>
                <ul className="list-disc list-inside leading-relaxed">
                  <li className='text-black text-2xl'>Mejora fuerza y brillo capilar</li>
                  <li className='text-black text-2xl'>Mayor resistencia capilar, intensifica brillo</li>
                  <li className='text-black text-2xl'>Protección térmica capilar</li>
                  <li className='text-black text-2xl'>Disciplina hebras</li>
                </ul>
              </div>
            </div>
          </div>

              
          <div className="flex inset-0 opacity-10  mt-8"></div>

            {/* Contenido */}
            <div className="relative z-10 text-center">

              <div className='flex flex-row place-content-around mb-32'>
                      <div className='content-start'>
                          <h2 className="text-5xl font-semibold text-primary yanone-kaffeesatz tracking-wide">COMENTARIOS</h2>
                          <p className="text-2xl font-light text-black mt-1">5 Opiniones</p>
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
      <Contact />
      <Footer />
    </>
  );
};

export default Shampoo;
