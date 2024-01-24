import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/buttons/Button";
import { cartChecked, cartDelete, cartIcon } from "../../icons/Icons";
import { useAppDispatch } from "../../reduxStore/store";
import { addAmount, decreaseAmount } from "../../slices/amount/amountSlice";
import { Card } from "../../types/ProductCardType";

const StoreCard: React.FC<Card> = ({
  id,
  title,
  price,
  category,
  images,
  isHome = false,
}) => {
  const [checked, setChecked] = useState(false);
  const localStorage = window.localStorage;
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem(`${id}`);
    if (item) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  const toSoloCard = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleAddBtn = (id: number, title: string) => {
    dispatch(addAmount());
    setChecked(true);
    localStorage.setItem(`${id}`, `${title}`);
  };

  const handleDelBtn = (id: number) => {
    dispatch(decreaseAmount());
    setChecked(false);
    localStorage.removeItem(`${id}`);
  };

  return (
    <div className="flex h-full cursor-pointer flex-col rounded-md bg-base-100 shadow-2xl">
      {/* Image */}
      <figure>
        <img
          onClick={() => toSoloCard(id)}
          src={images?.[0]}
          className="rounded-t-md"
          alt={title}
        />
      </figure>
      <div className="grid h-full gap-4 p-4">
        <div>
          {/* Category */}
          <div className="badge badge-outline border-primary p-3">
            <p>{category?.name}</p>
          </div>
          {checked && cartChecked}
          {/* Title */}
          <h2 className="mt-4 text-lg" onClick={() => toSoloCard(id)}>
            {title[0].toUpperCase() + title.slice(1)}
          </h2>
        </div>
        <div
          className={`grid w-full items-end gap-x-2 ${isHome ? "grid-cols-[1fr_0.5fr_0.3fr]" : "grid-cols-[1fr_0.4fr_0.3fr]"}`}
        >
          {/* Price */}
          <p className="text-3xl font-semibold">${price}</p>

          <Button
            text={cartDelete}
            color={"error"}
            onClick={() => handleDelBtn(id)}
            disabled={!checked}
          />
          <Button
            text={cartIcon}
            color={"accent"}
            onClick={() => handleAddBtn(id, title)}
            disabled={checked}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
