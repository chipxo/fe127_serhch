import { combineReducers } from "@reduxjs/toolkit";
import amountReducer from "../slices/amount/amountSlice";
import shoppingCartReducer from "../slices/shopCartSlices/cartSlice";
import soloCardReducer from "../slices/soloCard/soloCardSlice";
import productReducer from "../slices/storeSlice/productSlice";
import fakeStoreReducer from "../slices/storeSlice/storeSlice";
import themeReducer from "../slices/theme/themeSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  fakeStore: fakeStoreReducer,
  cart: shoppingCartReducer,
  amount: amountReducer,
  product: productReducer,
  soloCard: soloCardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
