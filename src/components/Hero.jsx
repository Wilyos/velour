
import fondo from '../assets/banners/banner-pp-v3.png';
import fondoMovil from '../assets/banners/banner-v.png';


const Hero = () => {
  return (
    <div className="hero min-h-1/2">
      {/* Desktop */}
      <img
        src={fondo}
        alt="banner desktop"
        className="w-full hidden sm:block"
      />
      {/* Mobile */}
      <img
        src={fondoMovil}
        alt="banner móvil"
        className="w-full block sm:hidden"
      />
    </div>
  );
}

export default Hero