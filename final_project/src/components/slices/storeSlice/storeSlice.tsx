// storeSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../hooks/fetchProducts";
import { ProductType } from "../../types/ProductCardType";

type FakeStoreState = {
  products: ProductType[];
  loading: boolean;
  error: string | null | {};
};

const initialState: FakeStoreState = {
  products: [],
  loading: false,
  error: {},
};

const storeSlice = createSlice({
  name: "fakeStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<{ products: ProductType[] }>) => {
          state.loading = false;
          state.products = action.payload;
          state.error = null;
        },
      )
      .addCase(
        fetchProducts.rejected,
        (state, action: PayloadAction<unknown, string>) => {
          state.loading = false;
          state.error = action.payload ?? "Fetch failed";
        },
      );
  },
});

export default storeSlice.reducer;
