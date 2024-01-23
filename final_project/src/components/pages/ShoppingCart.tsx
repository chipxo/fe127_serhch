import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Error, Loading } from "../common/loading && error/LoadingError";
import BuyCard from "../containers/cards/BuyCard";
import { fetchProducts } from "../hooks/fetchProducts";
import { RootState } from "../reduxStore/rootReducer";
import { useAppDispatch } from "../reduxStore/store";
import { StoreCardProps } from "../types/ProductCardType";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.fakeStore,
  );
  const localStorageKeys = Object.keys(localStorage);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const items = localStorageKeys.map((itemId) => {
    const myCards = products.find(
      (product) => product.id === parseFloat(itemId),
    );

    return myCards as StoreCardProps;
  });

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {!loading &&
        !error &&
        items?.map((item) => {
          if (item) {
            const {
              category,
              discountPercentage,
              id,
              images,
              price,
              rating,
              stock,
              title,
            } = item;

            return (
              <BuyCard
                key={id}
                discountPercentage={discountPercentage}
                id={id}
                images={images}
                price={price}
                rating={rating}
                stock={stock}
                title={title}
                category={category}
              />
            );
          }

          return null; // Or handle the case where category is undefined or null
        })}
    </div>
  );
};

export default ShoppingCart;
