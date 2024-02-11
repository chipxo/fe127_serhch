import { closeIcon } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { isValidImage } from "@/utils/isValidImage";
import { mOpacity } from "@/utils/motionSettings.tsx";
import { motion as m } from "framer-motion";
import React, { useEffect, useState } from "react";

type GalleryProps = {
  images: string[];
  title: string;
  handleCloseGallery: () => void;
};

const Gallery: React.FC<GalleryProps> = ({
  images,
  title,
  handleCloseGallery,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <m.div
      {...mOpacity}
      className="fixed inset-0 z-[999] grid place-items-center bg-black/85"
    >
      <div className="relative sm:max-w-[70vw] xl:max-w-[50vw]">
        <Button
          variant="ghost"
          className="absolute -top-14 right-4 z-[9999] cursor-pointer text-white sm:-right-14 sm:-top-10"
          onClick={handleCloseGallery}
        >
          {closeIcon}
        </Button>
        <Carousel setApi={setApi}>
          <CarouselContent>
            <CarouselItem>
              <img
                className="mx-auto aspect-square w-2/3 rounded-md"
                src={images?.[0]}
                alt={title}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                className="mx-auto aspect-square w-2/3 rounded-md"
                src={isValidImage(images?.[1]) ? images?.[1] : images?.[0]}
                alt={title}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                className="mx-auto aspect-square w-2/3 rounded-md"
                src={isValidImage(images?.[2]) ? images?.[2] : images?.[0]}
                alt={title}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="absolute -bottom-6 left-1/2 grid w-fit -translate-x-1/2 grid-cols-3 gap-3">
          <span
            className={`h-2 w-2 rounded-full border md:h-3 md:w-3 ${current === 1 && "border-ring bg-primary"}`}
          />
          <span
            className={`h-2 w-2 rounded-full border md:h-3 md:w-3 ${current === 2 && "border-ring bg-primary"}`}
          />
          <span
            className={`h-2 w-2 rounded-full border md:h-3 md:w-3 ${current === 3 && "border-ring bg-primary"}`}
          />
        </div>
      </div>
    </m.div>
  );
};

export default Gallery;
