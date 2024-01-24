import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export type CategoryProductType = {
  name: string;
  id: number | string;
  image: string;
};

export const fetchCategory = createAsyncThunk(
  "productCategory/fetchCategory",
  async (categoryId: string) => {
    try {
      const response: AxiosResponse<{ data: CategoryProductType } | null> =
        await axios.get(
          `https://api.escuelajs.co/api/v1/categories/${categoryId}`,
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
