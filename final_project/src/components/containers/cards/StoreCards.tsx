import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/buttons/Button";
import { cartChecked, cartDelete, cartIcon } from "../../icons/Icons";
import { useAppDispatch } from "../../reduxStore/store";
import { addAmount, decreaseAmount } from "../../slices/amount/amountSlice";
import { ProductType } from "../../types/ProductCardType";

const StoreCard = ({ id, title, price, category, images }: ProductType) => {
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
    <div className="card w-full cursor-pointer bg-base-100 shadow-2xl h-full">
      {/* Image */}
      <figure>
        <img
          onClick={() => toSoloCard(id)}
          src={images?.[0]}
          className="w-full"
          alt={title}
        />
      </figure>
      <div className="card-body">
        <div className="card-actions">
          {/* Category */}
          <div className="badge badge-outline border-primary p-3">
            {category?.name}
          </div>
          {checked && cartChecked}
        </div>
        {/* Title and Rating*/}
        <h2 className="card-title gap-8" onClick={() => toSoloCard(id)}>
          <span>{title[0].toUpperCase() + title.slice(1)}</span>
        </h2>
        <div className="card-actions my-2">
          <div className="text-4xl font-bold">${price}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-24 mt-auto">
          <Button
            text={cartIcon}
            color={"primary"}
            onClick={() => handleAddBtn(id, title)}
            disabled={checked}
          />
          <div className="grid">
            <Button
              text={cartDelete}
              color={"secondary"}
              onClick={() => handleDelBtn(id)}
              disabled={!checked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
