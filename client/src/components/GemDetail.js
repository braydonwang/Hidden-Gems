import React from "react";
import Rating from "./Rating/Rating";

import { Carousel } from "react-responsive-carousel";
import Avatar from "@mui/material/Avatar";
import {
  ArrowUturnLeftIcon,
  ArrowTopRightOnSquareIcon,
  HandThumbUpIcon,
} from "@heroicons/react/20/solid";
import RestaurantIcon from "@mui/icons-material/Restaurant";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { red, blue } from "@mui/material/colors";

const imgData = [
  "https://images.unsplash.com/photo-1540206395-68808572332f",
  "https://images.unsplash.com/photo-1540206395-68808572332f",
  "https://images.unsplash.com/photo-1540206395-68808572332f",
];

export default function GemDetail() {
  const handleBackButton = () => {};

  const handleLikeButton = () => {};

  return (
    <div className="flex flex-col w-4/12 px-6 border border-t-gray-300 pt-5 overflow-y-auto">
      <div className="flex flex-row items-center justify-between">
        <button onClick={handleBackButton}>
          <ArrowUturnLeftIcon
            className="h-6 w-6 text-gray-500 hover:text-gray-800"
            aria-hidden="true"
          />
        </button>
        <div className="flex flex-row items-center ">
          <p className="text-lg text-blue-500 font-semibold pr-2">15</p>
          <button onClick={handleLikeButton}>
            <Avatar
              sx={{
                bgcolor: blue[500],
                width: 35,
                height: 35,
                ":hover": { backgroundColor: blue[700] },
              }}
            >
              <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
            </Avatar>
          </button>
        </div>
      </div>
      <div className="flex flex-row pt-5 items-center">
        <Avatar sx={{ bgcolor: red[500], width: 40, height: 40 }}>
          <RestaurantIcon />
        </Avatar>
        <p className="text-4xl font-medium tracking-tight pl-3">
          Pizzeria Badiali
        </p>
      </div>
      <p className="text-lg font-semibold italic pt-2 text-gray-600">
        181 Dovercourt Rd, Toronto, ON M6J 3C6
      </p>
      <p className="text-sm font-medium pt-1 pb-5 text-gray-800">
        Posted by: BrayBray123
      </p>
      <Carousel showArrows={true} autoPlay interval={5000} infiniteLoop>
        {imgData.map((img) => (
          <div className="h-72">
            <img src={img} alt="Gem" />
          </div>
        ))}
      </Carousel>
      <Rating rating={4.95} />
      <a
        className="flex flex-row items-center pt-2 w-fit text-blue-700 hover:underline hover:underline-offset-2"
        href="https://www.google.com/maps?q=Pizzeria%20Badiali,%20Dovercourt%20Road,%20Toronto,%20ON"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="pr-1">Google Maps Link</p>
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </a>
      <p className="text-base font-medium pt-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        porttitor eros gravida dapibus rhoncus. Fusce eget enim scelerisque,
        lacinia libero sit amet, rhoncus mi. Integer volutpat massa eget dui
        scelerisque, porta elementum ipsum consequat. Sed sed efficitur dui.
        Aenean iaculis placerat sem vitae vehicula. Ut accumsan nibh facilisis
        augue lobortis consequat.
      </p>
    </div>
  );
}
