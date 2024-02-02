import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loading } from "../../components/common/LoadingError.tsx";
import { fetchProduct } from "../../hooks/fetchProduct.tsx";
import {
  cartDelete,
  cartIcon,
  closeIcon,
} from "../../components/common/icons.tsx";
import { RootState } from "../../app/rootReducer.tsx";
import { useAppDispatch } from "../../app/store.tsx";
import { addAmount, decreaseAmount } from "../amount/amountSlice.tsx";
import { Button } from "@/components/ui/button.tsx";
import { isValidImage } from "@/utils/isValidImage.tsx";
import { AnimatePresence, motion as m } from "framer-motion";
import Gallery from "@/components/containers/gallery/Gallery.tsx";
import { mSetting } from "@/utils/motionSettings.tsx";
import { nanoid } from "@reduxjs/toolkit";

const SingleCard = () => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const { prodId } = useParams();

  const dispatch = useAppDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.soloCard,
  );

  useEffect(() => {
    dispatch(fetchProduct(Number(prodId)));
  }, [dispatch, prodId]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem(`${prodId}`)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  if (!product || loading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  const { id, title, price, description, category, images } = product;

  const handleAddBtn = () => {
    setChecked(true);
    product && localStorage.setItem(`${id}`, `${title}`);
    dispatch(addAmount());
  };

  const handleDelBtn = (id: number) => {
    setChecked(false);
    product && localStorage.removeItem(`${id}`);
    dispatch(decreaseAmount());
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <m.div {...mSetting}>
              <Button
                variant="ghost"
                className="absolute top-40 z-[9999] cursor-pointer text-white md:right-12"
                onClick={() => setOpen(false)}
              >
                {closeIcon}
              </Button>
            </m.div>
            <Gallery title={title} images={images} />
          </>
        )}
      </AnimatePresence>
      <section className="min-h-[80vh] border-y">
        <div className="container py-16">
          <Card className="grid md:grid-cols-[0.4fr_1fr] xl:grid-cols-[0.25fr_1fr]">
            <CardHeader className="grid place-items-center md:pr-0">
              <div className="hidden h-full gap-2 rounded-md lg:grid">
                <img
                  onClick={() => setOpen(true)}
                  src={images?.[0]}
                  className="h-full cursor-pointer rounded-md object-cover shadow-lg"
                />

                <div className="grid grid-cols-3 gap-3 border-t pt-2">
                  {images?.map((src) => (
                    <img
                      key={nanoid()}
                      onClick={() => setOpen(true)}
                      className="cursor-pointer rounded-md shadow-lg"
                      src={src}
                      alt={title}
                    />
                  ))}
                </div>
              </div>

              <img
                onClick={() => setOpen(true)}
                className="h-full w-full rounded-md object-cover lg:hidden"
                src={images?.[0]}
                alt={title}
              />
            </CardHeader>
            <div className="grid">
              <CardHeader>
                <Badge variant="destructive" className="mb-3 w-fit">
                  {category.name}
                </Badge>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div>
                  Price: <br />
                  <p className="mt-2 text-3xl text-primary">{price}$</p>
                </div>
              </CardContent>
              <CardFooter className="self-end">
                <Button
                  variant="outline"
                  disabled={checked}
                  onClick={handleAddBtn}
                  className="mr-4"
                >
                  {cartIcon}
                </Button>
                <Button disabled={!checked} onClick={() => handleDelBtn(id)}>
                  {cartDelete}
                </Button>
              </CardFooter>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default SingleCard;
