import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer";
import { useAppDispatch } from "@/app/store";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/types";
import { nanoid } from "@reduxjs/toolkit";
import { Loading, Error } from "@/components/common/LoadingError";
import NoItems from "@/components/common/NoItems";
import { motion as m } from "framer-motion";
import { mSetting } from "@/utils/motionSettings";
import ComCard from "@/features/cards/ComCard";
import { isValidImage } from "@/utils/isValidImage";

const FoundProducts = () => {
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const [filteredPr, setFilteredPr] = useState<ProductType[] | null>([]);

  const { inputValue } = useSelector(
    (state: RootState) => state.searchProducts,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products && inputValue.length > 0) {
      const filtered = products.filter(
        ({ title, category }) =>
          title.toLowerCase().startsWith(inputValue.toLowerCase()) ||
          (category &&
            category.name.toLowerCase().startsWith(inputValue.toLowerCase())),
      );

      setFilteredPr(filtered);
    }
  }, [inputValue, products, dispatch]);

  return (
    <section className="min-h-[70vh] border-y">
      {loading && (
        <div className="absolute left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      {filteredPr && inputValue.length > 0 && filteredPr?.length > 0 ? (
        <div className="container py-6 md:py-12">
          {inputValue.length > 0 && (
            <h2 className="mb-10 text-3xl font-semibold">
              Results for: "{inputValue}"
            </h2>
          )}
          <div className="grid grid-cols-home gap-4">
            {!loading &&
              !error &&
              filteredPr?.map(
                (product) =>
                  isValidImage(product.images[0]) && (
                    <m.div {...mSetting} key={nanoid()}>
                      <ComCard {...product} />
                    </m.div>
                  ),
              )}
          </div>
        </div>
      ) : (
        <NoItems />
      )}
    </section>
  );
};

export default FoundProducts;
