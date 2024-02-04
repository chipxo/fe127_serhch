import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import ErrorMessage from "@/components/common/ErrorMessage";
import { cartIcon } from "@/components/common/icons.tsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setAmount } from "@/features/amount/amountSlice";
import { fetchProducts } from "@/hooks/fetchProducts";
import { ProductType } from "@/types/types";
import { mFLoatMenu, mOpacity } from "@/utils/motionSettings";
import { AnimatePresence, motion as m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

type ShoppingCartItemProps = {
  isBurger?: boolean;
};

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
  isBurger = false,
}) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { amount } = useSelector((state: RootState) => state.amount);
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const localStorageKeys = Object.keys(localStorage);

  const items = localStorageKeys.map((itemId) => {
    const myCards = products?.find(
      (product) => product.id === parseFloat(itemId),
    );

    return myCards as ProductType;
  });

  useEffect(() => {
    dispatch(fetchProducts());

    const allKeys = Object.keys(localStorage);

    const numberKeys = allKeys.filter((key) => !isNaN(Number(key)));

    dispatch(setAmount(numberKeys.length));
  }, [dispatch]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink to="/shoppingCart">
        <Button className="relative" variant="ghost">
          <span className="text-xl">{cartIcon}</span>
          <AnimatePresence>
            {amount > 0 && (
              <m.div {...mOpacity}>
                <Badge className="absolute -top-1 right-0" variant="default">
                  {amount}
                </Badge>
              </m.div>
            )}
          </AnimatePresence>
        </Button>
      </NavLink>
      <AnimatePresence>
        {open && !isBurger && amount ? (
          <NavLink to="/shoppingCart">
            <m.div
              {...mFLoatMenu}
              style={{ x: "-72%" }}
              className="absolute -left-[84%] top-12 xl:-left-1/2"
            >
              <div className="absolute -top-5 h-8 w-full bg-transparent" />
              <div className="grid max-h-[44vh] w-max cursor-pointer gap-y-4 overflow-auto rounded-md border bg-background p-4 ">
                {loading && (
                  <div className="flex gap-4">
                    <Skeleton className="w-20 mr-2 aspect-square bg-white" />
                    <div className="w-full space-y-2">
                      <Skeleton className="h-6 bg-white" />
                      <Skeleton className="w-5 h-4 bg-white" />
                    </div>
                  </div>
                )}
                {error && <ErrorMessage error={error} />}
                {items?.map((item) => {
                  if (item && item.id) {
                    const { id, images, title, price } = item;
                    return (
                      <div
                        key={id}
                        className="grid grid-cols-[50px_1fr] items-center gap-x-8"
                      >
                        <div className="h-16 w-16">
                          <img
                            src={images[0]}
                            alt={title}
                            className="rounded-sm object-contain"
                          />
                        </div>
                        <div className="">
                          <h2 className="text-lg font-semibold">{title}</h2>
                          <p>{price}$</p>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </m.div>
          </NavLink>
        ) : (
          open &&
          !isBurger && (
            <m.div
              {...mFLoatMenu}
              style={{ x: "-50%" }}
              className="absolute left-1/3 top-11"
            >
              <div className="absolute -top-6 z-[999] h-8 w-full bg-transparent" />
              <div className="w-max rounded-md border bg-background px-12 py-6 drop-shadow-2xl">
                <p className="text-lg">No items added</p>
              </div>
            </m.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingCartItem;
