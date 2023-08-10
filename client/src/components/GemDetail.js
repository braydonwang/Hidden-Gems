import React from "react";
import Rating from "./Rating/Rating";

import { Carousel } from "react-responsive-carousel";
import Icon from "./Icon";
import {
  ArrowUturnLeftIcon,
  ArrowTopRightOnSquareIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import getDefaultImg from "../utils/DefaultImg";

export default function GemDetail({ user, place, setPlace }) {
  const userId = JSON.parse(user)?.userId || -1;

  const isDisabled = () => {
    return userId === -1 || place.userReviews.includes(userId);
  };

  const handleBackButton = () => {
    setPlace(null);
  };

  const handleEditButton = () => {};

  const handleDeleteButton = () => {};

  console.log(isDisabled());

  return (
    <div className="flex flex-col w-4/12 px-6 border border-t-gray-300 pt-5 overflow-y-auto">
      <div className="flex flex-row items-center justify-between">
        <button onClick={handleBackButton}>
          <ArrowUturnLeftIcon
            className="h-6 w-6 text-gray-500 hover:text-gray-800"
            aria-hidden="true"
          />
        </button>
        {userId === place.userId && (
          <div className="flex flex-row gap-3 justify-center">
            <button onClick={handleEditButton}>
              <PencilSquareIcon
                className="h-7 w-7 text-blue-600 hover:text-blue-800"
                aria-hidden="true"
              />
            </button>
            <button onClick={handleDeleteButton}>
              <TrashIcon
                className="h-7 w-7 text-red-600 hover:text-red-800"
                aria-hidden="true"
              />
            </button>
          </div>
        )}
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
        {place.images && place.images.length > 0 ? (
          place.images.map((img) => (
            <div>
              <img className="object-cover max-h-56" src={img} alt="Gem" />
            </div>
          ))
        ) : (
          <div>
            <img
              className="object-cover max-h-56"
              src={getDefaultImg(place.category)}
              alt="Gem"
            />
          </div>
        )}
      </Carousel>
      <Rating rating={place.rating} numRatings={place.numOfRatings} />
      <a
        className="flex flex-row items-center pt-3 w-fit text-blue-700"
        href={`https://www.google.com/maps?q=${place.name} ${place.location}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p style={{ textDecoration: "none" }}>📍</p>
        <p className="pr-1 hover:underline hover:underline-offset-2">
          Google Maps Link
        </p>
        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
      </a>
      <p className="text-base font-medium pt-4 pb-7">{place.description}</p>
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className={`flex flex-row justify-center gap-2 w-40 py-2 mb-10 opacity-90 rounded-3xl bg-yellow-300 border-2 border-black font-semibold text-sm transition ${
          isDisabled() ? "opacity-50" : "hover:bg-yellow-200"
        }`}
        disabled={isDisabled()}
      >
        ⭐<p className="italic">Add a review!</p>
      </button>
    </div>
  );
}
