import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  text: string | null;
  openAlert: boolean;
};

const initialState: InitialState = {
  text: null,
  openAlert: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    showAlert: (state, action: PayloadAction<boolean>) => {
      state.openAlert = action.payload;
    },
  },
});

export const { setAlertText, showAlert } = alertSlice.actions;

export default alertSlice.reducer;
