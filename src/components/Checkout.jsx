import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = ({ isOpen, onClose }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validación para el campo de teléfono
    if (name === 'phone') {
      if (/[a-zA-Z]/.test(value)) {
        setErrors(prev => ({ ...prev, phone: 'El teléfono solo debe contener números' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
      const cleanedValue = value.replace(/[^0-9+\-\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanedValue }));
      return;
    }

    // Validación para el código postal (solo números)
    if (name === 'zipCode') {
      if (/[a-zA-Z]/.test(value)) {
        setErrors(prev => ({ ...prev, zipCode: 'El código postal solo debe contener números' }));
      } else {
        setErrors(prev => ({ ...prev, zipCode: '' }));
      }
      const cleanedValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanedValue }));
      return;
    }

    // Validación para el número de tarjeta
    if (name === 'cardNumber') {
      if (/[a-zA-Z]/.test(value)) {
        setErrors(prev => ({ ...prev, cardNumber: 'El número de tarjeta solo debe contener números' }));
      } else {
        const digitsOnly = value.replace(/\s/g, '');
        if (digitsOnly.length > 0 && digitsOnly.length < 16) {
          setErrors(prev => ({ ...prev, cardNumber: 'El número de tarjeta debe tener 16 dígitos' }));
        } else {
          setErrors(prev => ({ ...prev, cardNumber: '' }));
        }
      }
      // Formatear con espacios cada 4 dígitos
      const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
      const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    // Validación para el nombre en la tarjeta (solo letras y espacios)
    if (name === 'cardName') {
      if (/[0-9]/.test(value)) {
        setErrors(prev => ({ ...prev, cardName: 'El nombre solo debe contener letras' }));
      } else {
        setErrors(prev => ({ ...prev, cardName: '' }));
      }
      const cleanedValue = value.replace(/[0-9]/g, '').toUpperCase();
      setFormData(prev => ({ ...prev, [name]: cleanedValue }));
      return;
    }

    // Validación para la fecha de expiración (MM/AA)
    if (name === 'expiryDate') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
      let formatted = digitsOnly;
      
      if (digitsOnly.length >= 2) {
        const month = parseInt(digitsOnly.slice(0, 2), 10);
        if (month < 1 || month > 12) {
          setErrors(prev => ({ ...prev, expiryDate: 'Mes inválido (01-12)' }));
        } else {
          // Validar que la fecha no esté expirada
          if (digitsOnly.length === 4) {
            const year = parseInt('20' + digitsOnly.slice(2, 4), 10);
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
              setErrors(prev => ({ ...prev, expiryDate: 'La tarjeta está expirada' }));
            } else {
              setErrors(prev => ({ ...prev, expiryDate: '' }));
            }
          } else {
            setErrors(prev => ({ ...prev, expiryDate: '' }));
          }
        }
        formatted = digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2);
      } else {
        if (/[a-zA-Z]/.test(value)) {
          setErrors(prev => ({ ...prev, expiryDate: 'Solo ingrese números' }));
        } else {
          setErrors(prev => ({ ...prev, expiryDate: '' }));
        }
      }
      
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    // Validación para el CVV (solo 3-4 números)
    if (name === 'cvv') {
      if (/[a-zA-Z]/.test(value)) {
        setErrors(prev => ({ ...prev, cvv: 'El CVV solo debe contener números' }));
      } else if (value.length > 0 && value.length < 3) {
        setErrors(prev => ({ ...prev, cvv: 'El CVV debe tener 3 o 4 dígitos' }));
      } else {
        setErrors(prev => ({ ...prev, cvv: '' }));
      }
      const cleanedValue = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: cleanedValue }));
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Verificar si hay errores activos para deshabilitar el botón
  const hasErrors = Object.values(errors).some(error => error !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      
      // Limpiar carrito después de 2 segundos y cerrar
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        onClose();
        setFormData({
          name: '', email: '', phone: '', address: '',
          city: '', zipCode: '', cardNumber: '', cardName: '',
          expiryDate: '', cvv: ''
        });
      }, 3000);
    }, 2000);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.18; // IGV 18%
  const total = subtotal + shipping + tax;

  if (orderComplete) {
    return (
      <>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300" />
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-fadeInUp">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-palanquin font-bold text-slate-gray mb-3">
              ¡Pedido Confirmado! 🎉
            </h2>
            <p className="text-slate-gray/70 font-montserrat mb-6">
              Tu pedido ha sido procesado exitosamente. Recibirás un correo de confirmación pronto.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-gray font-montserrat">
                <span className="font-bold">Número de orden:</span> #NKE{Date.now().toString().slice(-6)}
              </p>
              <p className="text-sm text-slate-gray font-montserrat mt-1">
                <span className="font-bold">Total:</span> ${total.toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-slate-gray/60 font-montserrat">
              Gracias por tu compra 🛍️
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Overlay de fondo que cubre toda la pantalla */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Contenedor centrado del modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full my-8 animate-fadeInUp">
          <div className="grid md:grid-cols-2 max-h-[85vh] overflow-hidden">
              {/* Left Side - Form */}
              <div className="p-8 overflow-y-auto max-h-[85vh]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-palanquin font-bold bg-gradient-to-r from-coral-red to-neon-pink bg-clip-text text-transparent">
                    Finalizar Compra
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-slate-gray hover:text-coral-red transition-colors text-3xl font-bold leading-none"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información Personal */}
                  <div>
                    <h3 className="text-lg font-palanquin font-semibold text-slate-gray mb-4">
                      Información Personal
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Nombre completo *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-coral-red focus:outline-none transition-colors font-montserrat"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-coral-red focus:outline-none transition-colors font-montserrat"
                      />
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Teléfono *"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-montserrat ${
                            errors.phone 
                              ? 'border-red-500 focus:border-red-500 bg-red-50' 
                              : 'border-gray-200 focus:border-coral-red'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1 font-montserrat flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dirección de Envío */}
                  <div>
                    <h3 className="text-lg font-palanquin font-semibold text-slate-gray mb-4">
                      Dirección de Envío
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="address"
                        placeholder="Dirección *"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-coral-red focus:outline-none transition-colors font-montserrat"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="Ciudad *"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-coral-red focus:outline-none transition-colors font-montserrat"
                        />
                        <div>
                          <input
                            type="text"
                            name="zipCode"
                            placeholder="Código Postal *"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-montserrat ${
                              errors.zipCode 
                                ? 'border-red-500 focus:border-red-500 bg-red-50' 
                                : 'border-gray-200 focus:border-coral-red'
                            }`}
                          />
                          {errors.zipCode && (
                            <p className="text-red-500 text-xs mt-1 font-montserrat flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información de Pago */}
                  <div>
                    <h3 className="text-lg font-palanquin font-semibold text-slate-gray mb-4">
                      Información de Pago
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="Número de tarjeta *"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          maxLength="19"
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-montserrat ${
                            errors.cardNumber 
                              ? 'border-red-500 focus:border-red-500 bg-red-50' 
                              : 'border-gray-200 focus:border-coral-red'
                          }`}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1 font-montserrat flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cardName"
                          placeholder="Nombre en la tarjeta *"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-montserrat ${
                            errors.cardName 
                              ? 'border-red-500 focus:border-red-500 bg-red-50' 
                              : 'border-gray-200 focus:border-coral-red'
                          }`}
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-sm mt-1 font-montserrat flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.cardName}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/AA *"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                            maxLength="5"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-montserrat ${
                              errors.expiryDate 
                                ? 'border-red-500 focus:border-red-500 bg-red-50' 
                                : 'border-gray-200 focus:border-coral-red'
                            }`}
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-xs mt-1 font-montserrat flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.expiryDate}
                            </p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="cvv"
                            placeholder="CVV *"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            maxLength="4"
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors font-montserrat ${
                              errors.cvv 
                                ? 'border-red-500 focus:border-red-500 bg-red-50' 
                                : 'border-gray-200 focus:border-coral-red'
                            }`}
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-xs mt-1 font-montserrat flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || hasErrors}
                    className={`w-full py-4 rounded-xl font-montserrat font-bold text-lg text-white transition-all duration-300 ${
                      isProcessing || hasErrors
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow hover:shadow-hover hover:scale-105'
                    }`}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      'Confirmar Pedido'
                    )}
                  </button>
                </form>
              </div>

              {/* Right Side - Order Summary */}
              <div className="bg-gradient-to-br from-pale-blue to-white p-8 border-l border-gray-200 overflow-y-auto max-h-[85vh]">
                <h3 className="text-2xl font-palanquin font-bold text-slate-gray mb-6">
                  Resumen del Pedido
                </h3>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex gap-3 bg-white rounded-xl p-3 shadow-sm">
                      <img
                        src={item.imgURL}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-montserrat font-semibold text-sm text-slate-gray">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-gray/70">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <p className="font-montserrat font-bold text-coral-red">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-t border-gray-300">
                  <div className="flex justify-between font-montserrat text-slate-gray">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-montserrat text-slate-gray">
                    <span>Envío:</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? '¡GRATIS!' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-montserrat text-slate-gray">
                    <span>IGV (18%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-palanquin text-xl font-bold text-slate-gray pt-3 border-t border-gray-300">
                    <span>Total:</span>
                    <span className="bg-gradient-to-r from-coral-red to-neon-pink bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-montserrat font-semibold text-sm text-green-700">
                        Compra 100% Segura
                      </p>
                      <p className="font-montserrat text-xs text-green-600 mt-1">
                        Tus datos están protegidos con encriptación SSL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
