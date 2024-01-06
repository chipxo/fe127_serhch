import SectionsTitle from "../common/SectionsTitle";
import Slider from "../containers/sliderNews/Slider";

const LatestNews = () => {
  return (
    <section id="news" className="bg-news scroll-mt-6 bg-cover bg-center">
      <div className="container px-4 py-20 md:px-0">
        <div className="mb-10 lg:mb-20">
          <SectionsTitle text={"Latest News"} isBgDark={true} isTitle={true} />
        </div>
        <Slider />
      </div>
    </section>
  );
};

export default LatestNews;
