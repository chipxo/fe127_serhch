import { mSetting } from "@/utils/motionSettings";
import { AnimatePresence, motion as m } from "framer-motion";
import React from "react";

type ErrorProps = {
  error: string | {} | null;
};

export const Loading: React.FC = () => (
  <AnimatePresence>
    <m.div {...mSetting}>
      <span className="loading loading-dots loading-lg scale-125 text-primary" />
    </m.div>
  </AnimatePresence>
);

export const Error: React.FC<ErrorProps> = ({ error }) => (
  <m.div {...mSetting}>
    <h2 className="text-4xl">
      Error: {typeof error === "string" ? error : `Page was lost :(`}
    </h2>
  </m.div>
);
