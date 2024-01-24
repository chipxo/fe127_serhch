import { AnimatePresence, motion } from "framer-motion";
import { filterIcon } from "../../icons/Icons";
import { useState } from "react";

const Filter = () => {
  const [filter, setFilter] = useState(false);
  return (
    <>
      <AnimatePresence>
        {filter && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-0 top-0 z-[500] h-screen w-[24vw] border-l border-neutral bg-base-100 text-2xl"
          >
            filter
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed right-12 top-[18px] z-[999] cursor-pointer self-center text-2xl"
          onClick={() => setFilter(!filter)}
        >
          {filterIcon}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Filter;
