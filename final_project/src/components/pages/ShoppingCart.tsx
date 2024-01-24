import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NoItems from "../common/NoItems";
import { Error, Loading } from "../common/loading && error/LoadingError";
import BuyCard from "../containers/cards/BuyCard";
import { fetchProducts } from "../hooks/fetchProducts";
import { RootState } from "../reduxStore/rootReducer";
import { useAppDispatch } from "../reduxStore/store";
import { setAmount } from "../slices/amount/amountSlice";
import { Card, ProductType } from "../types/ProductCardType";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.fakeStore,
  );
  const { amount } = useSelector((state: RootState) => state.amount);
  const localStorageKeys = Object.keys(localStorage);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const prevItems = useRef<ProductType[]>([]);
  const [cards, setCards] = useState<ProductType[]>([]);

  const items = localStorageKeys.map((itemId) => {
    const myCards = products.find(
      (product) => product.id === parseFloat(itemId),
    );

    return myCards as Card;
  });

  useEffect(() => {
    // Check if items have changed before updating the state
    if (!areArraysEqual(prevItems.current, items)) {
      setCards(items);
      prevItems.current = items; // Update the reference
    }
  }, [items]);

  const deleteItem = (id: number) => {
    const localStorageItem = items.find((item) => item && item.id === id);

    if (localStorageItem) {
      dispatch(setAmount(amount - 1));
      window.localStorage.removeItem(`${id}`);
      const updatedItems = items.filter((item) => item && item.id !== id);
      setCards(updatedItems);
    } else {
      console.error(`Item with id ${id} not found in localStorage.`);
    }
  };

  // Helper function to check if two arrays are equal
  function areArraysEqual(arr1: ProductType[], arr2: ProductType[]) {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  }

  console.log(cards);

  return (
    <div className="container grid grid-cols-4 gap-4">
      {loading && <Loading />}
      {error && <Error error={error} />}
      {!loading && !error && cards.length > 1 ? (
        cards
          ?.filter((card) => localStorageKeys.includes(`${card?.id}`))
          .map((card) => {
            if (card) {
              const { category, id, images, price, title } = card;
              return (
                <BuyCard
                  key={id}
                  id={id}
                  images={images}
                  price={price}
                  title={title}
                  category={category}
                  onClick={() => deleteItem(id)}
                />
              );
            }
            <div className="order">
              <button>Make an order</button>
            </div>;
            return null;
          })
      ) : (
        <NoItems />
      )}
    </div>
  );
};

export default ShoppingCart;
