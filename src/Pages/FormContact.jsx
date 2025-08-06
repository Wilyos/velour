import bgContacto from '../assets/img/bg-contact-form.png'
import Concact from '../components/Concact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import imgForm from '../assets/img/mujer-formulario.jpg'

const FormContact = () => {
  return (

    <>
        <Header />
         <section className="relative py-12 md:py-20 px-4 md:px-8 lg:px-24 yanone-kaffeesatz bg-cover min-h-screen flex flex-col justify-center" style={{ backgroundImage: `url(${bgContacto})` }}>
            {/* Overlay para mejor legibilidad */}
            <div className="absolute inset-0 bg-white/20"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-primary mb-8 md:mb-10 text-center lg:text-left">CONTÁCTENOS</h2>
                
                <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-10">
                    {/* Imagen */}
                    <div className="w-full lg:w-1/3 order-2 lg:order-1">
                        <img
                            src={imgForm}
                            alt="modelo"
                            className="rounded-2xl md:rounded-[2rem] object-cover w-full h-auto saturate-200 shadow-lg"
                        />
                    </div>

                    {/* Formulario */}
                    <div className="w-full lg:w-2/3 order-1 lg:order-2">
                        <form className="space-y-4 md:space-y-5 bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg">
                            <div className="flex flex-col">
                                <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                    *Nombre completo
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ingresa tu nombre completo"
                                    className="rounded-lg bg-secondary/30 border border-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                <div className="flex flex-col">
                                    <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                        *No de Documento
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Número de documento"
                                        className="rounded-lg bg-secondary/30 border border-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                        *Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="ejemplo@correo.com"
                                        className="rounded-lg bg-secondary/30 border border-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                    *No de Teléfono
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+57 300 123 4567"
                                    className="rounded-lg bg-secondary/30 border border-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                    *Mensaje
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    placeholder="Escribe tu mensaje aquí..."
                                    className="rounded-xl bg-secondary/30 border border-secondary px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-gradient-to-r from-secondary to-white hover:from-secondary hover:to-secondary text-primary font-bold rounded-full px-8 md:px-20 lg:px-40 py-3 md:py-2 mx-auto block shadow-md text-lg md:text-2xl lg:text-3xl border-2 border-secondary transition-all duration-300 hover:scale-105"
                                >
                                    ENVIAR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <Concact />
        <Footer />
    
    </>
  )
}

export default FormContact