import { motion } from "framer-motion";

const NoItems = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid min-h-[70vh] place-items-center text-3xl text-neutral"
    >
      <p>No products</p>
    </motion.div>
  );
};

export default NoItems;
