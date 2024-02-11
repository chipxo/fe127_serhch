import { fetchFilterCategoryPrice } from "@/hooks/fetchFilterCategoryPrice";
import { ProductType } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  products: ProductType[];
  loading: boolean;
  error: string | {} | null;
  lowestPr: number;
  highestPr: number;
};

const initialState: InitialStateType = {
  products: [],
  loading: false,
  error: null,
  lowestPr: 0,
  highestPr: 0,
};

const filteredProductsSlice = createSlice({
  name: "categoryFilteredProducts",
  initialState,
  reducers: {
    setLowestPr: (state, action: PayloadAction<number>) => {
      state.lowestPr = action.payload;
    },
    setHighestPr: (state, action: PayloadAction<number>) => {
      state.highestPr = action.payload;
    },
    setFilteredProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterCategoryPrice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFilterCategoryPrice.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.products = action.payload;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(
        fetchFilterCategoryPrice.rejected,
        (state, action: PayloadAction<unknown, string>) => {
          state.loading = false;
          state.error = action.payload ?? "fetch failed";
        },
      );
  },
});

export const { setLowestPr, setHighestPr, setFilteredProducts } =
  filteredProductsSlice.actions;

export default filteredProductsSlice.reducer;
