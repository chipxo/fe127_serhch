import axios from "axios";

const fetchProduct = async (prodId: number | string) => {
  try {
    const response = await axios.get(`https://dummyjson.com/product/${prodId}`);

    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error("Fetch failed");
  }
};

export default fetchProduct;
