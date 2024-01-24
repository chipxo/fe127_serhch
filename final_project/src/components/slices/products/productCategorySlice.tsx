import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../../hooks/fetchCategory";

type CategoryProductType = {
  id: number;
  image: string;
  name: string;
};

type CardsState = {
  product: CategoryProductType | null;
  loading: boolean;
  error: string | null | {};
};

const initialState: CardsState = {
  product: null,
  loading: false,
  error: null,
};

const productCategory = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload as CategoryProductType | null;
        state.error = null;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Fetch failed";
      });
  },
});

export default productCategory.reducer;
