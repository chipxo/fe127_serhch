import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  inputValue: string;
};

const initialState: InitialState = {
  inputValue: "",
};

const searchSlice = createSlice({
  name: "searchProducts",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { setInputValue } = searchSlice.actions;

export default searchSlice.reducer;
