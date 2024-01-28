import React, { memo, useCallback, useEffect, useState } from "react";
import Slider from "../components/containers/slider/Slider.tsx";
import CommonCard from "../features/cards/CommonCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer.tsx";
import { useAppDispatch } from "../app/store.tsx";
import { Error, Loading } from "../components/common/LoadingError.tsx";
import { fetchAmountOfProducts } from "../hooks/fetchAmountOfProducts.tsx";
import { fetchProducts } from "../hooks/fetchProducts.tsx";
import CatalogAside from "../components/containers/nav/CatalogAside.tsx";
import { fetchCategories } from "../hooks/fetchCategories.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/common/buttons/Button.tsx";
import { ProductType } from "../types/types.tsx";

const Home = () => {
  const [moreProducts, setMoreProducts] = useState(false);
  const [pr, setPr] = useState<ProductType[]>([]);

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
    const fetchData = async () => {
      try {
        const [_, result2] = await Promise.all([
          dispatch(fetchAmountOfProducts(10)),
          dispatch(fetchAmountOfProducts(30)),
        ]);

        setPr((result2.payload as ProductType[]) || []);
      } catch (e) {
        console.error(`Error while fetching data: ${e}`);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {loading && (
        <div className="absolute left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      {!loading && !error && allProducts && <Slider products={allProducts} />}
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="border-y border-neutral"
        >
          <div className="lg:container">
            {!loading && !error && categories && (
              <CatalogAside categories={categories} />
            )}
            <div className="space-y-10 border-neutral py-10 pl-10 max-lg:container">
              <h2 className="text-start text-2xl font-semibold md:text-4xl">
                Best selling products:
              </h2>
              <div className="grid grid-cols-home gap-4">
                {!loading &&
                  !error &&
                  amountOfProducts?.map(
                    (
                      { id, title, images, category, price }: ProductType,
                      index,
                    ) =>
                      index < 10 && (
                        <MemoizedCommonCard
                          key={nanoid()}
                          id={id}
                          title={title}
                          price={price}
                          images={images}
                          category={category}
                          isHome
                        />
                      ),
                  )}

                <AnimatePresence>
                  {moreProducts &&
                    pr?.map(
                      ({ id, title, images, category, price }: ProductType) => (
                        <motion.div
                          key={nanoid()}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <MemoizedCommonCard
                            id={id}
                            title={title}
                            price={price}
                            images={images}
                            category={category}
                            isHome
                          />
                        </motion.div>
                      ),
                    )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="mb-8 grid place-items-center">
            <Button
              text={`Show ${moreProducts ? "less" : "more"}`}
              color="primary"
              onClick={() => setMoreProducts(!moreProducts)}
            />
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default Home;

type CardProps = ProductType & {
  isHome: boolean;
};

export const MemoizedCommonCard: React.FC<CardProps> = memo(
  ({ id, title, price, images, category, isHome }) => (
    <CommonCard
      id={id}
      title={title}
      price={price}
      images={images}
      category={category}
      isHome={isHome}
    />
  ),
);
