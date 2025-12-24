import { star } from "../assets/icons";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const PopularProductsCard = ({ imgURL, name, price, description, category }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ imgURL, name, price, description, category });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className='flex flex-1 flex-col w-full max-sm:w-full group cursor-pointer'>
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 transition-all duration-500 group-hover:shadow-hover group-hover:scale-105'>
        <div className='absolute inset-0 bg-gradient-to-tr from-coral-red/5 via-transparent to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
        {category && (
          <span className='absolute top-4 right-4 bg-gradient-to-r from-coral-red to-neon-pink text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold z-10'>
            {category}
          </span>
        )}
        <img src={imgURL} alt={name} className='w-full h-[282px] object-contain relative z-10 group-hover:scale-110 transition-transform duration-700' />
      </div>
      <div className='mt-8 flex justify-start gap-2.5'>
        <img src={star} alt='estrella' width={24} height={24} className='drop-shadow-md' />
        <p className='font-montserrat text-xl leading-normal text-slate-gray font-semibold'>(4.5)</p>
      </div>
      <h3 className='mt-2 text-2xl leading-normal font-semibold font-palanquin group-hover:text-coral-red transition-colors duration-300'>{name}</h3>
      {description && (
        <p className='mt-1 text-sm text-slate-gray/80 font-montserrat'>{description}</p>
      )}
      <div className='mt-3 flex items-center justify-between'>
        <p className='font-bold font-montserrat bg-gradient-to-r from-coral-red to-neon-pink bg-clip-text text-transparent text-2xl leading-normal'>{price}</p>
        <button
          onClick={handleAddToCart}
          className={`px-6 py-2 rounded-full font-montserrat font-semibold transition-all duration-300 ${
            isAdded 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-coral-red to-neon-pink text-white hover:shadow-hover hover:scale-105'
          }`}
        >
          {isAdded ? '✓ Agregado' : '+ Agregar'}
        </button>
      </div>
    </div>
  );
};

export default PopularProductsCard;
