import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Error, Loading } from "../../common/loading && error/LoadingError";
import { fetchProducts } from "../../hooks/fetchProducts";
import { cartIcon } from "../../common/icons/Icons";
import { RootState } from "../../redux/rootReducer";
import { useAppDispatch } from "../../redux/store";
import { setAmount } from "../../slices/amount/amountSlice";
import { ProductType } from "../../types/ProductCardType";

const ShoppingCartItem = () => {
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
    const localStorageLength = window.localStorage.length;

    dispatch(setAmount(localStorageLength > 1 ? localStorageLength - 1 : 0));
  }, [dispatch]);

  return (
    <div
      className="relative hidden sm:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink to="/shoppingCart">
        <button className="">
          <div className="indicator">
            <span className="text-2xl">{cartIcon}</span>
            {amount > 0 && (
              <span className="badge indicator-item badge-primary badge-md">
                {amount}
              </span>
            )}
          </div>
        </button>
      </NavLink>
      <AnimatePresence>
        {open && amount ? (
          <NavLink to="/shoppingCart">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ x: "-72%" }}
              className="absolute -left-[84%] top-12 xl:-left-1/2"
            >
              <div className="absolute -top-5 z-[999] h-8 w-full bg-transparent" />
              <div className="grid max-h-[44vh] w-max cursor-pointer gap-y-4 overflow-auto rounded-md border-4 border-neutral bg-base-100 p-4">
                {loading && <Loading />}
                {error && <Error error={error} />}
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
                            alt={title[0].toUpperCase() + title.slice(1)}
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
            </motion.div>
          </NavLink>
        ) : (
          open && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              style={{ x: "-50%" }}
              className="absolute left-1/3 top-14"
            >
              <div className="w-max rounded-md border-4 border-neutral bg-base-100  px-12 py-6 drop-shadow-2xl">
                <p className="text-lg">No items added</p>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingCartItem;
