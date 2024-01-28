import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import React from "react";
import { ProductType } from "../../../types/types";
import { nanoid } from "@reduxjs/toolkit";

type AutoPlayProps = {
  products: ProductType[];
};
const AutoPlay: React.FC<AutoPlayProps> = ({ products }) => {
  type ImageProp = {
    title: string;
    images: string[];
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: false,
  };

  const isValidImage = (url: string) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.width > 0 && img.height > 0;
  };

  return (
    <section className="relative overflow-hidden border-neutral pb-1.5 pt-3 md:border-y md:shadow-lg">
      <div className="z-[30] w-full bg-base-100/80 text-center backdrop-blur-md md:absolute md:top-1/2 md:-translate-y-1/2 md:py-6">
        <h2 className="text-4xl font-bold text-primary md:text-5xl">
          Sales up to -70%!
        </h2>
      </div>
      {products && (
        <Slider {...settings} className="hidden md:block">
          {products.map(
            ({ title, images }: ImageProp) =>
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

export default AutoPlay;
