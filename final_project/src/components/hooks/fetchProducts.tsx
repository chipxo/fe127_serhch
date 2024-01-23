import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Products } from "../types/ProductCardType";

// <Products[], void, { rejectValue: string }>

const fetchProducts = createAsyncThunk("fakeStore/fetchProducts", async () => {
  try {
    const response: AxiosResponse<{ products: Products[] }> = await axios.get(
      "https://dummyjson.com/products",
    );

    return response.data.products;
  } catch (e) {
    console.log(e);
    throw new Error("Fetch failed");
  }
});

export { fetchProducts };
