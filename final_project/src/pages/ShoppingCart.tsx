import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import ErrorMessage from "@/components/common/ErrorMessage.tsx";
import NoProducts from "@/components/common/NoProducts.tsx";
import { decreaseAmount } from "@/features/amount/amountSlice.tsx";
import BuyCard from "@/features/cards/shopCart/BuyCard";
import { setTotalPrice } from "@/features/cards/shopCart/totalPriceSlice";
import SingleCardSkeleton from "@/features/cards/singleCard/SingleCardSkeleton";
import { fetchProducts } from "@/hooks/fetchProducts.tsx";
import { ProductType } from "@/types/types.tsx";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const { amount } = useSelector((state: RootState) => state.amount);

  const { totalPrice } = useSelector((state: RootState) => state.totalPrice);

  const [cards, setCards] = useState<ProductType[] | undefined>([]);

  const localStorageKeys = Object.keys(localStorage);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filterItems = products?.filter(({ id }) =>
      localStorageKeys.includes(String(id)),
    );

    const newTotalPrice = filterItems?.reduce(
      (sum, card) => sum + (card?.price || 0),
      0,
    );

    dispatch(setTotalPrice(newTotalPrice as number));

    setCards(filterItems);
  }, [amount, products]);

  const deleteItem = (id: number) => {
    dispatch(decreaseAmount());
    localStorage.removeItem(`${id}`);
  };

  return (
    <section className="min-h-[70vh]">
      <div className="container py-4">
        {amount > 0 && <h2 className="pb-4">Total: {totalPrice}$</h2>}

        {error && <ErrorMessage error={error} />}
        {loading && <SingleCardSkeleton />}

        <div className="grid place-items-center gap-4">
          {!loading && !error && amount > 0 ? (
            cards?.map((card) => (
              <BuyCard
                {...card}
                key={nanoid()}
                onClick={() => deleteItem(card.id)}
              />
            ))
          ) : (
            <NoProducts />
          )}
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
