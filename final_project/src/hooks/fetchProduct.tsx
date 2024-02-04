import { ProductType } from "@/types/types.tsx";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (prodId: number) => {
    try {
      const url = `https://api.escuelajs.co/api/v1/products/${prodId}`;

      const { data }: AxiosResponse<ProductType> = await axios.get(url);
      return data;
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

export { fetchProduct };
