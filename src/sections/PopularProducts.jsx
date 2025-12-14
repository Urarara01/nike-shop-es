import PopularProductsCard from "../components/PopularProductsCard"
import  { products }  from '../constants'

const PopularProducts = () => {
  return (
    <section id="productos" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5 animate-fadeInUp">
        <h2 className="text-4xl font-palanquin font-bold">
          Nuestros Productos <span className="bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow bg-clip-text text-transparent">Populares</span>
        </h2>
        <p className="max-w-lg mt-2 font-montserrat text-slate-gray text-lg">
          Experimenta la mejor calidad y estilo con nuestras selecciones más buscadas. 
          Descubre un mundo de comodidad, diseño y valor
        </p>
      </div>

      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
         {products.map((product, index) => (
          <div key={product.name} className="animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
            <PopularProductsCard {...product} />
          </div>
         ))}
      </div>
    </section>
  )
}

export default PopularProducts
