import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ProductType } from "../types/ProductCardType";

const fetchProduct = createAsyncThunk(
  "cards/fetchProduct",
  async (prodId: number | string) => {
    try {
      const response: AxiosResponse<{ data: ProductType }> = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${prodId}`,
      );
      // console.log(response.data);

      return response.data; // Directly return the response data
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
