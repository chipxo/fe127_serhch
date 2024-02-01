import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

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
import { mSetting } from "@/utils/motionSettings.tsx";

const ShdcnCard = () => {
  const [checked, setChecked] = useState(false);
  const [imgs, setImgs] = useState(true);
  const [open, setOpen] = useState(false);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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

    const handleResize = () => {
      window.innerWidth <= 1024 ? setImgs(false) : setImgs(true);
    };

    window.addEventListener("resize", handleResize);

    if (localStorage.getItem(`${prodId}`)) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
          <m.div
            {...mSetting}
            className="grid place-items-center fixed inset-0 bg-black/85 z-[999]"
          >
            <div className="sm:max-w-[70vw] relative xl:max-w-[50vw]">
              <Button
                variant="ghost"
                className="absolute right-4 md:right-12 -top-12 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {closeIcon}
              </Button>
              <Carousel setApi={setApi}>
                <CarouselContent>
                  <CarouselItem>
                    <img
                      className="w-2/3 aspect-square mx-auto rounded-md"
                      src={images?.[0]}
                      alt={title}
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      className="w-2/3 aspect-square mx-auto rounded-md"
                      src={
                        isValidImage(images?.[2]) ? images?.[2] : images?.[1]
                      }
                      alt={title}
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      className="w-2/3 aspect-square mx-auto rounded-md"
                      src={
                        isValidImage(images?.[3]) ? images?.[3] : images?.[0]
                      }
                      alt={title}
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="grid grid-cols-3 w-fit absolute -translate-x-1/2 left-1/2 -bottom-6 gap-3">
                <span
                  className={`w-2 h-2 md:w-3 md:h-3 border rounded-full ${current === 1 && "border-ring bg-primary"}`}
                />
                <span
                  className={`w-2 h-2 md:w-3 md:h-3 border rounded-full ${current === 2 && "border-ring bg-primary"}`}
                />
                <span
                  className={`w-2 h-2 md:w-3 md:h-3 border rounded-full ${current === 3 && "border-ring bg-primary"}`}
                />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <section className="min-h-[80vh] border-y">
        <div className="container pt-16">
          <Card className="grid grid-cols-[0.3fr_1fr] xl:grid-cols-[0.24fr_1fr]">
            <CardHeader className="grid place-items-center pr-0">
              {imgs ? (
                <div className="rounded-md shadow-md grid gap-2">
                  <img
                    onClick={() => setOpen(true)}
                    src={images?.[0]}
                    className="cursor-pointer rounded-md object-cover"
                  />
                  <div className="grid gap-3 grid-cols-3 border-t pt-2">
                    <img
                      onClick={() => setOpen(true)}
                      src={images?.[1]}
                      alt={title}
                      className="cursor-pointer rounded-md"
                    />
                    <img
                      onClick={() => setOpen(true)}
                      src={
                        isValidImage(images?.[2]) ? images?.[2] : images?.[1]
                      }
                      alt={title}
                      className="cursor-pointer rounded-md"
                    />
                    <img
                      onClick={() => setOpen(true)}
                      src={images?.[0]}
                      alt={title}
                      className="cursor-pointer rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <img
                  onClick={() => setOpen(true)}
                  className="w-full h-full object-cover rounded-md"
                  src={images?.[0]}
                  alt={title}
                />
              )}
            </CardHeader>
            <div className="grid">
              <CardHeader>
                <Badge variant="destructive" className="w-fit mb-3">
                  {category.name}
                </Badge>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <p>
                  Price: <br />
                  <div className="mt-2 text-3xl text-primary">{price}$</div>
                </p>
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

export default ShdcnCard;
