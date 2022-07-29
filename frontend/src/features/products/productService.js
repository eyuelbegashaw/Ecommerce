import axios from "axios";

//GET - fetch all product
const getProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

//GET - fetch one product
const getProduct = async id => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  getProduct,
};
export default productService;
