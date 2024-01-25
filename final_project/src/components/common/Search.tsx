import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { RootState } from "../redux/rootReducer";
import { setInputValue } from "../slices/searchBar/searchSlice";
import Button from "./buttons/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Search = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { inputValue } = useSelector(
    (state: RootState) => state.searchProducts,
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };


  
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="input-neutral input input-bordered w-full"
        value={inputValue}
        onChange={(e) => handleChange(e)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <AnimatePresence>
        {open && (
          <motion.div className="absolute right-0 top-0 scale-90">
            <Button
              text="search"
              color={"primary"}
              onClick={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
