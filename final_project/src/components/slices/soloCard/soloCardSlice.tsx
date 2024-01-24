import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

type CategotyType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategotyType;
  images: string[];
};

type InitialStateType = {
  product: ProductType | null;
  loading: boolean;
  error: string | {} | null;
};

const initialState: InitialStateType = {
  product: null,
  loading: false,
  error: null,
};

const fetchProduct = createAsyncThunk(
  "soloCard/fetchProduct",
  async (prodId: number) => {
    try {
      const url = `https://api.escuelajs.co/api/v1/products/${prodId}`;
      const response: AxiosResponse<ProductType> = await axios.get(url);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(`Axios error: ${e}`);
        throw new Error("Fetch failed");
      } else {
        console.log(`Unknown error: ${e}`);
      }
    }
  },
);

const soloCardSlice = createSlice({
  name: "soloCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProduct.rejected,
        (state, action: PayloadAction<unknown, string>) => {
          state.loading = false;
          state.error = action.payload ?? "fetch failed";
        },
      )
      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<ProductType | undefined>) => {
          state.loading = false;
          state.product = action.payload ?? null;
          state.error = null;
        },
      );
  },
});

export default soloCardSlice.reducer;
