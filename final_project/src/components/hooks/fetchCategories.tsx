import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export type CategoryType = {
  id: number;
  name: string;
  image: string;
};
export type Categories = [categories: CategoryType[]];

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response: AxiosResponse<{ data: CategoryType[] } | null> =
        await axios.get(`https://api.escuelajs.co/api/v1/categories`);

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
