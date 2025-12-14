const ShoeCard = ({ imgURL, changeBigShowImage, bigShoeImg }) => {
  const handleClick = () => {
    if (bigShoeImg !== imgURL.bigShoe) {
      changeBigShowImage(imgURL.bigShoe);
    }
  };

  return (
    <div
      className={`border-2 rounded-2xl ${
        bigShoeImg === imgURL.bigShoe
          ? "border-coral-red shadow-neon scale-110"
          : "border-white/30 shadow-lg"
      } cursor-pointer max-sm:flex-1 transition-all duration-500 hover:scale-105 backdrop-blur-sm bg-white/80`}
      onClick={handleClick}
    >
      <div className='flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4 transition-transform duration-500 hover:rotate-3'>
        <img
          src={imgURL.thumbnail}
          alt='colección de zapatos'
          width={127}
          height={103.34}
          className='object-contain drop-shadow-xl'
        />
      </div>
    </div>
  );
};

export default ShoeCard;
