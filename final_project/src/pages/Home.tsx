import { useEffect, useState } from "react";
import Carousel from "@/components/containers/slider/Slider.tsx";
import CommonCard from "@/features/cards/CommonCard.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { Error, Loading } from "@/components/common/LoadingError.tsx";
import { fetchAmountOfProducts } from "@/hooks/fetchAmountOfProducts.tsx";
import { fetchProducts } from "@/hooks/fetchProducts.tsx";
import CatalogAside from "@/components/containers/nav/CatalogAside.tsx";
import { fetchCategories } from "@/hooks/fetchCategories.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { motion as m } from "framer-motion";
import Button from "@/components/common/buttons/Button.tsx";
import { ProductType } from "@/types/types.tsx";

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
          dispatch(fetchAmountOfProducts(40)),
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

      {!loading && !error && allProducts && <Carousel products={allProducts} />}

      <div className="min-h-[60vh] border-y border-neutral">
        <div className="lg:container">
          {!loading && !error && categories && (
            <CatalogAside categories={categories} />
          )}

          <div className="space-y-10 border-neutral py-10 pl-10 max-lg:container">
            <h2 className="text-start text-xl md:text-2xl md:font-semibold">
              Best selling products:
            </h2>
            <div className="grid grid-cols-home gap-4">
              {!loading &&
                !error &&
                allProducts?.map(
                  ({ id, title, images, category, price }, index) =>
                    index > 10 &&
                    index < 20 && (
                      <CommonCard
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
              {moreProducts &&
                pr?.map(({ id, title, images, category, price }) => (
                  <m.div
                    key={nanoid()}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CommonCard
                      id={id}
                      title={title}
                      price={price}
                      images={images}
                      category={category}
                      isHome
                    />
                  </m.div>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-8 grid place-items-center">
          {!moreProducts && (
            <Button
              text="Show more"
              color="secondary"
              onClick={() => setMoreProducts(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
