import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/types.tsx";
import { fetchAmountOfProducts } from "../../hooks/fetchAmountOfProducts.tsx";

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
      .addCase(
        fetchAmountOfProducts.fulfilled,
        (state, action: PayloadAction<ProductType[] | undefined>) => {
          state.loading = false;
          state.products = state.products
            ? [...state.products, ...(action.payload as ProductType[])]
            : action.payload;
          state.error = null;
        },
      )
      .addCase(
        fetchAmountOfProducts.rejected,
        (state, action: PayloadAction<unknown, string>) => {
          state.loading = false;
          state.error = action.payload ?? "Fetch failed";
        },
      );
  },
});

export default amountOfProductsSlice.reducer;
