import { star } from "../assets/icons";

const ReviewCard = ({ imgURL, customerName, rating, feedback }) => {
  return (
    <div className='flex justify-center items-center flex-col group'>
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-br from-coral-red/30 to-neon-pink/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500'></div>
        <img
          src={imgURL}
          alt='cliente'
          className='rounded-full object-cover w-[120px] h-[120px] relative z-10 border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500'
        />
      </div>
      <p className='mt-6 max-w-sm text-center info-text text-lg'>{feedback}</p>
      <div className='mt-3 flex justify-center items-center gap-2.5'>
        <img
          src={star}
          width={24}
          height={24}
          alt='calificación'
          className='object-contain m-0 drop-shadow-md'
        />
        <p className='text-xl font-montserrat font-bold bg-gradient-to-r from-coral-red to-neon-pink bg-clip-text text-transparent'>({rating})</p>
      </div>
      <h3 className='mt-1 font-palanquin text-3xl text-center font-bold group-hover:text-coral-red transition-colors duration-300'>
        {customerName}
      </h3>
    </div>
  );
};

export default ReviewCard;
