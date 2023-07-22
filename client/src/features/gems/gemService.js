import axios from "axios";

const getAllGems = async () => {
  const res = await axios.get("gems");
  return res.data;
};

const createGem = async (gemData) => {
  // TODO: error handling
  const res = await axios.post("gems", gemData);
  return res.data;
};

const gemService = {
  getAllGems,
  createGem,
};

export default gemService;
