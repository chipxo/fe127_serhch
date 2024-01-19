// storeSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface FakeStoreState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: FakeStoreState = {
  products: [],
  loading: false,
  error: null,
};

const fetchItems = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "fakeStore/fetchProducts",
  async () => {
    try {
      const response: AxiosResponse<Product[]> = await axios.get(
        "https://fakestoreapi.com/products",
      );
      return response.data; // Return only the data from the Axios response
    } catch (e) {
      console.error(e);
      throw new Error("Fetch failed"); // Update the error message if needed
    }
  },
);

const storeSlice = createSlice({
  name: "fakeStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = "Fetch failed"; // Set a default error message
        }
        state.loading = false;
      });
  },
});

export { fetchItems };

export default storeSlice.reducer;
