import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../../types/ProductCardType";
import { fetchCategoryProducts } from "../../../hooks/fetchCategoryProducts";

type InitialStateType = {
  products: ProductType[] | null;
  loading: boolean;
  error: string | {} | null;
};

const initialState: InitialStateType = {
  products: null,
  loading: false,
  error: null,
};

const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload ?? null;
        state.error = null;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "fetch failed";
      });
  },
});

export default categoryProductsSlice.reducer;
