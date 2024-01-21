import { useState } from "react";
import Button from "../../common/buttons/Button";
import { StoreCardProps } from "../../types/ProductCardType";

const BuyCard = ({
  category,
  discountPercentage,
  id,
  images,
  price,
  rating,
  stock,
  title,
}: StoreCardProps) => {
  const [amount, setAmount] = useState(1);

  const addItem = () => {
    setAmount((a) => a + 1);
  };

  const deleteItem = (id: number) => {
    if (amount > 1) {
      setAmount((a) => a - 1);
    } else if (amount === 1) {
      window.localStorage.removeItem(`${id}`);
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl" key={id}>
      <figure>
        <img src={images?.[0]} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{category}</p>
        <p>{discountPercentage}</p>
        <p>{price}</p>
        <p>{rating}</p>
        <p>{stock}</p>
        <p>{amount}</p>
        <div className="card-actions justify-end">
          <Button text="+" color="primary" onClick={addItem} />
          <Button text="-" color="secondary" onClick={() => deleteItem(id)} />
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
