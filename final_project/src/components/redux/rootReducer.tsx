import { combineReducers } from "@reduxjs/toolkit";
import amountReducer from "../slices/amount/amountSlice";
import soloCardReducer from "../slices/cards/soloCardSlice";
import productReducer from "../slices/products/productSlice.tsx";
import fakeStoreReducer from "../slices/products/productsSlice.tsx";
import themeReducer from "../slices/theme/themeSlice";
import amountOfProductsSliceReducer from "../slices/products/amountProdSlice.tsx";
import productCategoryReducer from "../slices/categories/soloCategory/productCategorySlice.tsx";
import categoriesReducer from "../slices/categories/categoriesSlice.tsx";
import categoryProductsReducer from "../slices/categories/categoryProducts/categoryProductsSlice.tsx";
import searchProductsReducer from "../slices/searchBar/searchSlice.tsx";

const rootReducer = combineReducers({
  theme: themeReducer,
  products: fakeStoreReducer,
  amountOfProducts: amountOfProductsSliceReducer,
  amount: amountReducer,
  product: productReducer,
  soloCard: soloCardReducer,
  // productCategory: productCategoryReducer,
  categories: categoriesReducer,
  categoryProducts: categoryProductsReducer,
  searchProducts: searchProductsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
