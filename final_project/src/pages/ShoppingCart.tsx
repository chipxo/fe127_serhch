import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NoItems from "../components/common/NoItems.tsx";
import { Error, Loading } from "../components/common/LoadingError.tsx";
import BuyCard from "../features/cards/BuyCard.tsx";
import { fetchProducts } from "../hooks/fetchProducts.tsx";
import { RootState } from "../app/rootReducer.tsx";
import { useAppDispatch } from "../app/store.tsx";
import { setAmount } from "../features/amount/amountSlice.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { ProductType } from "../types/types.tsx";
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
      dispatch(setAmount(amount - 1));

      window.localStorage.removeItem(`${id}`);

      const updatedItems = items.filter((item) => item && item.id !== id);

      setCards(updatedItems);
    } else {
      console.error(`Item with id ${id} not found in localStorage.`);
    }
  };

  return (
    <section className="min-h-[70vh]">
      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      <AnimatePresence>
        {!loading && !error && amount > 0 ? (
          <motion.div className="container grid grid-cols-products place-items-center gap-4">
            {cards
              ?.filter((card) => localStorageKeys.includes(`${card?.id}`))
              .map((card) => {
                if (card) {
                  const { category, id, images, price, title } = card;
                  return (
                    <BuyCard
                      key={nanoid()}
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
              })}
          </motion.div>
        ) : (
          !loading && !error && <NoItems />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShoppingCart;
