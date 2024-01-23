import { useState } from "react";
import Button from "../../common/buttons/Button";
import { cartDelete } from "../../icons/Icons";
import { StoreCardProps } from "../../types/ProductCardType";

const BuyCard = ({
  discountPercentage,
  id,
  images,
  price,
  title,
}: StoreCardProps) => {
  const [count, setCount] = useState(1);

  const addItem = () => {
    setCount((a) => a + 1);
  };

  const deleteItem = (id: number) => {
    if (count > 1) {
      setCount((a) => a - 1);
    } else if (count === 1) {
      window.localStorage.removeItem(`${id}`);
    }
  };

  return (
    <div
      className="bg-base-100 grid grid-cols-[0.6fr_1fr] gap-x-4 lg:gap-x-12 shadow-xl container my-10 p-4 lg:p-8 rounded-md"
      key={id}
    >
      <div className="">
        <figure className="h-full">
          <img
            className="rounded-md w-full h-full object-contain bg-white p-3 max-h-[30vh]"
            src={images?.[0]}
            alt={title}
          />
        </figure>
      </div>
      <div className="text-xl flex flex-col py-4 gap-y-4 justify-between">
        <h2 className="text-4xl">{title}</h2>
        <p className="opacity-60 line-through">
          {Math.round(price + price / discountPercentage) * count}$
        </p>
        <p>Total: {price * count}$</p>
        <div className="flex gap-x-4">
          <button className="text-3xl font-semibold" onClick={addItem}>
            +
          </button>
          <span className="w-1/5 text-neutral">
            <Button text={count} color="" />
          </span>
          <button
            className="text-3xl font-semibold"
            onClick={() => deleteItem(id)}
          >
            -
          </button>
          <div className="ml-auto w-1/5">
            <Button text={cartDelete} color="error" />
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-x-4 items-end">
          <Button text="+" color="primary" onClick={addItem} />
          <Button text="-" color="secondary" onClick={() => deleteItem(id)} />
        </div> */}
      </div>
    </div>
  );
};

export default BuyCard;
