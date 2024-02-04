import { ProductType } from "@/types/types";
import { isValidImage } from "@/utils/isValidImage";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderHeader from "./SliderHeader";

type CarouselProps = {
  products: ProductType[];
};

const Carousel: React.FC<CarouselProps> = ({ products }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    speed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
  };

  return (
    <div className="bg-animated-bg relative my-6 overflow-hidden border-y bg-cover bg-no-repeat py-4 md:my-12 md:shadow-lg">
      <div className="absolute top-16 z-[30] w-full text-center backdrop-blur-md">
        <SliderHeader />
      </div>
      {products && (
        <Slider {...settings}>
          {products.map(
            ({ title, images }) =>
              isValidImage(images[0]) && (
                <div key={nanoid()} className="px-1.5">
                  <img
                    src={images[1]}
                    className="h-fit max-h-44 w-full rounded-md object-cover"
                    alt={title}
                  />
                </div>
              ),
          )}
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
