// storeSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/ProductCardType";
import { fetchAmountOfProducts } from "../../hooks/fetchAmountOfProducts";

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

const amountOfProductsSlice = createSlice({
  name: "amountOfProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmountOfProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmountOfProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchAmountOfProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Fetch failed";
      });
  },
});

export default amountOfProductsSlice.reducer;
