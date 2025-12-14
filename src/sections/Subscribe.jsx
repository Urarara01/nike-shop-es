import Button from "../components/Button"

const Subscribe = () => {
  return (
    <section id="contacto" className="max-container flex justify-between items-center max-lg:flex-col gap-10">
      <h3 className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold">
        Regístrate para Recibir
        <span className="bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow bg-clip-text text-transparent"> Actualizaciones </span> 
        y Boletín
      </h3>
      <div className="lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border-2 sm:border-violet-glow/30 rounded-full shadow-glow backdrop-blur-sm bg-white/50 transition-all duration-500 hover:shadow-electric hover:scale-105">
        <input 
          type="text" 
          placeholder="christiamaraujoh@gmail.com" 
          className="input font-medium" 
        />
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
          <Button label="Regístrate" fullwidth />
        </div>
      </div>
    </section>
  )
}

export default Subscribe
