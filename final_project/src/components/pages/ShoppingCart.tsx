import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NoItems from "../common/NoItems";
import { Error, Loading } from "../common/loading && error/LoadingError";
import BuyCard from "../containers/cards/BuyCard";
import { fetchProducts } from "../hooks/fetchProducts";
import { RootState } from "../reduxStore/rootReducer";
import { useAppDispatch } from "../reduxStore/store";
import { setAmount } from "../slices/amount/amountSlice";
import { StoreCardProps } from "../types/ProductCardType";

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

  const prevItems = useRef<StoreCardProps[]>([]);
  const [cards, setCards] = useState<StoreCardProps[]>([]);

  const items = localStorageKeys.map((itemId) => {
    const myCards = products.find(
      (product) => product.id === parseFloat(itemId),
    );

    return myCards as StoreCardProps;
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
  function areArraysEqual(arr1: StoreCardProps[], arr2: StoreCardProps[]) {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  }

  console.log(cards);

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {
        !loading && !error && cards.length > 1 ? (
          cards
            ?.filter((card) => localStorageKeys.includes(`${card?.id}`))
            .map((card) => {
              if (card) {
                const {
                  category,
                  discountPercentage,
                  id,
                  images,
                  price,
                  rating,
                  stock,
                  title,
                } = card;

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
                    onClick={() => deleteItem(id)}
                  />
                );
              }
              return null;
              // else {
              //   return (
              //     <div className="h-[80vh] grid place-items-center text-3xl text-neutral">
              //       <p>No items added</p>
              //     </div>
              //   ); // Or handle the case where category is undefined or null
              // }
            })
        ) : (
          <NoItems />
        )

        // else {
        //   return (
        //     <div className="h-[80vh] grid place-items-center text-3xl text-neutral">
        //       <p>No items added</p>
        //     </div>
        //   ); // Or handle the case where category is undefined or null
        // }

        // items?.map((item) => {

        //   if (item) {
        //     const {
        //       category,
        //       discountPercentage,
        //       id,
        //       images,
        //       price,
        //       rating,
        //       stock,
        //       title,
        //     } = item;

        //     return (
        //       <BuyCard
        //         key={id}
        //         discountPercentage={discountPercentage}
        //         id={id}
        //         images={images}
        //         price={price}
        //         rating={rating}
        //         stock={stock}
        //         title={title}
        //         category={category}
        //       />
        //     );
        //   }
        //   return null;
        //   // else {
        //   //   return (
        //   //     <div className="h-[80vh] grid place-items-center text-3xl text-neutral">
        //   //       <p>No items added</p>
        //   //     </div>
        //   //   ); // Or handle the case where category is undefined or null
        //   // }
        // })
      }
    </div>
  );
};

export default ShoppingCart;
