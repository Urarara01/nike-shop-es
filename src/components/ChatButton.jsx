import { useState } from 'react';
import FloatingChat from './FloatingChat';

const ChatButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      <FloatingChat isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="relative group">
        {/* Tooltip */}
        <div className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap
          bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow text-white px-4 py-2 rounded-full
          font-montserrat font-semibold shadow-neon transition-all duration-300
          ${isHovered && !isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
          ¡Chatea con nosotros!
        </div>

        {/* Botón Principal */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-16 h-16 bg-gradient-to-br from-coral-red via-neon-pink to-violet-glow 
            rounded-full shadow-neon hover:shadow-electric transition-all duration-500
            hover:scale-110 active:scale-95 animate-pulse-glow
            flex items-center justify-center overflow-hidden z-50"
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {/* Efecto shimmer */}
          <div className="absolute inset-0 bg-shimmer animate-shimmer"></div>

          {/* Ícono */}
          {isOpen ? (
            <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}

          {/* Indicador de notificación (opcional) */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-electric-blue rounded-full border-2 border-white animate-bounce">
              <span className="absolute inset-0 bg-electric-blue rounded-full animate-ping"></span>
            </span>
          )}
        </button>

        {/* Círculo de resplandor en el fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-coral-red/30 via-neon-pink/30 to-violet-glow/30 rounded-full blur-xl -z-10 group-hover:blur-2xl transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default ChatButton;
