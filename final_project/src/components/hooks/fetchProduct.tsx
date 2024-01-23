import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Products2 } from "../types/ProductCardType";

// const fetchProduct = createAsyncThunk(
//   "fakeStore/fetchProduct",
//   async (prodId: number | string) => {
//     try {
//       const response: AxiosResponse<{ product: Products[] }> = await axios.get(
//         `https://dummyjson.com/product/${prodId}`,
//       );
//       return response.data;
//     } catch (e) {
//       console.log(e);
//       throw new Error("Fetch failed");
//     }
//   },
// );
const fetchProduct = createAsyncThunk(
  "soloCard/fetchProduct",
  async (prodId: number | string) => {
    try {
      const response: AxiosResponse<{ product: Products2[] }> = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${prodId}`,
      );
      return response.data;
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
