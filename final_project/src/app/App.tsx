import CategoryProducts from "@/features/categories/categoryProducts/CategoryProducts.tsx";
import { setSignedIn } from "@/features/registration/registerSlice.tsx";
import { ThemeProvider } from "@/features/theme/theme-provider";
import FoundProducts from "@/pages/FoundProducts.tsx";
import Home from "@/pages/Home/Home.tsx";
import Layout from "@/pages/Layout.tsx";
import Page404 from "@/pages/Page404.tsx";
import ShoppingCart from "@/pages/ShoppingCart.tsx";
import SingleCardPage from "@/pages/SingleCardPage";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useAppDispatch } from "./store";

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
          <Route path="/products/:prodId" element={<SingleCardPage />} />
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
