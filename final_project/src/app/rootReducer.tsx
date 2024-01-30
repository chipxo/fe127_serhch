import { combineReducers } from "@reduxjs/toolkit";
import amountReducer from "../features/amount/amountSlice.tsx";
import soloCardReducer from "../features/cards/soloCardSlice.tsx";
import productReducer from "../features/products/productSlice.tsx";
import productsReducer from "../features/products/productsSlice.tsx";
import themeReducer from "../features/theme/themeSlice.tsx";
import amountOfProductsSliceReducer from "../features/products/amountProdSlice.tsx";
import categoriesReducer from "../features/categories/categoriesSlice.tsx";
import categoryProductsReducer from "../features/categories/categoryProducts/categoryProductsSlice.tsx";
import searchProductsReducer from "../features/searchBar/searchSlice.tsx";
import registerReducer from "../features/registration/registerSlice.tsx";

const rootReducer = combineReducers({
  theme: themeReducer,
  amount: amountReducer,
  amountOfProducts: amountOfProductsSliceReducer,
  products: productsReducer,
  product: productReducer,
  soloCard: soloCardReducer,
  categories: categoriesReducer,
  categoryProducts: categoryProductsReducer,
  searchProducts: searchProductsReducer,
  register: registerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
