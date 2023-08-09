import React from "react";
import Rating from "./Rating/Rating";

import { Carousel } from "react-responsive-carousel";
import {
  ArrowUturnLeftIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from "./Icon";

export default function GemDetail({ place, setPlace }) {
  const handleBackButton = () => {
    setPlace(null);
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
        <Icon category={place.category} />
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
            <img className="object-cover max-h-56" src={img} alt="Gem" />
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
        <p style={{ textDecoration: "none" }}>📍</p>
        <p className="pr-1">Google Maps Link</p>
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </a>
      <p className="text-base font-medium pt-5 pb-10">{place.description}</p>
    </div>
  );
}
