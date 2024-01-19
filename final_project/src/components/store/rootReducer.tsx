import { combineReducers } from "@reduxjs/toolkit";
import fakeStoreReducer from "../containers/shop/storeSlice";

const rootReducer = combineReducers({
  fakeStore: fakeStoreReducer,
  // Add other reducers here if you have more slices
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
