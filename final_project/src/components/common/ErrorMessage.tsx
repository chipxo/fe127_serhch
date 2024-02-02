import { mSetting } from "@/utils/motionSettings";
import { motion as m } from "framer-motion";
import React from "react";

type ErrorProps = {
  error: string | {} | null;
};

const ErrorMessage: React.FC<ErrorProps> = ({ error }) => (
  <m.div {...mSetting}>
    <h2 className="text-4xl">
      Error: {typeof error === "string" ? error : `Page was lost :(`}
    </h2>
  </m.div>
);

export default ErrorMessage;
