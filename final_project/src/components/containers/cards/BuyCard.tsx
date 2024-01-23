import { useState } from "react";
import Button from "../../common/buttons/Button";
import { cartDelete } from "../../icons/Icons";
import { useAppDispatch } from "../../reduxStore/store";
import { decreaseAmount } from "../../slices/amount/amountSlice";
import { StoreCardProps } from "../../types/ProductCardType";

const BuyCard = ({
  discountPercentage,
  id,
  images,
  price,
  title,
  onClick,
}: StoreCardProps) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) {
      setCount(Number(e.target.value));
      setModal(false); // Close the modal if input is valid
    } else {
      alert("Enter only numbers!");
      setModal(true);
    }
  };

  return (
    <div
      className="bg-base-100 grid grid-cols-[0.6fr_1fr] gap-x-4 lg:gap-x-12 shadow-xl container my-10 p-4 lg:p-8 rounded-md"
      key={id}
    >
      <div className="">
        {modal && (
          <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box">
                <h3 className="text-lg font-bold">
                  Enter only numbers please!
                </h3>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_7">
                Close
              </label>
            </div>
          </>
        )}

        <figure className="h-full">
          <img
            className="rounded-md w-full h-full object-contain bg-white p-3 max-h-[30vh]"
            src={images?.[0]}
            alt={title}
          />
        </figure>
      </div>
      <div className="text-xl flex flex-col py-4 gap-y-4 justify-between">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="opacity-60 line-through">
          {Math.round(price + price / discountPercentage) * count}$
        </p>
        <p className="font-semibold">Total: {price * count}$</p>
        <div className="flex gap-x-4">
          <button className="text-3xl font-semibold" onClick={increaseCount}>
            +
          </button>

          <input
            className="rounded-md bg-transparent text-xl w-1/6 text-center border border-neutral"
            value={count}
            onChange={(e) => handleChange(e)}
          />

          <button
            disabled={count === 1}
            className="text-3xl font-semibold disabled:opacity-20"
            onClick={() => decreaseCount(id)}
          >
            -
          </button>
          <div className="ml-auto w-1/6">
            <Button text={cartDelete} color="error" onClick={onClick} />
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
