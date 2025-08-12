import fondo from '../assets/banners/banner-hero-2.png'

const Hero = () => {
  return (
   <div
        class="hero min-h-1/2"
       
      >
          <img
          src={fondo}
          alt="logo"
          className="w-full"
        />
    </div>
  )
}

export default Hero