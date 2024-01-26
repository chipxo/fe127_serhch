import { useEffect } from "react";
import Slider from "../containers/cards/Slider";
import StoreCard from "../slices/cards/StoreCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer.tsx";
import { useAppDispatch } from "../redux/store.tsx";
import { Error, Loading } from "../common/loading && error/LoadingError.tsx";
import { fetchAmountOfProducts } from "../hooks/fetchAmountOfProducts.tsx";
import { fetchProducts } from "../hooks/fetchProducts.tsx";
import CatalogAside from "../containers/nav/CatalogAside.tsx";
import { fetchCategories } from "../hooks/fetchCategories.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { isValidImage } from "../functions/isValidImage.tsx";
import { AnimatePresence, motion } from "framer-motion";

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
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
    dispatch(fetchAmountOfProducts());
    dispatch(fetchCategories());
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
                    ({ id, title, images, category, price }) =>
                      isValidImage(images?.[0]) && (
                        <StoreCard
                          key={nanoid()}
                          id={id}
                          title={title}
                          price={price}
                          images={images}
                          category={category}
                          isHome={true}
                        />
                      ),
                  )}
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

export default Home;
