import { motion as m } from "framer-motion";

const SliderHeader = () => {
  return (
    <m.h2
      animate={{
        scale: [1, 1.07, 1],
        transition: { duration: 1.5, repeat: Infinity },
      }}
      className="py-3 text-3xl font-bold text-primary max-sm:px-3 sm:text-4xl md:text-5xl"
    >
      Sales up to -70%!
    </m.h2>
  );
};

export default SliderHeader;
