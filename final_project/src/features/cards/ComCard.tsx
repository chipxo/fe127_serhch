import { useAppDispatch } from "@/app/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/types/types";
import { isValidImage } from "@/utils/isValidImage";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addAmount, decreaseAmount } from "../amount/amountSlice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cartDelete, cartIcon } from "@/components/common/icons";

type CardProps = ProductType & {
  isHome?: boolean;
  checked?: boolean;
};

const ComCard: React.FC<CardProps> = ({
  id,
  title,
  images,
  category,
  price,
  isHome = false,
}) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const item = localStorage.getItem(`${id}`);
    if (item) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

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
    <Card className="h-full">
      {/* Image */}
      <Link to={`/products/${id}`} className="h-min">
        <img
          src={images?.[0]}
          className="h-min w-full cursor-pointer rounded-t-md object-cover"
          alt={title}
        />
      </Link>

      {/* <Skeleton className="h-[45%] w-full rounded-b-none bg-destructive-foreground" /> */}

      <CardHeader>
        {!isHome && (
          <Badge variant="outline" className="mb-2 w-fit">
            <p>{category?.name}</p>
          </Badge>
        )}
        <Link to={`/products/${id}`}>
          <CardTitle className="mb-2 font-thin leading-6">{title}</CardTitle>
        </Link>
        {isHome && (
          <CardDescription className="text-xl">{`$${price}`}</CardDescription>
        )}
      </CardHeader>
      {!isHome && (
        <>
          <CardContent className="text-2xl">
            <p>${price}</p>
          </CardContent>
          <CardFooter className="space-x-4">
            <Button
              onClick={() => handleDelBtn(id)}
              disabled={!checked}
              variant="destructive"
            >
              {cartDelete}
            </Button>
            <Button
              onClick={() => handleAddBtn(id, title)}
              disabled={checked}
              variant="outline"
            >
              {cartIcon}
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ComCard;
