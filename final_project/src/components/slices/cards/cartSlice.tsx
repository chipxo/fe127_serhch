import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  items: any[];
};

const initialState: initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
