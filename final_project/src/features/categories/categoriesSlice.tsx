import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "@/hooks/fetchCategories.tsx";
import { CategoriesType } from "@/types/types.tsx";

type InitialStateType = {
  categories: CategoriesType[] | null;
  loading: boolean;
  error: string | null | {};
};

const initialState: InitialStateType = {
  categories: null,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<CategoriesType[] | undefined>) => {
          state.loading = false;
          state.categories = action.payload as CategoriesType[];
          state.error = null;
        },
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<unknown, string>) => {
          state.loading = false;
          state.error = action.payload ?? "fetch failed";
        },
      );
  },
});

export default categoriesSlice.reducer;
