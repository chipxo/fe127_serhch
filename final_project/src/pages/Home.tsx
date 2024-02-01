import { useEffect, useState } from "react";
import Carousel from "@/components/containers/slider/Slider.tsx";
import CommonCard from "@/features/cards/CommonCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { Error, Loading } from "@/components/common/LoadingError.tsx";
import { fetchAmountOfProducts } from "@/hooks/fetchAmountOfProducts.tsx";
import { fetchProducts } from "@/hooks/fetchProducts.tsx";
import CatalogAside from "@/components/containers/nav/CategoriesHome";
import { fetchCategories } from "@/hooks/fetchCategories.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion as m } from "framer-motion";
import { ProductType } from "@/types/types.tsx";
import { Button } from "@/components/ui/button";
import { log } from "console";
import { isValidImage } from "@/utils/isValidImage";
import { mSetting } from "@/utils/motionSettings";

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
  }, [dispatch]);

  const [am, setAm] = useState(10);

  return (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}

      {error && <Error error={error} />}

      {!loading && !error && allProducts && <Carousel products={allProducts} />}

      <div className="min-h-[60vh] border-y border-neutral bg-base-100">
        <div className="lg:container">
          {!loading && !error && categories && (
            <CatalogAside categories={categories} />
          )}

          <div className="space-y-10 border-neutral py-10 pl-10 max-lg:container">
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
                        <m.div key={nanoid()}>
                          <CommonCard {...product} isHome />
                        </m.div>
                      ),
                  )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="mb-8 grid place-items-center">
          {am < 20 && (
            <Button variant="default" onClick={() => setAm((a) => a + 10)}>
              Show more
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

// const fetchData = async () => {
//   try {
//     const [_, result2] = await Promise.all([
//       dispatch(fetchAmountOfProducts(10)),
//       dispatch(fetchAmountOfProducts(10)),
//     ]);

//     setPr((result2.payload as ProductType[]) || []);
//   } catch (e) {
//     console.error(`Error while fetching data: ${e}`);
//   }
// };

// fetchData();
