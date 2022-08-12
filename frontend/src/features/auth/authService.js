import axios from "axios";

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

//logout
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  register,
  updateUser,
  logout,
};

export default authService;
