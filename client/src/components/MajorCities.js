import { TORONTO_COORDS } from "../utils/Constants";
import { NEW_YORK_COORDS } from "../utils/Constants";
import { LONDON_COORDS } from "../utils/Constants";
import { TOKYO_COORDS } from "../utils/Constants";
import { PARIS_COORDS } from "../utils/Constants";

export default function MajorCities({ setCoordinates }) {
  const handleCityClick = (coords) => {
    setCoordinates(coords);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-row w-6/12 pt-7 justify-between">
        <button
          className="text-white opacity-80 hover:opacity-100 transition bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-semibold rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => handleCityClick(TORONTO_COORDS)}
        >
          📍 Toronto
        </button>
        <button
          className="text-white opacity-80 hover:opacity-100 transition bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 font-semibold rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => handleCityClick(NEW_YORK_COORDS)}
        >
          📍 New York
        </button>
        <button
          className="text-white opacity-80 hover:opacity-100 transition bg-gradient-to-r from-red-500 via-red-600 to-red-700 font-semibold rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => handleCityClick(LONDON_COORDS)}
        >
          📍 London
        </button>
        <button
          className="text-white opacity-80 hover:opacity-100 transition bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 font-semibold rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => handleCityClick(TOKYO_COORDS)}
        >
          📍 Tokyo
        </button>
        <button
          className="text-white opacity-80 hover:opacity-100 transition bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-500 font-semibold rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => handleCityClick(PARIS_COORDS)}
        >
          📍 Paris
        </button>
      </div>
    </div>
  );
}
