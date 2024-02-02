import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/store.tsx";
import { RootState } from "@/app/rootReducer.tsx";
import { setInputValue } from "@/features/searchBar/searchSlice";

import { useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import SearchPage from "./SearchPage";
import { ProductType } from "@/types/types";
import { Error, Loading } from "@/components/common/LoadingError.tsx";
import { Link, useNavigate } from "react-router-dom";
import { mSetting } from "@/utils/motionSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Search = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const { inputValue } = useSelector(
    (state: RootState) => state.searchProducts,
  );

  const [open, setOpen] = useState(true);
  const [searchResults, setSearchResults] = useState<ProductType[] | undefined>(
    [],
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
    setOpen(true);

    dispatch(setInputValue(value));

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
      <Input
        type="text"
        placeholder="Search..."
        className="relative z-[200] w-full focus:bg-background"
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
          <m.div
            {...mSetting}
            className="absolute right-0 top-0 z-[200] scale-75"
          >
            <Link to="/searchResults">
              <Button variant="default">Search</Button>
            </Link>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <>
            <m.div
              {...mSetting}
              className="fixed inset-0 z-[99] h-screen w-screen bg-black/40"
              onClick={() => setOpen(false)}
            />
            <m.div
              {...mSetting}
              style={{ x: "-50%" }}
              className="absolute left-1/2 top-11 z-[200] w-full"
            >
              <SearchPage searchResults={searchResults} found={found} />
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
