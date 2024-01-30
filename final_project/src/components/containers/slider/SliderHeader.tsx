import { motion } from "framer-motion";

const SliderHeader = () => {
  return (
    <motion.h2
      animate={{
        scale: [1, 1.07, 1],
        transition: { duration: 1.5, repeat: Infinity },
      }}
      className="text-4xl font-bold text-primary md:text-5xl"
    >
      Sales up to -70%!
    </motion.h2>
  );
};

export default SliderHeader;
