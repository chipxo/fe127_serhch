import { combineReducers } from "@reduxjs/toolkit";
import amountReducer from "@/features/amount/amountSlice.tsx";
import productReducer from "@/features/products/productSlice.tsx";
import productsReducer from "@/features/products/productsSlice.tsx";
import themeReducer from "@/features/theme/themeSlice.tsx";
import amountOfProductsSliceReducer from "@/features/products/amountProdSlice.tsx";
import categoriesReducer from "@/features/categories/categoriesSlice.tsx";
import categoryProductsReducer from "@/features/categories/categoryProducts/categoryProductsSlice.tsx";
import searchProductsReducer from "@/features/searchBar/searchSlice.tsx";
import registerReducer from "@/features/registration/registerSlice.tsx";
import alertReducer from "@/features/alert/alertSlice.tsx";
import totalPriceReducer from "@/features/cards/shopCart/totalPriceSlice";
import categoryFilteredProductsReducer from "@/features/categories/categoryProducts/categoryFilteredProducts/filteredProductsSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  products: productsReducer,
  amountOfProducts: amountOfProductsSliceReducer,
  product: productReducer,
  amount: amountReducer,
  categories: categoriesReducer,
  categoryProducts: categoryProductsReducer,
  categoryFilteredProducts: categoryFilteredProductsReducer,
  searchProducts: searchProductsReducer,
  register: registerReducer,
  totalPrice: totalPriceReducer,
  alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
