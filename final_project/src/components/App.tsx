import { Route, Routes } from "react-router-dom";
import SoloCard from "./slices/cards/SoloCard.tsx";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ShoppingCart from "./pages/ShoppingCart";
import Shop from "./slices/products/Products.tsx";
import WebFont from "webfontloader";
import { useEffect } from "react";
import ProductsCategory from "./slices/products/ProductsCategory.tsx";

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
        <Route path="/products" element={<Shop />} />
        <Route path="/products/:prodId" element={<SoloCard />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route
          path="/products/categories/:categoryId"
          element={<ProductsCategory />}
        />
      </Route>
    </Routes>
  );
};

export default App;
