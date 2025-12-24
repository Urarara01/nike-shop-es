import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { getCartItemsCount, toggleCart } = useCart();
  const itemCount = getCartItemsCount();

  return (
    <button
      onClick={toggleCart}
      className="relative p-3 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Abrir carrito"
    >
      <svg
        className="w-7 h-7 text-slate-800 group-hover:text-coral-red transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-coral-red to-neon-pink text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
