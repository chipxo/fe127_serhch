import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ProductType } from "../types/types.tsx";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const url = "https://api.escuelajs.co/api/v1/products";

    const { data }: AxiosResponse<ProductType[]> = await axios.get(url);
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(`Axios error: ${e}`);
    } else {
      console.log(e);
      throw new Error("Fetch failed");
    }
  }
});

export { fetchProducts };
