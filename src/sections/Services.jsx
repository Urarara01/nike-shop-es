import ServiceCard from "../components/ServiceCard"
import { services } from "../constants"

const Services = () => {
  return (
    <section className="max-container flex justify-center flex-wrap gap-9">
      {services.map((service, index) => (
        <div key={service.label} className="animate-fadeInUp" style={{animationDelay: `${index * 0.2}s`}}>
          <ServiceCard {...service}/>
        </div>
      ))}
    </section>
  )
}

export default Services
