import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ProductType } from "@/types/types.tsx";
import { fetchProduct } from "@/hooks/fetchProduct.tsx";

type InitialStateType = {
  product: ProductType | undefined;
  loading: boolean;
  error: string | {} | null;
};

const initialState: InitialStateType = {
  product: undefined,
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
      .addCase(
        fetchProduct.rejected,
        (state, action: PayloadAction<unknown, string>) => {
          state.loading = false;
          state.error = action.payload ?? "fetch failed";
        },
      )
      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<ProductType | undefined>) => {
          state.loading = false;
          state.product = action.payload;
          state.error = null;
        },
      );
  },
});

export default soloCardSlice.reducer;
