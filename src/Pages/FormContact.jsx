import bgContacto from '../assets/img/bg-contact-form.png'
import Concact from '../components/Concact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import imgForm from '../assets/img/mujer-formulario.jpg'

const FormContact = () => {
  return (

    <>
        <Header />
         <section className=" py-20 px-5 lg:px-24 yanone-kaffeesatz bg-cover" style={{ backgroundImage: `url(${bgContacto})` }}>
            <h2 className="text-5xl font-normal text-primary mb-10">CONTÁCTENOS</h2>
            
            <div className="flex flex-col lg:flex-row items-center gap-10">
                {/* Imagen */}
                <div className="w-full lg:w-1/3">
                    <img
                        src={imgForm}
                        alt="modelo"
                        className="rounded-[2rem] object-cover w-full h-auto saturate-200"
                    />
                </div>

                {/* Formulario */}
                <form className="w-full lg:w-2/3 space-y-5 ">
                    <div className="flex flex-col">
                        <label className="text-primary text-lg font-semibold">
                        *Nombre completo
                        </label>
                        <input
                        type="text"
                        className="rounded-lg bg-secondary/30 border border-secondary px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-primary  text-lg font-semibold">
                        *No de Documento
                        </label>
                        <input
                        type="text"
                        className="rounded-lg bg-secondary/30 border border-secondary px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-primary  text-lg font-semibold">
                        *Email
                        </label>
                        <input
                        type="email"
                        className="rounded-lg bg-secondary/30 border border-secondary px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-primary  text-lg font-semibold">
                        *No de Teléfono
                        </label>
                        <input
                        type="tel"
                        className="rounded-lg bg-secondary/30 border border-secondary px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-primary  text-lg font-semibold">
                        *Mensaje
                        </label>
                        <textarea
                        rows={4}
                        className="rounded-xl bg-secondary/30 border border-secondary px-4 py-2 outline-none resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-secondary to-white hover:from-secondary hover:to-secondary text-primary font-bold rounded-full px-40 py-2 mx-auto block shadow-md text-3xl border-2 border-secondary"
                    >
                        ENVIAR
                    </button>
                </form>
            </div>
        </section>
        <Concact />
        <Footer />
    
    </>
  )
}

export default FormContact