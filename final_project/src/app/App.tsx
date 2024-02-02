import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import Layout from "@/pages/Layout.tsx";
import ShoppingCart from "@/pages/ShoppingCart.tsx";
import WebFont from "webfontloader";
import { useEffect } from "react";
import CategoryProducts from "@/features/categories/categoryProducts/CategoryProducts.tsx";
import FoundProducts from "@/pages/FoundProducts.tsx";
import { setSignedIn } from "@/features/registration/registerSlice.tsx";
import { useAppDispatch } from "./store";
import Page404 from "@/pages/Page404.tsx";
import { ThemeProvider } from "@/features/theme/theme-provider";
import SingleCard from "@/features/cards/SingleCard";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("signedIn")) dispatch(setSignedIn(true));

    WebFont.load({
      google: {
        families: ["Merriweather", "Roboto Condensed"],
      },
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/searchResults" element={<FoundProducts />} />
          <Route path="/products/:prodId" element={<SingleCard />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route
            path="/products/categories/:categoryId"
            element={<CategoryProducts />}
          />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
