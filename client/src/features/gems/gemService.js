import axios from "axios";

const getAllGems = async () => {
  const res = await axios.get("gems");
  return res.data;
};

const gemService = {
  getAllGems,
};

export default gemService;
