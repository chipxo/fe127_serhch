import Footer from "./Sections/Footer";
import Gallery from "./Sections/Gallery";
import Header from "./Sections/Header";
import LatestNews from "./Sections/LatestNews";
import Map from "./Sections/Map";
import MaskGroup from "./Sections/MaskGroup";
import Projects from "./Sections/Projects";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <MaskGroup />
        <Projects />
        <LatestNews />
        <Gallery />
        <Map />
      </main>
      <Footer />
    </>
  );
};

export default App;
