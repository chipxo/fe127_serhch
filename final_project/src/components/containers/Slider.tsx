import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { RootState } from "../store/rootReducer";
import { fetchItems } from "./shop/storeSlice";

const AutoPlay = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const { products } = useSelector((state: RootState) => state.fakeStore);

  type ImageProp = {
    id: number;
    image: string;
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  return (
    <div className="mt-10">
      <Slider {...settings} className="cursor-grab">
        {products.map(({ id, image }: ImageProp) => (
          <div className="" key={id}>
            <img
              src={image}
              className="h-40 w-full border bg-white object-contain p-4"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoPlay;
