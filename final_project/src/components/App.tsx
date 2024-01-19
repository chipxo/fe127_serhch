import FakeStore from "./containers/shop/FakeStore";
import NavBar from "./containers/Nav/NavBar";
import Slider from "./containers/Slider";

function App() {
  return (
    <>
      <NavBar />
      <Slider />
      <FakeStore />
    </>
  );
}

export default App;
