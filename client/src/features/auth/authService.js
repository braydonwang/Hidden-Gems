import axios from "axios";

const login = async (userData) => {
  const res = await axios.post("login", userData);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const authService = {
  login,
};

export default authService;
