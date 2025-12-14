const ServiceCard = ({ imgURL, label, subtext }) => {
  return (
    <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-3xl shadow-glow px-10 py-16 backdrop-blur-sm bg-white/90 border border-white/20 transition-all duration-500 hover:shadow-hover hover:scale-105 hover:-translate-y-2 group'>
      <div className='w-11 h-11 flex justify-center items-center bg-gradient-to-br from-coral-red to-neon-pink rounded-full shadow-neon group-hover:scale-110 transition-transform duration-300'>
        <img src={imgURL} alt={label} width={24} height={24} className='drop-shadow-lg' />
      </div>
      <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold group-hover:text-coral-red transition-colors duration-300'>
        {label}
      </h3>
      <p className='mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray'>
        {subtext}
      </p>
    </div>
  );
};

export default ServiceCard;
