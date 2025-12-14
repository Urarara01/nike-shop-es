import { copyrightSign } from "../assets/icons"
import { footerLogo } from "../assets/images"
import { footerLinks, socialMedia } from "../constants"

const Footer = () => {
  return (
    <footer className="max-container">
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
        <div className="flex flex-col items-start">
          <a href="/" className="transition-transform hover:scale-110 duration-300">
            <img src={footerLogo} alt="logo" width={150} height={46} className="drop-shadow-2xl" />
          </a>
          <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
            Prepárate para el nuevo período en tu tienda Nike más cercana. 
            Encuentra tu talla perfecta en tienda. Obtén recompensas
          </p>

          <div className="flex items-center gap-5 mt-8">
            {socialMedia.map((icon, index) => (
              <div key={index} className="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-white via-gray-100 to-white rounded-full cursor-pointer transition-all duration-300 hover:scale-125 hover:shadow-electric hover:rotate-12">
                <img
                  src={icon.src} 
                  alt={icon.alt}
                  width={24}
                  height={24} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-montserrat text-2xl leading-normal font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li 
                    key={link.name} 
                    className="mt-3 text-white-400 font-montserrat text-base leading-normal hover:text-white hover:translate-x-2 cursor-pointer transition-all duration-300"
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center border-t border-white/10 pt-8">
        <div className="flex flex-1 justify-start items-center font-montserrat cursor-pointer gap-2 hover:text-white transition-colors duration-300">
          <img 
            src={copyrightSign} 
            alt="signo de derechos de autor"
            width={20}
            height={20}
            className="rounded-full m-0"
          />
          <p>Copyright Not Found 2025. Todos los derechos reservados.</p>
        </div>
        <p className="font-montserrat cursor-pointer hover:text-white transition-colors duration-300">Términos y Condiciones</p>
      </div>
    </footer>
  )
}

export default Footer
