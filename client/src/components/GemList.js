import React from "react";
import Icon from "./Icon";
import Rating from "./Rating/Rating";

export default function GemList({ places, setPlace, setPinHover }) {
  return (
    <div className="flex flex-col w-4/12 border border-t-gray-300 overflow-y-auto">
      {places?.map((gem, ind) => (
        <div
          className={`flex flex-row items-center hover:opacity-70 cursor-pointer hover:shadow-md transition h-32 ${
            ind % 2 === 0 ? "bg-slate-100" : "bg-white"
          }`}
          onMouseEnter={() => setPinHover(gem.id)}
          onMouseLeave={() => setPinHover(-1)}
          onClick={() => setPlace(gem)}
        >
          <div className="mr-5">
            <img
              className="h-32 w-48 object-cover"
              src={gem.images[0]}
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
      ))}
    </div>
  );
}
