import { arrowRight } from "../assets/icons"
import { bigShoe1 } from "../assets/images"
import Button from "../components/Button"
import ShoeCard from "../components/ShoeCard"
import { shoes, statistics } from "../constants"
import { useState } from "react"

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1)
  
  return (
    <section id="inicio" className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container">
      {/* Lado izquierdo */}
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28 animate-fadeInUp">
        <p className="text-xl font-montserrat font-bold bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          Nuestra Colección de Verano
        </p>
        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10 drop-shadow-2xl">Los Nuevos Llegados</span>
          <br />
          <span className="bg-gradient-to-r from-coral-red via-neon-pink to-electric-blue bg-clip-text text-transparent inline-block mt-3 animate-gradient bg-[length:200%_auto]">Nike</span> Zapatos
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Descubre los elegantes diseños Nike, comodidad de calidad e innovación para tu vida activa.
        </p>
        <Button label="Comprar ahora" iconURL={arrowRight}/>

        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat, index) => (
            <div key={stat.label} className="group" style={{animationDelay: `${index * 0.2}s`}}>  
              <p className="text-4xl font-palanquin font-bold bg-gradient-to-r from-coral-red to-neon-pink bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray group-hover:text-coral-red transition-colors duration-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-gradient-to-br from-primary via-pale-blue to-white bg-hero bg-cover bg-center rounded-3xl shadow-glow">
        <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/10 via-transparent to-neon-pink/10 rounded-3xl"></div>
        <img src={bigShoeImg} alt="colección de zapatos" width={610} height={500} className="object-contain relative z-10 animate-float drop-shadow-2xl" />

        <div className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6">
          {shoes.map((shoe, index) => (
            <div key={index}>
              <ShoeCard 
                imgURL={shoe}
                changeBigShowImage={(shoe) => setBigShoeImg(shoe)}
                bigShoeImg={bigShoeImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
