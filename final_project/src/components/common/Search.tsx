import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store.tsx";
import { RootState } from "../../app/rootReducer.tsx";
import { setInputValue } from "../../features/searchBar/searchSlice";
import Button from "./buttons/Button";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchPage from "../../pages/SearchPage";
import { ProductType } from "../../types/types";
import { Error, Loading } from "./LoadingError.tsx";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<ProductType[] | undefined>(
    [],
  );

  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const { inputValue } = useSelector(
    (state: RootState) => state.searchProducts,
  );

  const [found, setFound] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setOpen(false);
        navigate("/searchResults");

        const inputElement = document.activeElement as HTMLElement;
        inputElement?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = (value: string) => {
    dispatch(setInputValue(value));
    setOpen(true);

    const input = value.toLowerCase();

    const filteredResults = products?.filter(
      ({ title, category }) =>
        title.toLowerCase().startsWith(input) ||
        category.name.toLowerCase().startsWith(input),
    );

    setFound(!!filteredResults?.length);
    setSearchResults(filteredResults);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="input-neutral input input-bordered relative z-[10] w-full"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
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
            exit={{ opacity: 0 }}
            className="absolute right-0 top-0 z-[12]"
          >
            <Link to="/searchResults">
              <Button text="search" color={"primary"} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-screen w-screen bg-black/40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              style={{ x: "-50%" }}
              className="absolute left-1/2 top-14 z-[200] w-full"
            >
              <SearchPage searchResults={searchResults} found={found} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
