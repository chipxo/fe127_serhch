import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import ErrorMessage from "@/components/common/ErrorMessage";
import { fetchAmountOfProducts } from "@/hooks/fetchAmountOfProducts.tsx";
import { fetchProducts } from "@/hooks/fetchProducts.tsx";
import CategoriesHome from "@/components/containers/nav/CategoriesHome";
import { fetchCategories } from "@/hooks/fetchCategories.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion as m } from "framer-motion";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/containers/slider/Slider";
import CommonCard from "@/features/cards/commonCard/CommonCard";
import { isValidImage } from "@/utils/isValidImage";
import HomeLoading from "./HomeLoading";

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    products: amountOfProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.amountOfProducts);

  const { products: allProducts } = useSelector(
    (state: RootState) => state.products,
  );

  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());

    dispatch(fetchAmountOfProducts(0));
    dispatch(fetchAmountOfProducts(10));
  }, []);

  const [am, setAm] = useState(10);
  return (
    <>
      {loading && <HomeLoading />}
      {error && <ErrorMessage error={error} />}
      {!loading && !error && allProducts && <Carousel products={allProducts} />}

      <section>
        <div className="container">
          {!loading && !error && categories && (
            <CategoriesHome categories={categories} />
          )}
          <div className="border-neutral space-y-10 py-10 max-lg:container">
            <h2 className="text-start text-xl md:text-2xl md:font-semibold">
              Best selling products:
            </h2>
            <div className="grid grid-cols-home gap-4">
              <AnimatePresence>
                {!loading &&
                  !error &&
                  amountOfProducts?.map(
                    (product, i) =>
                      i < am && (
                        <m.div key={nanoid()} className="h-full w-full">
                          <CommonCard {...product} isHome />
                        </m.div>
                      ),
                  )}
              </AnimatePresence>
            </div>
          </div>
          {am < 20 && (
            <div className="mx-auto w-fit">
              <Button variant="default" onClick={() => setAm((a) => a + 10)}>
                Show more
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
