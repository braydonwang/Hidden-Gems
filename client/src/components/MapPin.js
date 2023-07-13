import restaurantPin from "../images/restaurant-pin.png";
import entertainmentPin from "../images/entertainment-pin.png";
import shoppingPin from "../images/shopping-pin.png";
import photographyPin from "../images/photography-pin.png";

import CATEGORY from "../utils/CategoryData";

export default function MapPin({ id, category, pinHover }) {
  const getPin = () => {
    switch (category) {
      case CATEGORY.FOOD:
        return restaurantPin;
      case CATEGORY.ENTERTAINMENT:
        return entertainmentPin;
      case CATEGORY.SHOPPING:
        return shoppingPin;
      case CATEGORY.PHOTOGRAPHY:
        return photographyPin;
      default:
        return restaurantPin;
    }
  };

  return (
    <img
      src={getPin()}
      className={
        "absolute " +
        (pinHover === id
          ? "-left-6 -top-10 h-20 w-12"
          : "-left-5 -top-8 h-16 w-10") +
        " transition-all"
      }
      alt="Restaurant"
    />
  );
}
