import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/buttons/Button.tsx";
import {
  cartChecked,
  cartDelete,
  cartIcon,
} from "../../components/common/icons.tsx";
import { useAppDispatch } from "../../app/store.tsx";
import { addAmount, decreaseAmount } from "../amount/amountSlice.tsx";
import { ProductType } from "../../types/types.tsx";

type StoreCardProps = ProductType & {
  isHome?: boolean;
  checked?: boolean;
};

const CommonCard: React.FC<StoreCardProps> = ({
  id,
  title,
  images,
  category,
  price,
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
    <>
      <div className="flex h-full cursor-pointer flex-col overflow-hidden rounded-md bg-base-100 shadow-2xl">
        {/* Image */}
        <figure>
          <img
            onClick={() => toSoloCard(id)}
            src={images?.[0]}
            className="rounded-t-md"
            alt={title}
          />
        </figure>
        <div className="grid h-full p-4">
          {/* Category */}
          {!isHome && (
            <div className="badge badge-outline relative border-primary p-3 ">
              <p>{category?.name}</p>
              {!isHome && checked && (
                <div className="absolute -right-7 top-0.5">{cartChecked}</div>
              )}
            </div>
          )}

          {/* Title */}
          <div className="mt-2 grid grid-cols-[1fr_0.24fr] items-center gap-x-1">
            <Link to={`/products/${id}`}>
              <h2 className="text-md">{title}</h2>
            </Link>
            <p className="text-xl">{isHome && `$${price}`}</p>
          </div>
          {!isHome && (
            <div className="mt-2 grid w-full items-end">
              <p className="text-3xl font-semibold">${price}</p>
              <div className="mt-4 grid grid-cols-2 gap-x-6">
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
          )}
        </div>
      </div>
    </>
  );
};

export default CommonCard;
