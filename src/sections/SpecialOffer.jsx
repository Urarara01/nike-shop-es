import { arrowRight } from "../assets/icons"
import { offer } from "../assets/images"
import Button from "../components/Button"

const SpecialOffer = () => {
  return (
    <section className="flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container">
      <div className="flex-1 ">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 via-neon-pink/20 to-violet-glow/20 rounded-3xl blur-3xl"></div>
          <img src={offer} alt="oferta especial" width={773} height={687} className="object-contain w-full relative z-10 animate-float drop-shadow-2xl" />
        </div>
      </div>
      <div className="flex flex-1 flex-col animate-fadeInUp">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          <span className="bg-gradient-to-r from-electric-blue via-neon-pink to-violet-glow bg-clip-text text-transparent"> Oferta </span>
          Especial
        </h2>
        <p className="mt-4 lg:max-w-lg info-text text-lg">
          Embárcate en un viaje de compras que redefine tu experiencia con
          ofertas inmejorables. Desde selecciones premium hasta ahorros increíbles,
          ofrecemos un valor incomparable que nos distingue.
        </p>
        <p className="mt-6 lg:max-w-lg info-text text-lg font-semibold">
          Navega por un mundo de posibilidades diseñado para satisfacer tus
          deseos únicos, superando las expectativas más altas. Tu viaje con
          nosotros no es nada menos que excepcional.
        </p>

        <div className="mt-11 flex flex-wrap gap-4">
          <Button label="Ver detalles" iconURL={arrowRight}  />
          <Button 
            label="Aprende más" 
            backgroundColor="bg-white hover:bg-gradient-to-r hover:from-white hover:to-gray-50" 
            borderColor="border-violet-glow/50 hover:border-violet-glow" 
            textColor="text-slate-gray hover:text-violet-glow" 
          />
        </div>
      </div>
    </section>
  )
}

export default SpecialOffer
