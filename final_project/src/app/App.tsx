import { Route, Routes } from "react-router-dom";
import SoloCard from "../features/cards/SoloCard.tsx";
import Home from "../pages/Home.tsx";
import Layout from "../pages/Layout.tsx";
import ShoppingCart from "../pages/ShoppingCart.tsx";
import WebFont from "webfontloader";
import { useEffect } from "react";
import CategoryProducts from "../features/categories/categoryProducts/CategoryProducts.tsx";
import FoundProducts from "../pages/FoundProducts.tsx";

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Merriweather", "Roboto Condensed"],
      },
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/searchResults" element={<FoundProducts />} />
        <Route path="/products/:prodId" element={<SoloCard />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route
          path="/products/categories/:categoryId"
          element={<CategoryProducts />}
        />
      </Route>
    </Routes>
  );
};

export default App;
