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

  console.log(pinHover);

  return (
    <img
      src={getPin()}
      style={{ position: "absolute", width: "2.25rem", height: "4rem", left:  }}
      className={
        (pinHover === id ? "h-20" : "h-16") + " w-9 transition-all absolute"
      }
      alt="Restaurant"
    />
  );
}
