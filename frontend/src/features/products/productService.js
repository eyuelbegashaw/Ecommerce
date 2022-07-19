import axios from "axios";

//get all product
const getProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data;
};

//get one product
const getProduct = async id => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  getProduct,
};
export default productService;
