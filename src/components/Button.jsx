const Button = ({ label, iconURL, backgroundColor, textColor, borderColor, fullwidth }) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none font-semibold
      ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : "bg-gradient-to-r from-coral-red via-neon-pink to-coral-red text-white border-coral-red shadow-neon"
      } rounded-full ${fullwidth && "w-full"} 
      transition-all duration-500 hover:scale-105 hover:shadow-hover
      animate-pulse-glow
      relative overflow-hidden group
      before:absolute before:inset-0 before:bg-shimmer before:animate-shimmer`}
    >
      <span className="relative z-10">{label}</span>

      {iconURL && (
        <img
          src={iconURL}
          alt='flecha derecha'
          className='ml-2 rounded-full bg-white w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300'
        />
      )}
    </button>
  );
};

export default Button;
