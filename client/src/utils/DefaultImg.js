import CATEGORY from "../utils/CategoryData";
import {
  defaultEntertainmentImg,
  defaultPhotographyImg,
  defaultRestaurantImg,
  defaultShoppingImg,
} from "../utils/Constants";

const getDefaultImg = (category) => {
  switch (category) {
    case CATEGORY.FOOD:
      return defaultRestaurantImg;
    case CATEGORY.ENTERTAINMENT:
      return defaultEntertainmentImg;
    case CATEGORY.SHOPPING:
      return defaultShoppingImg;
    case CATEGORY.PHOTOGRAPHY:
      return defaultPhotographyImg;
    default:
      return defaultRestaurantImg;
  }
};

export default getDefaultImg;
