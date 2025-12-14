import ReviewCard from "../components/ReviewCard"
import { reviews } from "../constants"

const CustomerReviews = () => {
  return (
    <section className="max-container">
      <h3 className="text-center font-palanquin text-4xl font-bold animate-fadeInUp">
        ¿Qué Dicen
        <span className="bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow bg-clip-text text-transparent"> Nuestros Clientes</span>?
      </h3>
      <p className="info-text m-auto mt-4 max-w-lg text-center text-lg animate-fadeInUp">
        Escucha historias genuinas de nuestros clientes satisfechos sobre sus
        experiencias excepcionales con nosotros.
      </p>

      <div className="mt-24 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14">
        {reviews.map((review, index) => (
          <div key={review.customerName} className="animate-fadeInUp" style={{animationDelay: `${index * 0.2}s`}}>
            <ReviewCard
              imgURL={review.imgURL}
              customerName={review.customerName}
              rating={review.rating}
              feedback={review.feedback}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default CustomerReviews
