import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import React from "react";
import { ProductType } from "@/types/types";
import { nanoid } from "@reduxjs/toolkit";
import SliderHeader from "./SliderHeader";
import { isValidImage } from "@/utils/isValidImage";

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
    <section className="relative overflow-hidden border-neutral py-3 md:border-y md:shadow-lg">
      <div className="z-[30] w-full bg-base-100/80 text-center backdrop-blur-md">
        <SliderHeader />
      </div>
      {products && (
        <Slider {...settings}>
          {products.map(
            ({ title, images }) =>
              isValidImage(images[0]) && (
                <div key={nanoid()}>
                  <img
                    src={images[1]}
                    className="h-40 w-screen rounded-md border-x-4 border-base-100 object-cover"
                    alt={title}
                  />
                </div>
              ),
          )}
        </Slider>
      )}
    </section>
  );
};

export default Carousel;
