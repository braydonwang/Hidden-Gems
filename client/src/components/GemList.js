import React from "react";
import Icon from "./Icon";
import Rating from "./Rating/Rating";

import listLogo from "../images/listLogo.png";
import getDefaultImg from "../utils/DefaultImg";

export default function GemList({ places, setPlace, pinHover, setPinHover }) {
  return (
    <div className="flex flex-col w-4/12 border border-t-gray-300 overflow-y-auto">
      {places && places.length > 0 ? (
        places.map((gem, ind) => (
          <div
            key={ind}
            className={`flex flex-row items-center hover:opacity-70 cursor-pointer hover:shadow-md transition h-32 ${
              pinHover === gem.id && "opacity-70 shadow-md"
            } ${ind % 2 === 0 ? "bg-slate-100" : "bg-white"}`}
            onMouseEnter={() => setPinHover(gem.id)}
            onMouseLeave={() => setPinHover(-1)}
            onClick={() => setPlace(gem)}
          >
            <div className="mr-5">
              <img
                className="h-32 w-48 object-cover"
                src={
                  gem.images && gem.images.length > 0
                    ? gem.images[0]
                    : getDefaultImg(gem.category)
                }
                alt="Gem"
              />
            </div>
            <Icon category={gem.category} />
            <div className="flex flex-col ml-4 w-9/12">
              <p className="text-xl font-semibold line-clamp-1">{gem.name}</p>
              <p className="text-sm font-medium italic line-clamp-1 mb-1">
                {gem.location}
              </p>
              <Rating
                rating={gem.rating}
                numRatings={gem.numRatings}
                showText={false}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center my-auto px-6">
          <img className="h-2/5" src={listLogo} alt="Logo" />
          <p className="text-lg text-center font-bold mt-5 text-gray-600">
            Sorry, we couldn't find any hidden gems here!
          </p>
          <p className="italic text-center font-semibold text-gray-500 mt-2">
            Please try a different location
          </p>
        </div>
      )}
    </div>
  );
}
