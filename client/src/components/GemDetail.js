import React from "react";
import Rating from "./Rating/Rating";

import { Carousel } from "react-responsive-carousel";
import Avatar from "@mui/material/Avatar";
import {
  ArrowUturnLeftIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import CATEGORY from "../utils/CategoryData";

export default function GemDetail({ place, setPinClicked }) {
  const getIcon = () => {
    switch (place.category) {
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

  const handleBackButton = () => {
    setPinClicked(-1);
  };

  return (
    <div className="flex flex-col w-4/12 px-6 border border-t-gray-300 pt-5 overflow-y-auto">
      <div className="flex flex-row items-center justify-between">
        <button onClick={handleBackButton}>
          <ArrowUturnLeftIcon
            className="h-6 w-6 text-gray-500 hover:text-gray-800"
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="flex flex-row pt-5 items-center">
        {getIcon()}
        <p className="text-4xl font-medium tracking-tight pl-3">{place.name}</p>
      </div>
      <p className="text-lg font-semibold italic pt-2 text-gray-600 leading-snug">
        {place.location}
      </p>
      <p className="text-sm font-medium pt-2 pb-5 text-gray-800">
        Posted by: {place.username}
      </p>
      <Carousel showArrows={true} autoPlay interval={5000} infiniteLoop>
        {place.images.map((img) => (
          <div>
            <img className="object-contain max-h-56" src={img} alt="Gem" />
          </div>
        ))}
      </Carousel>
      <Rating rating={place.rating} numRatings={place.numOfRatings} />
      <a
        className="flex flex-row items-center pt-2 w-fit text-blue-700 hover:underline hover:underline-offset-2"
        href={`https://www.google.com/maps?q=${place.name} ${place.location}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="pr-1">Google Maps Link</p>
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </a>
      <p className="text-base font-medium pt-5 pb-10">{place.description}</p>
    </div>
  );
}
