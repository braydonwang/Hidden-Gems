import axios from "axios";

const getAllGems = async () => {
  try {
    const res = await axios.get("gems");
    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err };
  }
};

const createGem = async (gemData) => {
  try {
    const res = await axios.post("gems", gemData.data);
    gemData.setCoordinates(gemData.coords);
    gemData.navigate("/");
    return { data: res.data, err: null };
  } catch (err) {
    return { data: null, err };
  }
};

const gemService = {
  getAllGems,
  createGem,
};

export default gemService;
