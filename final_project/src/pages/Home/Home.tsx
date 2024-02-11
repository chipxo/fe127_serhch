import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import ErrorMessage from "@/components/common/ErrorMessage";
import Carousel from "@/components/containers/slider/Slider";
import { Button } from "@/components/ui/button";
import CommonCard from "@/features/cards/commonCard/CommonCard";
import CategoriesLayout from "@/features/categories/CategoriesLayout.tsx";
import { fetchAmountOfProducts } from "@/hooks/fetchAmountOfProducts.tsx";
import { fetchCategories } from "@/hooks/fetchCategories.tsx";
import { fetchProducts } from "@/hooks/fetchProducts.tsx";
import { mOpacity } from "@/utils/motionSettings";
import { nanoid } from "@reduxjs/toolkit";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeLoading from "./HomeLoading";

const Home = () => {
  const dispatch = useAppDispatch();
  const { products: allProducts } = useSelector(
    (state: RootState) => state.products,
  );

  const {
    products: amountOfProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.amountOfProducts);

  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());

    dispatch(fetchAmountOfProducts(0));
    dispatch(fetchAmountOfProducts(10));
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const firstPrs = amountOfProducts?.filter((_, i) => i < 10);
  const secondPrs = amountOfProducts?.filter((_, i) => i > 10);

  const { userData } = useSelector((state: RootState) => state.register);

  console.log(userData);

  return (
    <>
      {loading && <HomeLoading />}
      {error && <ErrorMessage error={error} />}
      {!loading && !error && allProducts && <Carousel products={allProducts} />}

      <section>
        <div className="container">
          {!loading && !error && categories && (
            <div className="lg:hidden">
              <CategoriesLayout />
            </div>
          )}
          <div className="border-neutral space-y-10 py-10 max-lg:container">
            <h2 className="text-start text-xl md:text-2xl md:font-semibold">
              Best selling products:
            </h2>
            <div className="grid grid-cols-home gap-4">
              {!loading &&
                !error &&
                firstPrs?.map((product) => (
                  <div key={nanoid()} className="h-full w-full">
                    <CommonCard {...product} isHome />
                  </div>
                ))}
              {open &&
                secondPrs?.map((product) => (
                  <m.div {...mOpacity} key={nanoid()} className="h-full w-full">
                    <CommonCard {...product} isHome />
                  </m.div>
                ))}
            </div>
            <div className="mx-auto w-fit">
              {!open && (
                <Button onClick={() => setOpen(true)}>Show more</Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
