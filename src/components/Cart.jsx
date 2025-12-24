import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Checkout from './Checkout';

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart 
  } = useCart();
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleProceedToCheckout = () => {
    toggleCart(); // Cerrar el carrito primero
    setTimeout(() => {
      setIsCheckoutOpen(true); // Abrir checkout después
    }, 300); // Pequeño delay para la animación
  };

  if (!isCartOpen) {
    return (
      <>
        <Checkout 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      </>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={toggleCart}
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-coral-red to-neon-pink">
            <h2 className="text-2xl font-palanquin font-bold text-white flex items-center gap-2">
              🛒 Carrito de Compras
            </h2>
            <button
              onClick={toggleCart}
              className="text-white hover:text-gray-200 transition-colors duration-200 text-3xl font-bold"
              aria-label="Cerrar carrito"
            >
              ×
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-xl font-montserrat text-slate-gray mb-2">
                  Tu carrito está vacío
                </p>
                <p className="text-sm text-slate-gray">
                  ¡Agrega algunos productos increíbles!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={item.imgURL}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-xl bg-white p-2"
                    />
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-palanquin font-semibold text-lg text-slate-gray">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-gray/70 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-coral-red hover:text-white rounded-md transition-colors duration-200 font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-montserrat font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-coral-red hover:text-white rounded-md transition-colors duration-200 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-montserrat font-bold text-coral-red text-lg">
                          {item.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 self-start"
                      aria-label="Eliminar producto"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gradient-to-br from-pale-blue to-white">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-montserrat text-slate-gray">Subtotal:</span>
                  <span className="font-palanquin font-bold text-2xl bg-gradient-to-r from-coral-red to-neon-pink bg-clip-text text-transparent">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow text-white py-4 rounded-xl font-montserrat font-bold text-lg hover:shadow-hover hover:scale-105 transition-all duration-300"
                >
                  Proceder al Pago
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border-2 border-coral-red text-coral-red py-3 rounded-xl font-montserrat font-semibold hover:bg-coral-red hover:text-white transition-all duration-300"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Checkout Modal - Se renderiza fuera del carrito */}
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
};

export default Cart;
