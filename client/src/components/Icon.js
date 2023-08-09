import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import CATEGORY from "../utils/CategoryData";

export default function Icon({ category }) {
  const getIcon = () => {
    switch (category) {
      case CATEGORY.FOOD:
        return (
          <Avatar sx={{ bgcolor: "#F44336", width: 40, height: 40 }}>
            <RestaurantIcon />
          </Avatar>
        );
      case CATEGORY.ENTERTAINMENT:
        return (
          <Avatar sx={{ bgcolor: "#D8A012", width: 40, height: 40 }}>
            <QueueMusicIcon />
          </Avatar>
        );
      case CATEGORY.SHOPPING:
        return (
          <Avatar sx={{ bgcolor: "#EE58D6", width: 40, height: 40 }}>
            <ShoppingCartIcon />
          </Avatar>
        );
      case CATEGORY.PHOTOGRAPHY:
        return (
          <Avatar sx={{ bgcolor: "#3280F5", width: 40, height: 40 }}>
            <CameraAltIcon />
          </Avatar>
        );
      default:
        return (
          <Avatar sx={{ bgcolor: "#F44336", width: 40, height: 40 }}>
            <RestaurantIcon />
          </Avatar>
        );
    }
  };

  return getIcon();
}
