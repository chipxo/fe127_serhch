import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { searchIcon } from "../../icons/Icons";

const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <p className="text-lg">{searchIcon}</p>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ x: "-50%" }}
            className="absolute left-1/2 top-14"
          >
            <div className="w-full h-4 bg-transparent absolute z-[999] -top-3" />
            <input
              type="text"
              name=""
              id=""
              className="input input-bordered"
              placeholder="Search..."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
