import axios from "axios";

const getCategories = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/category/`, config);
  return response.data;
};

const updateCategory = async (updatedData, token) => {
  const {id, updatedCategory} = updatedData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.put(`/api/category/${id}`, updatedCategory, config);
  return data;
};

const deleteCategory = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.delete(`/api/category/${id}`, config);
  return data;
};

const createCategory = async (newCategory, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.post("/api/category/", newCategory, config);
  return data;
};

const categoryService = {
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
};
export default categoryService;
