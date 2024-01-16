const Slide = ({ title, description, bg }) => {
  return (
    <div
      className={`grid h-[60vh] w-screen bg-cover bg-center text-center  text-white md:h-screen md:place-items-center ${bg}`}
    >
      <div className="flex flex-col justify-center px-8 pt-10 md:px-6">
        <h2 className="mb-4 text-2xl font-bold uppercase sm:tracking-[8px] md:text-6xl lg:text-[80px]">
          {title}
        </h2>
        <p className="md:text-md mx-auto max-w-[420px] font-[Montserrat] text-sm tracking-[2px] sm:mx-0 sm:max-w-[unset] sm:uppercase sm:tracking-[6px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Slide;
