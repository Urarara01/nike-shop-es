import { headerLogo } from '../assets/images/'
import { hamburger } from "../assets/icons"  
import { navLinks } from '../constants'

const Nav = () => {
  return (
    <header className='padding-x py-8 absolute z-10 w-full'>
        <nav className='flex justify-between items-center max-container glass-effect rounded-2xl px-8 py-4 shadow-glow border border-white/20'>
            <a href="/" className='transition-transform hover:scale-110 duration-300'>
            <img src={headerLogo} alt="Logo"  width={130} height={28} className='drop-shadow-lg'/>
            </a>

            <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                {navLinks.map((item) => (
                    <li key={item.label}>
                        <a href={item.href} className='font-montserrat leading-normal text-lg font-semibold text-slate-800 hover:text-coral-red transition-all duration-300 relative group'>
                            {item.label}
                            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-coral-red to-neon-pink group-hover:w-full transition-all duration-300'></span>
                        </a>
                    </li>
                ))}
            </ul>
            <div className='hidden max-lg:block cursor-pointer hover:scale-110 transition-transform duration-300'>
                <img src={ hamburger }
                   alt="menú hamburguesa"
                   width={25}
                   height={25}
                />
            </div>
        </nav>
    </header>
  )
}

export default Nav;
