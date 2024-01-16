const SectionsTitle = ({ text, isBgDark, isTitle }) => {
  const titleTextColor = isBgDark ? "text-white" : "text-dark-blue";

  const beforeBg = isBgDark ? "before:bg-white" : "before:bg-dark-blue";

  const secTitle = isTitle
    ? `before:absolute before:-top-5 before:h-[2px] before:w-[80px] before:content-[''] before:inset-x-auto md:before:w-[100px] my-4 text-center md:my-6 transform before:left-1/2 before:-translate-x-1/2 ${beforeBg}`
    : "";

  return (
    <h2
      className={`relative font-[Montserrat] text-xl font-bold uppercase sm:text-2xl md:text-4xl ${secTitle} ${titleTextColor}`}
    >
      {text}
    </h2>
  );
};

export default SectionsTitle;
