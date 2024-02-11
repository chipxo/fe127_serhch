import { fetchCategoryProducts } from "@/hooks/fetchCategoryProducts.tsx";
import { ProductType } from "@/types/types.tsx";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  products: ProductType[] | undefined;
  loading: boolean;
  error: string | {} | null;
};

const initialState: InitialStateType = {
  products: undefined,
  loading: false,
  error: null,
};

const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {
    setCategoryProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryProducts.fulfilled,
        (state, action: PayloadAction<ProductType[] | undefined>) => {
          state.loading = false;
          state.products = action.payload;
          state.error = null;
        },
      )
      .addCase(
        fetchCategoryProducts.rejected,
        (state, action: PayloadAction<unknown, string>) => {
          state.loading = false;
          state.error = action.payload ?? "fetch failed";
        },
      );
  },
});

export const { setCategoryProducts } = categoryProductsSlice.actions;

export default categoryProductsSlice.reducer;
