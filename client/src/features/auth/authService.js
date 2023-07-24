import axios from "axios";

const login = async (user) => {
  try {
    const res = await axios.post("login", user.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    window.dispatchEvent(new Event("storage"));
    user.navigate("/");
    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err };
  }
};

const register = async (user) => {
  try {
    const res = await axios.post("register", user.data);
    localStorage.setItem("user", JSON.stringify(res.data));
    window.dispatchEvent(new Event("storage"));
    user.navigate("/");
    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err };
  }
};

const authService = {
  login,
  register,
};

export default authService;
