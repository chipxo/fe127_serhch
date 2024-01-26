import { motion } from "framer-motion";
import React from "react";

type ErrorProps = {
  error: string | {} | null;
};

export const Loading: React.FC = () => (
  <div className="grid h-screen place-items-center">
    <span className="loading loading-dots loading-lg scale-125 text-info" />
  </div>
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
