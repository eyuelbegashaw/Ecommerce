import axios from "axios";

//GET - return all users for admin
const getAllUsers = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const {data} = await axios.get("/api/user", config);
  return data;
};

//POST - login
const login = async userData => {
  const {data} = await axios.post("/api/user/login", userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

//POST - register
const register = async userData => {
  const {data} = await axios.post("/api/user/register", userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

//POST - register
const updateUser = async (updatedUser, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.put("/api/user/profile", updatedUser, config);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

//PUT - update user  - admin
const updateUsers = async (updatedData, token) => {
  const {id, updatedUser} = updatedData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.put(`/api/user/${id}`, updatedUser, config);
  return data;
};

//DELETE - delete user
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.delete(`/api/user/${id}`, config);
  return data;
};

//logout
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  register,
  updateUser,
  logout,
  getAllUsers,
  deleteUser,
  updateUsers,
};

export default authService;
