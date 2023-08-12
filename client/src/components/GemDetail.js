import { useState } from "react";
import Rating from "./Rating/Rating";

import { Carousel } from "react-responsive-carousel";
import Icon from "./Icon";
import RatingInput from "./Rating/RatingInput";
import { Modal } from "@mui/material";
import {
  ArrowUturnLeftIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import gemService from "../features/gems/gemService";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import getDefaultImg from "../utils/DefaultImg";

export default function GemDetail({ user, place, setPlace, setAllPlaces }) {
  const userJSON = JSON.parse(user);
  const userId = userJSON?.userId || -1;
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [rating, setRating] = useState(0);

  const isDisabled = () => {
    return userId === -1 || place.userReviews.includes(userId);
  };

  const handleBackButton = () => {
    setPlace(null);
  };

  const handleDeleteButton = () => {
    setOpen(true);
    setIsDelete(true);
  };

  const handleDeleteSubmit = async () => {
    setOpen(false);
    setPlace(null);
    setIsDelete(false);
    setAllPlaces((prevPlaces) => prevPlaces.filter((p) => p.id !== place.id));

    await gemService.deleteGem({ id: place.id });
  };

  const handleClose = () => {
    setOpen(false);
    setIsDelete(false);
    setRating(0);
  };

  const handleSubmit = async () => {
    const newRating = (
      (place.rating * place.numOfRatings + rating) /
      (place.numOfRatings + 1)
    ).toFixed(2);
    setPlace((prevPlace) => ({
      ...prevPlace,
      rating: newRating,
      numOfRatings: prevPlace.numOfRatings + 1,
    }));
    setOpen(false);

    await gemService.reviewGem({
      id: place.id,
      data: { userId, rating: parseFloat(newRating) },
      token: userJSON.token,
    });
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
        {userId === place.userId && (
          <button onClick={handleDeleteButton}>
            <TrashIcon
              className="h-7 w-7 text-red-600 hover:text-red-800"
              aria-hidden="true"
            />
          </button>
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
        className={`flex flex-row justify-center gap-2 w-40 py-2 mb-10 rounded-3xl bg-yellow-300 border-2 border-black font-semibold text-sm transition ${
          isDisabled() ? "opacity-50" : "hover:bg-yellow-200 opacity-90"
        }`}
        disabled={isDisabled()}
        onClick={() => setOpen(true)}
      >
        ⭐<p className="italic">Add a review!</p>
      </button>
      <Modal open={open} onClose={handleClose}>
        {!isDelete ? (
          <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white p-8 border-2 border-yellow-600 rounded-3xl">
            <p className="font-semibold italic text-2xl mb-5">Give a rating!</p>
            <RatingInput rating={rating} setRating={setRating} />
            <button
              className={`flex flex-row justify-center gap-2 w-32 py-2 mt-5 opacity-90 rounded-3xl bg-yellow-400 hover:bg-yellow-300 font-semibold text-sm transition`}
              onClick={handleSubmit}
            >
              <p>Submit</p>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white p-8 border-2 border-red-800 rounded-3xl">
            <p className="font-semibold italic text-2xl mb-3 text-red-600">
              Are you sure?
            </p>
            <p className="text-center">
              Are you sure you want to delete your hidden gem?
            </p>
            <div className="flex flex-row items-center gap-5">
              <button
                className={`flex flex-row justify-center gap-2 w-32 py-2 mt-5 opacity-90 rounded-3xl bg-blue-400 hover:bg-blue-300 font-semibold text-sm transition`}
                onClick={handleClose}
              >
                <p>Cancel</p>
              </button>
              <button
                className={`flex flex-row justify-center gap-2 w-32 py-2 mt-5 opacity-90 rounded-3xl bg-red-600 hover:bg-red-500 font-semibold text-sm transition`}
                onClick={handleDeleteSubmit}
              >
                <p>Delete</p>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
