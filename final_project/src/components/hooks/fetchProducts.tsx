import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ProductType } from "../types/ProductCardType";

// <Products[], void, { rejectValue: string }>

const fetchProducts = createAsyncThunk("fakeStore/fetchProducts", async () => {
  try {
    const response: AxiosResponse<{ products: ProductType[] }> =
      await axios.get("https://api.escuelajs.co/api/v1/products");

    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error("Fetch failed");
  }
});

export { fetchProducts };
