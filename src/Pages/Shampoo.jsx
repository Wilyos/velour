import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import bgProduct from '../assets/img/bg-product.png';
import shampooFront from '../assets/img/shampov2front.png';
import shampooBack from '../assets/img/shampov2back.png';
import { FaStar } from "react-icons/fa";
import Contact from '../components/Concact.jsx';
import payCard from '../assets/iconos/pay-card.png'
import map from '../assets/iconos/map.png'
import send from '../assets/iconos/send.png'
import shopping from '../assets/iconos/shopping.png'
import { useSearch } from './SearchContext.jsx';

const Shampoo = () => {
  const [mainImage, setMainImage] = useState(shampooFront);
  const {searchTerm} = useSearch();

  // Meta Pixel: ViewContent al montar la página de Shampoo
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    window.__fbqOnce = window.__fbqOnce || {};
    const key = 'view_shampoo';
    if (window.__fbqOnce[key]) return;
    try {
      window.fbq('track', 'ViewContent', {
        content_name: 'Shampoo Revitalizador',
        content_category: 'Shampoo',
        content_ids: ['shampoo'],
        content_type: 'product',
        value: 60000,
        currency: 'COP'
      });
      window.__fbqOnce[key] = true;
    } catch {}
  }, []);

  const beneficiosFiltrados = [
    'Mejora fuerza y brillo capilar',
    'Mayor resistencia capilar, intensifica brillo',
    'Protección térmica capilar',
    'Disciplina hebras'
  ].filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <section
        className="bg-white text-primary body-font overflow-hidden yanone-kaffeesatz bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${bgProduct})` }}
      >
        <div className="container px-5 py-12 md:py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-col lg:flex-row gap-8">
            {/* Sección de imágenes */}
            <div className="lg:w-1/2 w-full flex flex-col items-center">
              <div className="w-full max-w-md">
                <img
                  alt="producto principal"
                  className="w-full h-auto object-cover rounded-xl shadow-lg bg-secondary/10"
                  src={mainImage}
                />

                <div className="flex justify-center gap-4 mt-4">
                  <img
                    src={shampooFront}
                    alt="Frente"
                    className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer border-2 transition-all hover:scale-105 ${mainImage === shampooFront ? 'border-secondary' : 'border-transparent'}`}
                    onClick={() => setMainImage(shampooFront)}
                  />
                  <img
                    src={shampooBack}
                    alt="Reverso"
                    className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer border-2 transition-all hover:scale-105 ${mainImage === shampooBack ? 'border-secondary' : 'border-transparent'}`}
                    onClick={() => setMainImage(shampooBack)}
                  />
                </div>

                <p className="text-center text-sm mt-3 text-gray-600 italic">
                  Haz clic en las imágenes para ver más detalles
                </p>
              </div>
            </div>

            {/* Sección de información del producto */}
            <div className="lg:w-1/2 w-full lg:pl-6">
              {/* Breadcrumb */}
              <div className="mb-4">
                <h2 className="text-lg font-bold tracking-widest uppercase text-primary">Inicio</h2>
                <hr className="h-0.5 bg-secondary mb-4" />
              </div>

              {/* Título y calificación */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-medium mb-3 text-primary">Shampoo Revitalizador</h1>
                <div className="flex items-center mb-4">
                  <div className="flex text-accent text-lg">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-3 text-sm">4.8 (5 reseñas)</span>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <p className="leading-relaxed text-base md:text-lg font-light text-black">
                  Fórmula revitalizadora diseñada para activar la raíz y reducir la caída capilar. El shampoo de Velour combina almidón de maíz y arroz que ayuda a equilibrar el exceso de grasa, mientras que las proteínas hidrolizadas de trigo y arroz fortalecen desde la raíz y mejoran la textura del cabello.
                  <br /><br />
                  Su innovador complejo con extracto de microalgas nutre profundamente, disminuyendo el quiebre por peinado y devolviendo vitalidad a tu cabello. Ideal para todo tipo de cabello.
                </p>
              </div>

              {/* Precio y opciones */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 mb-5">
                <span className="text-2xl md:text-3xl font-medium text-primary">$29.900 COP</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Tamaño:</span>
                  <select className="rounded border border-secondary py-2 px-3 text-sm bg-white">
                    <option>500 ml</option>
                  </select>
                </div>
              </div>

              {/* Botón de compra */}
              <div className="pb-5 border-b-2 border-secondary mb-6">
                <button className="w-full text-white text-lg md:text-xl bg-secondary py-3 rounded hover:bg-morado transition-colors duration-300 font-medium">
                  Agregar al carrito
                </button>
              </div>

              {/* Secciones de información */}
              <div className="space-y-6">
                {/* Beneficios */}
                <div id="beneficios" className="border-b-2 border-secondary pb-5">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-primary">Beneficios</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start text-black text-base md:text-lg">
                      <span className="text-accent mr-2">•</span>
                      Mejora fuerza y brillo capilar
                    </li>
                    <li className="flex items-start text-black text-base md:text-lg">
                      <span className="text-accent mr-2">•</span>
                      Mayor resistencia capilar, intensifica brillo
                    </li>
                    <li className="flex items-start text-black text-base md:text-lg">
                      <span className="text-accent mr-2">•</span>
                      Protección térmica capilar
                    </li>
                    <li className="flex items-start text-black text-base md:text-lg">
                      <span className="text-accent mr-2">•</span>
                      Disciplina hebras
                    </li>
                  </ul>
                </div>

                {/* Modo de uso */}
                <div id="modo-uso" className="border-b-2 border-secondary pb-5">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-primary">Modo de uso</h3>
                  <p className="text-black text-base md:text-lg font-light leading-relaxed">
                    Humedecer el cabello aplicar el Shampoo Capilar sobre el cuero cabelludo y masajear suavemente con la yema de los dedos, dejando que sus componentes y propiedades actúen, finalmente enjuagar con abundante agua.
                  </p>
                </div>

                {/* Precauciones */}
                <div id="precauciones" className="border-b-2 border-secondary pb-5">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-primary">Precauciones</h3>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-black text-sm md:text-base font-light leading-relaxed">
                      Evitar el contacto con los ojos: si esto sucede enjuagar con abundante agua, en caso de irritación o reacción desfavorable suspender su uso y consulte a su médico, mantener fuera del alcance de los niños y mascotas, almacenar fuera de la luz directa del sol, en temperaturas inferiores a 30°C. Sólo uso externo, no ingerir. Por el contenido de ingredientes naturales su tonalidad de color puede variar. No debe utilizarse en niños menores de 3 años.
                    </p>
                  </div>
                </div>

                {/* Ingredientes */}
                <div id="ingredientes" className="pb-5">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-primary">Ingredientes</h3>
                  <p className="text-lg md:text-xl font-light mb-3 text-gray-700">Algunos de los ingredientes activos principales</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <span className="text-black text-base md:text-lg">Almidón de maíz y arroz</span>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <span className="text-black text-base md:text-lg">Proteínas hidrolizadas</span>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <span className="text-black text-base md:text-lg">Extracto de microalgas</span>
                    </div>
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <span className="text-black text-base md:text-lg">Complejos fortificantes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

              
          {/* Sección de comentarios y calificaciones */}
          <div id="comentarios" className="mt-16 mb-12">
            <div className="max-w-4xl mx-auto">
              {/* Header de comentarios */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-semibold text-primary yanone-kaffeesatz tracking-wide">COMENTARIOS</h2>
                  <p className="text-xl md:text-2xl font-light text-black mt-1">5 Opiniones</p>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-secondary text-3xl md:text-4xl text-primary px-4 py-2 rounded font-semibold">4.8</span>
                    <div className="flex text-accent text-2xl md:text-4xl">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Calificación promedio</p>
                </div>
              </div>

              {/* Aquí podrías agregar comentarios individuales en el futuro */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-center text-gray-600 italic">
                  Los comentarios de clientes aparecerán aquí próximamente
                </p>
              </div>
            </div>
          </div>

          {/* Sección de beneficios de compra */}
          <div className="bg-gray-50 py-12 rounded-lg">
            <div className="max-w-6xl mx-auto px-4">
              <h3 className="text-3xl font-semibold text-primary text-center mb-8 yanone-kaffeesatz">
                ¿POR QUÉ COMPRAR CON NOSOTROS?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col md:flex-row items-center text-center md:text-left bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={payCard} className="mb-3 md:mb-0 md:mr-4" width='40px' alt="Métodos de pago"/>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-1">Pagos seguros</h4>
                    <span className="text-base text-gray-700">Múltiples métodos de pago</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center text-center md:text-left bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={map} className="mb-3 md:mb-0 md:mr-4" width='40px' alt="Rastreo"/>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-1">Rastreo en tiempo real</h4>
                    <span className="text-base text-gray-700">Rastrea tu pedido</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center text-center md:text-left bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={send} className="mb-3 md:mb-0 md:mr-4" width='40px' alt="Envíos"/>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-1">Envíos nacionales</h4>
                    <span className="text-base text-gray-700">Envíos a todo el país</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center text-center md:text-left bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={shopping} className="mb-3 md:mb-0 md:mr-4" width='40px' alt="Compra segura"/>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-1">Compra protegida</h4>
                    <span className="text-base text-gray-700">Compra de forma segura</span>
                  </div>
                </div>
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
