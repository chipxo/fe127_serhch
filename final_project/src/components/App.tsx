import { Route, Routes } from "react-router-dom";
import SoloCard from "./containers/cards/SoloCard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ShoppingCart from "./pages/ShoppingCart";
import Shop from "./slices/storeSlice/FakeStore";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:prodId" element={<SoloCard />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
      </Route>
    </Routes>
  );
}

export default App;
