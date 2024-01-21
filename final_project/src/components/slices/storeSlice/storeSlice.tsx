// storeSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../hooks/fetchProducts";

interface Product {
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  title: string;
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

// const fetchItems = createAsyncThunk<Product[], void, { rejectValue: string }>(
//   "fakeStore/fetchProducts",
//   async () => {
//     try {
//       const response: AxiosResponse<{ products: Product[] }> = await axios.get(
//         "https://dummyjson.com/products",
//       );

//       return response.data.products; // Return only the data from the Axios response
//     } catch (e) {
//       console.log(e);
//       throw new Error("Fetch failed"); // Update the error message if needed
//     }
//   },
// );

const storeSlice = createSlice({
  name: "fakeStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = "Fetch failed"; // Set a default error message
        }
        state.loading = false;
      });
  },
});

export default storeSlice.reducer;
