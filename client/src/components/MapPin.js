import restaurantPin from "../images/restaurant-pin.png";
import entertainmentPin from "../images/entertainment-pin.png";
import shoppingPin from "../images/shopping-pin.png";
import photographyPin from "../images/photography-pin.png";
import Stars from "./Rating/Stars";

import CATEGORY from "../utils/CategoryData";

export default function MapPin({ id, place, pinHover }) {
  const { category, name, location, rating } = place;
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
    <>
      <div
        id={"tooltip-animation-" + id}
        role="tooltip"
        className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 w-40"
      >
        <p className="font-bold leading-tight line-clamp-2">{name}</p>
        <p className="text-xs line-clamp-4">{location}</p>
        <Stars rating={rating} />
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <img
        src={getPin()}
        className={
          "absolute " +
          (pinHover === id
            ? "-left-6 -top-12 h-20 w-12"
            : "-left-5 -top-8 h-16 w-10") +
          " transition-all cursor-pointer"
        }
        data-tooltip-target={"tooltip-animation-" + id}
        alt="Map Pin"
      />
    </>
  );
}
