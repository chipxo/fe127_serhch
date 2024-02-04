import { RootState } from "@/app/rootReducer";
import { useAppDispatch } from "@/app/store";
import ErrorMessage from "@/components/common/ErrorMessage";
import NoProducts from "@/components/common/NoProducts";
import CardSkeleton from "@/features/cards/commonCard/CardSkeleton";
import CommonCard from "@/features/cards/commonCard/CommonCard";
import { ProductType } from "@/types/types";
import { mOpacity } from "@/utils/motionSettings";
import { nanoid } from "@reduxjs/toolkit";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FoundProducts = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const { inputValue } = useSelector(
    (state: RootState) => state.searchProducts,
  );

  const [filteredPr, setFilteredPr] = useState<ProductType[] | null>([]);

  useEffect(() => {
    if (products && inputValue.length > 0) {
      const filtered = products.filter(
        ({ title, category }) =>
          title.toLowerCase().startsWith(inputValue.toLowerCase()) ||
          category.name.toLowerCase().startsWith(inputValue.toLowerCase()),
      );

      setFilteredPr(filtered);
    }
  }, [inputValue, products, dispatch]);

  return (
    <section className="min-h-[70vh] border-y">
      {error && <ErrorMessage error={error} />}
      {filteredPr && inputValue.length > 0 && filteredPr?.length > 0 ? (
        <div className="container py-6 md:py-12">
          {inputValue.length > 0 && (
            <h2 className="mb-10 text-3xl font-semibold">
              Results for: "{inputValue}"
            </h2>
          )}
          <div className="grid grid-cols-home gap-4">
            {loading &&
              "qwerty".split("").map((char) => <CardSkeleton key={char} />)}

            {!loading &&
              !error &&
              filteredPr?.map((product) => (
                <m.div {...mOpacity} key={nanoid()}>
                  <CommonCard {...product} />
                </m.div>
              ))}
          </div>
        </div>
      ) : (
        <NoProducts />
      )}
    </section>
  );
};

export default FoundProducts;
