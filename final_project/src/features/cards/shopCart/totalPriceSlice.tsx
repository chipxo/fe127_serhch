import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TotalPriceState {
  counts: Record<number, number>;
  totalPrice: number;
}

const initialState: TotalPriceState = {
  counts: {},
  totalPrice: 0,
};

const totalPriceSlice = createSlice({
  name: "totalPrice",
  initialState,
  reducers: {
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    incTotalPrice: (
      state,
      action: PayloadAction<{ id: number; price: number }>,
    ) => {
      const { id, price } = action.payload;
      state.totalPrice += price;
      state.counts[id] = (state.counts[id] || 1) + 1;
    },
    decTotalPrice: (
      state,
      action: PayloadAction<{ id: number; price: number }>,
    ) => {
      const { id, price } = action.payload;
      state.totalPrice -= price;
      state.counts[id] = (state.counts[id] || 2) - 1;
    },
  },
});

export const { setTotalPrice, incTotalPrice, decTotalPrice } =
  totalPriceSlice.actions;
export default totalPriceSlice.reducer;
