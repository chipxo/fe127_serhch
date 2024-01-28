import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store.tsx";
import { RootState } from "../../app/rootReducer.tsx";
import { setInputValue } from "../../features/searchBar/searchSlice";
import Button from "./buttons/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchPage from "../../pages/SearchPage";
import { ProductType } from "../../types/types";
import { Error, Loading } from "./LoadingError.tsx";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<ProductType[] | undefined>(
    [],
  );

  const [found, setFound] = useState(false);

  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const { inputValue } = useSelector(
    (state: RootState) => state.searchProducts,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    dispatch(setInputValue(e.target.value));

    const filteredResults = products?.filter(
      ({ title, category }) =>
        title.toLowerCase().startsWith(input) ||
        category.name.toLowerCase().startsWith(input),
    );

    setFound(!!filteredResults?.length);
    setSearchResults(filteredResults);
  };

  const handleBlur = () => {
    dispatch(setInputValue(""));
    setOpen(false);
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
        onBlur={() => handleBlur()}
      />
      {loading && (
        <div className="absolute -bottom-14 right-1/2 -translate-x-[50px]">
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 0.8 }}
            exit={{ opacity: 0, scale: 0.1 }}
            className="absolute right-0 top-0"
          >
            <Button
              text="search"
              color={"primary"}
              onClick={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && inputValue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            style={{ x: "-50%" }}
            className="absolute left-1/2 top-14 z-[200] w-[70vw]"
          >
            <SearchPage searchResults={searchResults} found={found} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
