import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Error, Loading } from "../../common/loading && error/LoadingError";
import { fetchProducts } from "../../hooks/fetchProducts";
import { cartIcon } from "../../icons/Icons";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";
import { setAmount } from "../../slices/amount/amountSlice";
import { StoreCardProps } from "../../types/ProductCardType";

const ShoppingCartItem = () => {
  const [open, setOpen] = useState(true);

  const dispatch = useAppDispatch();
  const { amount } = useSelector((state: RootState) => state.amount);
  const { products, loading, error } = useSelector(
    (state: RootState) => state.fakeStore,
  );

  const localStorageKeys = Object.keys(localStorage);

  const items = localStorageKeys.map((itemId) => {
    const myCards = products.find(
      (product) => product.id === parseFloat(itemId),
    );

    return myCards as StoreCardProps;
  });

  useEffect(() => {
    dispatch(fetchProducts());
    const localStorageLength = window.localStorage.length;

    dispatch(setAmount(localStorageLength > 1 ? localStorageLength - 1 : 0));
  }, [dispatch]);

  return (
    <div
      className="relative "
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink to="/shoppingCart">
        <button className="">
          <div className="indicator">
            <span className="text-xl">{cartIcon}</span>
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
              style={{ x: "-50%" }}
              className="absolute -left-[84%] xl:-left-1/2 top-14"
            >
              <div className="w-full h-8 bg-transparent absolute z-[999] -top-6" />
              <div className="w-8 h-8 bg-base-100 absolute right-1/3 border-l-4 border-t-4 border-neutral rounded-md -top-[14px] rotate-45 z-50" />
              <div className="bg-base-100 drop-shadow-2xl p-6 w-max grid gap-x-10 border-4 rounded-md border-neutral gap-y-4 cursor-pointer max-h-[40vh] overflow-auto">
                {loading && <Loading />}
                {error && <Error error={error} />}
                {items?.map((item) => {
                  if (item && item.id) {
                    const { id, images, title } = item;
                    return (
                      <div
                        key={id}
                        className="grid grid-cols-[50px_1fr] gap-x-4 items-center"
                      >
                        <img
                          src={images[0]}
                          alt={title[0].toUpperCase() + title.slice(1)}
                          className="w-16 h-16 object-contain rounded-md"
                        />
                        <div className="">
                          <h2 className="text-lg font-semibold">{title}</h2>
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
              <div className="bg-base-100 drop-shadow-2xl py-6 px-12 w-max  border-4 rounded-md border-neutral">
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
