import { mOpacity } from "@/utils/motionSettings";
import { motion as m } from "framer-motion";
import React from "react";

type ErrorProps = {
  error: string | {} | null;
};

const ErrorMessage: React.FC<ErrorProps> = ({ error }) => (
  <m.div {...mOpacity} className="grid h-full place-items-center">
    <h2 className="text-xl">
      Error: {typeof error === "string" ? error : `Page was lost : (`}
    </h2>
  </m.div>
);

export default ErrorMessage;
