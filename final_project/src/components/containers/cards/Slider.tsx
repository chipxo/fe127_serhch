import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../hooks/fetchProducts";
import { RootState } from "../../reduxStore/rootReducer";
import { useAppDispatch } from "../../reduxStore/store";

const AutoPlay = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products } = useSelector((state: RootState) => state.fakeStore);

  type ImageProp = {
    id: number;
    title: string;
    images: string[];
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
    <div className="mt-10 overflow-hidden">
      <Slider {...settings} className="cursor-grab">
        {products.map(({ id, title, images }: ImageProp) => (
          <div className="" key={id}>
            <img
              src={images[1]}
              className="h-40 w-screen border-x-2 border-neutral object-cover"
              alt={title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoPlay;
