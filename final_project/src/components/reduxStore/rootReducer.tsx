import { combineReducers } from "@reduxjs/toolkit";
import shoppingCartReducer from "../slices/shopCartSlices/cartSlice";
import fakeStoreReducer from "../slices/storeSlice/storeSlice";

const rootReducer = combineReducers({
  fakeStore: fakeStoreReducer,
  cart: shoppingCartReducer,
  // Add other reducers here if you have more slices
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
