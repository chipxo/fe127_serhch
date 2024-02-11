import { mOpacity } from "@/utils/motionSettings";
import { motion as m } from "framer-motion";

const NoProducts = () => {
  return (
    <m.div
      {...mOpacity}
      className="col-span-4 grid min-h-[70vh] place-items-center text-xl lg:text-2xl"
    >
      <p>No products : (</p>
    </m.div>
  );
};

export default NoProducts;
