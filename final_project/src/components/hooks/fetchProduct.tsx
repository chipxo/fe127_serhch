import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Product } from "../types/ProductCardType";

const fetchProduct = createAsyncThunk(
  "fakeStore/fetchProduct",
  async (prodId: number | string) => {
    try {
      const response: AxiosResponse<{ product: Product[] }> = await axios.get(
        `https://dummyjson.com/product/${prodId}`,
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw new Error("Fetch failed");
    }
  },
);

export { fetchProduct };
