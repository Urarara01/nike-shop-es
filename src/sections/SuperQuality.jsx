import { shoe8 } from "../assets/images";
import Button from "../components/Button";

const SuperQuality = () => {
  return (
    <section
      id="nosotros"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      <div className="flex flex-1 flex-col animate-fadeInUp">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          Te Proporcionamos 
          <span className="bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow bg-clip-text text-transparent"> Zapatos de </span>
          <span className="bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow bg-clip-text text-transparent"> Súper Calidad</span>
        </h2>
        <p className="mt-4 lg:max-w-lg info-text text-lg">
          Garantizando comodidad y estilo premium, nuestro calzado meticulosamente elaborado
          está diseñado para elevar tu experiencia, proporcionándote calidad inigualable,
          innovación y un toque de elegancia.
        </p>
        <p className="mt-6 lg:max-w-lg info-text text-lg font-semibold">
          Nuestra dedicación al detalle y la excelencia garantiza tu satisfacción
        </p>

        <div className="mt-11">
          <Button label="Ver detalles"  />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center ">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-coral-red/20 via-neon-pink/20 to-electric-blue/20 rounded-full blur-3xl"></div>
          <img src={shoe8} alt="zapato8" width={570} height={522} className="object-contain relative z-10 animate-float drop-shadow-2xl"/>
        </div>
      </div>
    </section>
  );
};

export default SuperQuality;
