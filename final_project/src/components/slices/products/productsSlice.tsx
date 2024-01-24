// storeSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../hooks/fetchProducts.tsx";
import { ProductType } from "../../types/ProductCardType.tsx";

type ProductsStateType = {
  products: ProductType[] | undefined;
  loading: boolean;
  error: string | null | {};
};

const initialState: ProductsStateType = {
  products: [],
  loading: false,
  error: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Fetch failed";
      });
  },
});

export default productsSlice.reducer;
