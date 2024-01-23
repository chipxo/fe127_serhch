import { createSlice } from "@reduxjs/toolkit";

const initialState: { theme: string } = { theme: "dracula" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === "dracula" ? "garden" : "dracula";
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
