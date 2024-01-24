import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ProductType } from "../types/ProductCardType";

// <Products[], void, { rejectValue: string }>

const fetchAmountOfProducts = createAsyncThunk(
  "amountOfProducts/fetchAmountOfProducts",
  async () => {
    try {
      const response: AxiosResponse<ProductType[]> = await axios.get(
        "https://api.escuelajs.co/api/v1/products?offset=4&limit=20",
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
  },
);

export { fetchAmountOfProducts };
