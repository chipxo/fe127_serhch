// storeSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "../../hooks/fetchProduct";
import { Product } from "../../types/ProductCardType";

type ProductState = {
  product: Product[];
  loading: boolean;
  error: string | null | {};
};

const initialState: ProductState = {
  product: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<{ product: Product[] }>) => {
          state.loading = false;
          state.product = action.payload.product;
          state.error = null;
        },
      )
      .addCase(
        fetchProduct.rejected,
        (state, action: PayloadAction<unknown, string>) => {
          state.loading = false;
          state.error = action.payload ?? "Fetch failed";
        },
      );
  },
});

export default productSlice.reducer;
