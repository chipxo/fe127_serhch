import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NoItems from "@/components/common/NoItems.tsx";
import ErrorMessage from "@/components/common/ErrorMessage.tsx";
import BuyCard from "@/features/cards/BuyCard.tsx";
import { fetchProducts } from "@/hooks/fetchProducts.tsx";
import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { decreaseAmount, setAmount } from "@/features/amount/amountSlice.tsx";
import { ProductType } from "@/types/types.tsx";
import { nanoid } from "@reduxjs/toolkit";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const { amount } = useSelector((state: RootState) => state.amount);

  const localStorageKeys = Object.keys(localStorage);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const prevItems = useRef<ProductType[]>([]);

  const [cards, setCards] = useState<ProductType[]>([]);

  const items = localStorageKeys.map((itemId) => {
    const myCards = products?.find(
      (product) => product.id === parseFloat(itemId),
    );

    return myCards as ProductType;
  });

  const areArraysEqual = (arr1: ProductType[], arr2: ProductType[]) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!areArraysEqual(prevItems.current, items)) {
      setCards(items);
      prevItems.current = items;
    }
  }, [items]);

  const deleteItem = (id: number) => {
    const localStorageItem = items.find((item) => item && item.id === id);

    if (localStorageItem) {
      dispatch(decreaseAmount());

      window.localStorage.removeItem(`${id}`);

      const updatedItems = items.filter((item) => item && item.id !== id);

      setCards(updatedItems);
    } else {
      console.error(`Item with id ${id} not found in localStorage.`);
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate the total price whenever the cards change
    const newTotalPrice = cards.reduce(
      (sum, card) => sum + (card?.price || 0),
      0,
    );
    setTotalPrice(newTotalPrice);
  }, [cards]);

  return (
    <section className="min-h-[70vh]">
      {/* {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )} */}
      {error && <ErrorMessage error={error} />}

      {!loading && !error && amount > 0 ? (
        <div className="container py-4">
          <div className="grid grid-cols-products place-items-center gap-4">
            {cards.map((card) => {
              if (card) {
                return (
                  <BuyCard
                    {...card}
                    key={nanoid()}
                    onClick={() => deleteItem(card.id)}
                  />
                );
              }

              return null;
            })}
          </div>
          {/* <h2 className="mt-6 text-3xl">Total: {totalPrice}$</h2> */}
        </div>
      ) : (
        !loading && !error && <NoItems />
      )}
    </section>
  );
};

export default ShoppingCart;
