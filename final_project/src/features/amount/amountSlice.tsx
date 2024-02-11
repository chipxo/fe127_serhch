import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  amount: number;
};

const initialState: initialStateType = {
  amount: 0,
};

const amountSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },

    addAmount: (state) => {
      state.amount++;
    },
    decreaseAmount: (state) => {
      state.amount--;
    },
  },
});

export const { setAmount, addAmount, decreaseAmount } = amountSlice.actions;

export default amountSlice.reducer;
