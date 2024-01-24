import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import Slider from "../containers/cards/Slider";
import StoreCard from "../slices/cards/StoreCard.tsx";
import { Card, ProductType } from "../types/ProductCardType";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/rootReducer.tsx";
import { useAppDispatch } from "../reduxStore/store.tsx";
import { Error, Loading } from "../common/loading && error/LoadingError.tsx";
import { fetchAmountOfProducts } from "../hooks/fetchAmountOfProducts.tsx";
import { fetchProducts } from "../hooks/fetchProducts.tsx";

const Home = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.amountOfProducts,
  );
  const { products: allProducts } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAmountOfProducts());
    dispatch(fetchProducts());
  }, [dispatch]);

  const isValidImage = (url: string) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.width > 0 && img.height > 0;
  };

  return (
    <>
      <Slider products={allProducts as ProductType[]} />
      <div className="border-y border-neutral">
        <div className="container py-10">
          <h2 className="mb-10 text-center text-4xl font-semibold">
            Best selling products:
          </h2>
          <div className="grid-cols-home grid gap-4">
            {loading && <Loading />}
            {error && <Error error={error} />}
            {products?.map(
              ({ id, title, images, price, category }: Card) =>
                isValidImage(images[0]) && (
                  <div key={nanoid()}>
                    <StoreCard
                      id={id}
                      title={title}
                      category={category}
                      price={price}
                      images={images}
                      isHome={true}
                    />
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
