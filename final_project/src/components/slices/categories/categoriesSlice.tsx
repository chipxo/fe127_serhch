import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../../hooks/fetchCategories";
import {
  CategoriesProductType,
  CategoriesState,
} from "../../types/CategoriesTypes";

const initialState: CategoriesState = {
  categories: null,
  loading: false,
  error: null,
};

const categoiesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload as CategoriesProductType[] | null;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Fetch failed";
      });
  },
});

export default categoiesSlice.reducer;
