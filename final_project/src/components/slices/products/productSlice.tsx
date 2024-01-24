import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/ProductCardType";
import { fetchProduct } from "../../hooks/fetchProduct";

type CardsState = {
  product: ProductType | null;
  loading: boolean;
  error: string | null | {};
};

const initialState: CardsState = {
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload?.data as ProductType;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Fetch failed";
      });
  },
});

export default productSlice.reducer;
