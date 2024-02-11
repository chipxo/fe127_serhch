import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { setInputValue } from "@/features/searchBar/searchSlice";
import { useSelector } from "react-redux";

import ErrorMessage from "@/components/common/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/types/types";
import { mOpacity } from "@/utils/motionSettings";
import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchPage from "./SearchPage";

const Search = () => {
  const dispatch = useAppDispatch();

  const { products, error } = useSelector((state: RootState) => state.products);

  const { inputValue } = useSelector(
    (state: RootState) => state.searchProducts,
  );

  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<ProductType[] | undefined>(
    [],
  );

  const [found, setFound] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const inputElement = document.activeElement as HTMLElement;
      if (e.key === "Enter" && inputElement.getAttribute("name") === "search") {
        setOpen(false);
        navigate("/searchResults");
        inputElement.blur();
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
        name="search"
        placeholder="Search..."
        className="relative z-[200] w-full bg-background"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      {error && <ErrorMessage error={error} />}
      <AnimatePresence>
        {open && (
          <m.div
            {...mOpacity}
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
              {...mOpacity}
              className="fixed inset-0 z-[99] h-screen w-screen bg-black/40"
              onClick={() => setOpen(false)}
            />
            <m.div
              {...mOpacity}
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
