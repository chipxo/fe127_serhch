import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slides from "../../data/slidesMaskGroup.json";
import Slide from "./Slide";

export default () => {
  return (
    <Swiper
      className="h-[60vh] md:h-screen "
      modules={[Autoplay, Navigation, Pagination, A11y]}
      direction={"vertical"}
      loop={true}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      <div className="container">
        {[...slides].map(({ id, className, title, description, bg }) => (
          <SwiperSlide key={id} className={className}>
            <Slide title={title} description={description} bg={bg}></Slide>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
};
