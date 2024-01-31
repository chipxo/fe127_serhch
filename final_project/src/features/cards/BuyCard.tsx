import { AnimatePresence, motion as m } from "framer-motion";
import React, { useState } from "react";
import Button from "../../components/common/buttons/Button.tsx";
import { cartDelete } from "../../components/common/icons.tsx";
import { useAppDispatch } from "../../app/store.tsx";
import { decreaseAmount } from "../amount/amountSlice.tsx";
import { ProductType } from "../../types/types.tsx";

type BuyCardProps = ProductType & {
  onClick: () => void;
};

const BuyCard: React.FC<BuyCardProps> = ({
  id,
  images,
  price,
  title,
  onClick,
}) => {
  const [count, setCount] = useState(1);
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();

  const increaseCount = () => {
    setCount((c) => c + 1);
  };

  const decreaseCount = (id: number) => {
    if (count > 1) {
      setCount((c) => c - 1);
    } else if (count === 1) {
      dispatch(decreaseAmount());
      window.localStorage.removeItem(`${id}`);
    }
  };

  const handleChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setCount(Number(value));
      setModal(false);
    } else {
      setModal(true);
    }
  };

  return (
    <div className="my-10 grid h-full w-full gap-y-4 rounded-md border border-neutral bg-base-100 p-5 shadow-md lg:gap-x-4">
      <div>
        <AnimatePresence>
          {modal && (
            <m.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 30 }}
              exit={{ opacity: 0, y: -80 }}
              className="absolute -top-8 left-0 z-[999] h-screen w-full cursor-pointer bg-base-300/80"
              onClick={() => setModal(false)}
            >
              <div className="absolute left-1/2 top-12 -translate-x-1/2 rounded-md bg-base-100 p-12 text-2xl shadow-sm">
                <h2>Write only numbers!</h2>
              </div>
            </m.div>
          )}
        </AnimatePresence>
        <figure className="skeleton h-32 w-full">
          <img
            className="h-full w-full rounded-md object-cover"
            src={images?.[0]}
            alt={title}
          />
        </figure>
      </div>
      <div className="flex flex-col justify-between gap-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-lg font-semibold">
          Total: <span className="text-2xl">{price * count}$</span>
        </p>
        <div className="grid grid-cols-[1fr_0.3fr] items-center justify-items-start gap-x-4">
          <div className="grid grid-cols-[0.3fr_1fr_0.3fr] gap-x-4">
            <button className="text-3xl font-semibold" onClick={increaseCount}>
              +
            </button>
            <input
              className="max-w-14 rounded-md border border-neutral bg-transparent p-2.5 text-center text-xl"
              value={count}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button
              disabled={count === 1}
              className="text-3xl font-semibold disabled:opacity-20"
              onClick={() => decreaseCount(id)}
            >
              -
            </button>
          </div>
          <Button text={cartDelete} color="error" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
