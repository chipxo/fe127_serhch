import { ProductType } from "@/types/types.tsx";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const fetchCategoryProducts = createAsyncThunk(
  "categoryProducts/fetchCategory",
  async (categoryId: string) => {
    try {
      const url = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`;

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
  },
);
