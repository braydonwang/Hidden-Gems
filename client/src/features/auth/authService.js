import axios from "axios";

const login = async (user) => {
  const res = await axios.post("login", user.data);
  localStorage.setItem("user", JSON.stringify(res.data));
  window.dispatchEvent(new Event("storage"));
  user.navigate("/");
  return res.data;
};

const register = async (user) => {
  const res = await axios.post("register", user.data);
  localStorage.setItem("user", JSON.stringify(res.data));
  window.dispatchEvent(new Event("storage"));
  user.navigate("/");
  return res.data;
};

const authService = {
  login,
  register,
};

export default authService;
