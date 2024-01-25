import { createSlice } from "@reduxjs/toolkit";

import { ProductType } from "../../types/ProductCardType";
import { fetchProduct } from "../../hooks/fetchProduct";

type InitialStateType = {
  product: ProductType | null;
  loading: boolean;
  error: string | {} | null;
};

const initialState: InitialStateType = {
  product: null,
  loading: false,
  error: null,
};

const soloCardSlice = createSlice({
  name: "soloCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "fetch failed";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload ?? null;
        state.error = null;
      });
  },
});

export default soloCardSlice.reducer;
