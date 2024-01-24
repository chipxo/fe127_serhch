import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error, Loading } from "../../common/loading && error/LoadingError";
import StoreCard from "../../containers/cards/StoreCards";
import { fetchProducts } from "../../hooks/fetchProducts";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";
import { filterIcon } from "../../icons/Icons";
import { AnimatePresence, motion } from "framer-motion";

const FakeStore: React.FC = () => {
  const [filter, setFilter] = useState(false);
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.fakeStore,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  console.log(products);

  return (
    <section>
      <AnimatePresence>
        {filter && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ delay: 0.2 }}
            className="fixed right-0 top-0 z-[500] h-screen w-[24vw] border-l border-neutral bg-base-100 text-2xl"
          >
            filter
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container relative font-serif">
        {loading && <Loading />}
        <div className="grid gap-4 md:grid-cols-4">
          {error && <Error error={error} />}
          {!loading &&
            !error &&
            products.map(
              ({ id, category, images, price, title }) =>
                price > 0 && (
                  <div key={id}>
                    <StoreCard
                      id={id}
                      title={title}
                      category={category}
                      price={price}
                      images={images}
                    />
                  </div>
                ),
            )}
          <div
            className={`fixed right-24 top-5 z-[999] cursor-pointer text-2xl`}
            onClick={() => setFilter(!filter)}
          >
            {filterIcon}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FakeStore;
