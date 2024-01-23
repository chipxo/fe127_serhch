import { createSlice } from "@reduxjs/toolkit";

const DARK = "dracula";
const LIGHT = "wireframe";

const initialState: { theme: string } = { theme: DARK };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === DARK ? LIGHT : DARK;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
