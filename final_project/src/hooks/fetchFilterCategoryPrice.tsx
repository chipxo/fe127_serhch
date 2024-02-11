import { ProductType } from "@/types/types.tsx";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface FetchFilterCategoryPayload {
  categoryId: string | null | undefined;
  lowestPr: number;
  highestPr: number;
}

export const fetchFilterCategoryPrice = createAsyncThunk<
  ProductType[],
  FetchFilterCategoryPayload
>(
  "categoryFilteredProducts/fetchFilterCategoryPrice",
  async ({ categoryId, lowestPr, highestPr }: FetchFilterCategoryPayload) => {
    try {
      const url = `https://api.escuelajs.co/api/v1/products/?price_min=${lowestPr}&price_max=${highestPr}&categoryId=${categoryId}`;

      const { data }: AxiosResponse<ProductType[]> = await axios.get(url);
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(`Axios error: ${e}`);
        throw e;
      } else {
        console.log(e);
        throw new Error("Fetch failed");
      }
    }
  },
);
