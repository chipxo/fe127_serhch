import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type ErrorProps = {
  error: string | {} | null;
};

export const Loading: React.FC = () => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=""
    >
      <span className="loading loading-dots loading-lg scale-125 text-primary" />
    </motion.div>
  </AnimatePresence>
);

export const Error: React.FC<ErrorProps> = ({ error }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className=""
  >
    <h2 className="text-4xl">
      Error: {typeof error === "string" ? error : `Page was lost :(`}
    </h2>
  </motion.div>
);
