import bgContacto from '../assets/img/bg-contact-form.png'
import Concact from '../components/Concact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import imgForm from '../assets/img/model-contact2.jpg'
import { useContactForm } from '../hooks/useContactForm'

const FormContact = () => {
  const { 
    formData, 
    isSubmitting, 
    submitStatus, 
    handleInputChange, 
    submitForm, 
    resetForm 
  } = useContactForm();

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
                        {/* Mensaje de estado */}
                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold">¡Mensaje enviado exitosamente!</span>
                                </div>
                                <p className="mt-2">Te contactaremos pronto. También recibirás un email de confirmación.</p>
                                <button 
                                    onClick={resetForm}
                                    className="mt-3 text-sm text-green-800 underline hover:no-underline"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-semibold">Error al enviar el mensaje</span>
                                </div>
                                <p className="mt-2">Por favor verifica que todos los campos estén completos e intenta nuevamente.</p>
                            </div>
                        )}

                        <form onSubmit={submitForm} className="space-y-4 md:space-y-5 bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg">
                            <div className="flex flex-col">
                                <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                    *Nombre completo
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ingresa tu nombre completo"
                                    className="rounded-lg bg-secondary/30 border border-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                <div className="flex flex-col">
                                    <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                        *No de Documento
                                    </label>
                                    <input
                                        type="text"
                                        name="documentNumber"
                                        value={formData.documentNumber}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Número de documento"
                                        className="rounded-lg bg-secondary/30 border border-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                        *Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="ejemplo@correo.com"
                                        className="rounded-lg bg-secondary/30 border border-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                    *No de Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="+57 300 123 4567"
                                    className="rounded-lg bg-secondary/30 border border-secondary px-4 py-3 outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-primary text-base md:text-lg font-semibold mb-2">
                                    *Mensaje
                                </label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Escribe tu mensaje aquí..."
                                    className="rounded-xl bg-secondary/30 border border-secondary px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto bg-gradient-to-r from-secondary to-white hover:from-secondary hover:to-secondary text-primary font-bold rounded-full px-8 md:px-20 lg:px-40 py-3 md:py-2 mx-auto block shadow-md text-lg md:text-2xl lg:text-3xl border-2 border-secondary transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            ENVIANDO...
                                        </div>
                                    ) : (
                                        'ENVIAR'
                                    )}
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