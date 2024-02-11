import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { cartDelete } from "@/components/common/icons.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/types/types.tsx";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decTotalPrice, incTotalPrice } from "./totalPriceSlice.tsx";

type BuyCardProps = ProductType & {
  onClick?: () => void;
};

const BuyCard: React.FC<BuyCardProps> = ({
  id,
  images,
  price,
  title,
  onClick,
}) => {
  const dispatch = useAppDispatch();

  const count = useSelector(
    (state: RootState) => state.totalPrice.counts[id] || 1,
  );

  const increaseCount = () => {
    dispatch(incTotalPrice({ id, price }));
  };

  const decreaseCount = () => {
    if (count > 1) {
      dispatch(decTotalPrice({ id, price }));
    }
  };

  return (
    <Card
      key={id}
      className="grid w-full grid-cols-[0.33fr_1fr] items-center gap-1 md:grid-cols-[0.3fr_1fr] md:gap-2"
    >
      <CardHeader className="h-full pr-0">
        <img
          src={images?.[1]}
          alt={title}
          className=" h-full w-full rounded-md object-cover md:block"
        />
        <Avatar className="hidden">
          <AvatarImage src={images?.[1]} />
          <AvatarFallback />
        </Avatar>
      </CardHeader>
      <div className="flex flex-grow flex-col">
        <CardHeader className="max-md:mb-2">
          <Link to={`/products/${id}`}>
            <CardTitle>{title}</CardTitle>
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-lg md:text-2xl">{price}$</p>
        </CardContent>
        <CardFooter className="flex-grow">
          <div className="grid grid-cols-[1fr_0.7fr] md:grid-cols-2 md:gap-8">
            <div className="grid grid-cols-3 justify-items-center gap-3 sm:pr-4 md:border-r">
              <Button
                variant="ghost"
                className="text-xl"
                onClick={increaseCount}
              >
                +
              </Button>

              <Button
                variant="outline"
                className="cursor-default hover:bg-background"
              >
                {count}
              </Button>
              <Button
                onClick={decreaseCount}
                variant="ghost"
                className="text-xl"
                disabled={count <= 1}
              >
                -
              </Button>
            </div>
            <div className="w-fit max-sm:justify-self-end">
              <Button onClick={onClick}>{cartDelete}</Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BuyCard;
