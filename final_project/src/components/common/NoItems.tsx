import { mSetting } from "@/utils/motionSettings";
import { motion as m } from "framer-motion";

const NoItems = () => {
  return (
    <m.div
      {...mSetting}
      className="grid min-h-[70vh] place-items-center text-3xl text-neutral"
    >
      <p>No products</p>
    </m.div>
  );
};

export default NoItems;
