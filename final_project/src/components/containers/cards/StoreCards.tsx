import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/buttons/Button";
import { cartChecked, cartDelete, cartIcon, cartUser } from "../../icons/Icons";
import { StoreCardProps } from "../../types/ProductCardType";

const StoreCard = ({
  category,
  discountPercentage,
  id,
  images,
  price,
  rating,
  stock,
  title,
}: StoreCardProps) => {
  const [amount, setAmount] = useState(false);
  const localStorage = window.localStorage;

  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem(`${id}`);
    if (item) {
      setAmount(true);
    } else {
      setAmount(false);
    }
  }, []);

  const toSoloCard = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleAddBtn = (id: number, title: string) => {
    setAmount(true);
    localStorage.setItem(`${id}`, `${title}`);
  };

  const handleDelBtn = (id: number) => {
    setAmount(false);
    localStorage.removeItem(`${id}`);
  };

  return (
    <div className="card w-full cursor-pointer bg-base-100 shadow-2xl h-full">
      {/* Image */}
      <figure>
        <img
          onClick={() => toSoloCard(id)}
          src={images?.[0]}
          className="h-80 w-full bg-white object-contain p-4"
          alt={title}
        />
      </figure>
      <div className="card-body">
        <div className="card-actions">
          {/* Category */}
          <div className="badge badge-outline border-primary p-3">
            {category}
          </div>
        </div>
        {/* Title and Rating*/}
        <h2 className="card-title gap-8" onClick={() => toSoloCard(id)}>
          <span>
            {title[0].toUpperCase() + title.slice(1)}
            {amount && cartChecked}
          </span>
          <div className="badge badge-secondary">{rating}</div>
        </h2>
        <div className="card-actions my-2">
          <div className="badge badge-outline border-neutral p-3 opacity-60">
            <span className="line-through">
              ${Math.floor(price + price / discountPercentage)}
            </span>
          </div>
          <div className="badge badge-outline border-secondary p-3">
            ${price}
          </div>
          <div className="badge badge-outline ml-auto border-accent p-3">
            {cartUser} {stock}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-24 mt-auto">
          <Button
            text={cartIcon}
            color={"accent"}
            onClick={() => handleAddBtn(id, title)}
          />
          <div className="grid">
            <Button
              text={cartDelete}
              color={"secondary"}
              onClick={() => handleDelBtn(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
