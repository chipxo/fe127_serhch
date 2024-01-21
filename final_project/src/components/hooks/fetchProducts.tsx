import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Products } from "../types/ProductCardType";

const fetchProducts = createAsyncThunk<
  Products[],
  void,
  { rejectValue: string }
>("fakeStore/fetchProducts", async () => {
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

const fetchProductsNoRedux = async () => {
  try {
    const url = "https://dummyjson.com/products";
    const response = await axios.get("https://dummyjson.com/products");

    return response.data.products;
  } catch (e) {
    console.error(e);
    throw new Error("Fetch failed");
  }
};

export { fetchProducts, fetchProductsNoRedux };
