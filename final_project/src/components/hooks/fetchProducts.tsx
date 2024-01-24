import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ProductType } from "../types/ProductCardType";

// <Products[], void, { rejectValue: string }>

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response: AxiosResponse<ProductType[]> = await axios.get(
      "https://api.escuelajs.co/api/v1/products",
    );
    // console.log(response.data);

    return response.data;
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
