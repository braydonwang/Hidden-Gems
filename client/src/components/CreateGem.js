import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import MapPin from "./MapPin";
import Input from "./Input";
import Dropdown from "./Search/Dropdown";
import RatingInput from "./Rating/RatingInput";
import Searchbar from "./Search/Searchbar";
import Alert from "./Alert";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

import gemService from "../features/gems/gemService";
import CATEGORY from "../utils/CategoryData";

export default function CreateGem({ user, setCoordinates }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [pinHover, setPinHover] = useState(-1);
  const [place, setPlace] = useState({
    category: CATEGORY.FOOD,
    name: "",
    location: "",
    rating: 1,
    description: "",
  });
  const userJSON = JSON.parse(user);

  const onLoad = (autoC) => setSearchQuery(autoC);

  const onPlaceChanged = () => {
    const lat = searchQuery?.getPlace()?.geometry?.location?.lat() ?? 0;
    const lng = searchQuery?.getPlace()?.geometry?.location?.lng() ?? 0;
    setCoords({ lat, lng });
    setPlace({
      ...place,
      name: searchQuery?.getPlace()?.name,
      location: searchQuery?.getPlace()?.formatted_address,
    });
  };

  const handleChildMouseEnter = (_, childProps) => {
    setPinHover(-2);
  };

  const handleChildMouseLeave = (_, childProps) => {
    setPinHover(-1);
  };

  const handleAddImage = () => {};

  const handleCreateGem = async () => {
    const res = await gemService.createGem({
      data: {
        username: userJSON.username,
        userId: userJSON.userId,
        name: place.name,
        location: place.location,
        description: place.description,
        category: place.category,
        latitude: String(coords.lat),
        longitude: String(coords.lng),
        rating: place.rating,
      },
      setCoordinates,
      coords,
      navigate,
    });

    if (res.err) {
      setIsError(true);
      setErrorMsg(res.err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center h-full mx-auto mt-10">
      <h1 className="text-3xl font-medium mt-5 mb-7">
        <span className="italic">Share your hidden gem with the world </span>
        🌎
      </h1>
      <Searchbar
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        handleSearch={() => {}}
        shouldShowButton={false}
      />
      <div className="w-10/12 h-60 mt-5 mb-5 border-2 border-yellow-300">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
          yesIWantToUseGoogleMapApiInternals
          defautlCenter={coords}
          center={coords}
          defaultZoom={14}
          options={{
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
          }}
          onChildMouseEnter={handleChildMouseEnter}
          onChildMouseLeave={handleChildMouseLeave}
        >
          <MapPin
            id={-2}
            lat={coords.lat}
            lng={coords.lng}
            place={{
              ...place,
              name: place.name === "" ? "Name" : place.name,
              location: place.location === "" ? "Location" : place.location,
            }}
            pinHover={pinHover}
          />
        </GoogleMapReact>
      </div>
      <div className="flex flex-row justify-between gap-6 w-full">
        <Input
          htmlFor="name"
          name="name"
          type="text"
          autoC="name"
          label="Name"
          width="w-1/2"
          value={place.name}
          handleChange={(e) => setPlace({ ...place, name: e.target.value })}
        />
        <Input
          htmlFor="location"
          name="location"
          type="text"
          autoC="location"
          label="Location"
          isDisabled
          value={place.location}
        />
      </div>
      <div className="flex flex-row justify-between gap-6 w-full mt-5">
        <div>
          <label
            htmlFor="category"
            className="block text-base font-medium leading-6 text-gray-900 mb-3"
          >
            Category
          </label>
          <Dropdown
            currentCategory={place.category}
            setCurrentCategory={(category) =>
              setPlace({ ...place, category: category })
            }
            isCreating
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="rating"
            className="block text-base font-medium leading-6 text-gray-900 mb-3"
          >
            Rating
          </label>
          <RatingInput
            rating={place.rating}
            setRating={(rating) => setPlace({ ...place, rating: rating })}
          />
        </div>
      </div>
      <p className="text-base italic text-gray-500 mt-7 mb-2">
        Add some photos...
      </p>
      <PlusCircleIcon
        className="w-20 h-20 text-amber-400 hover:text-amber-500 cursor-pointer transition-all"
        onClick={handleAddImage}
      />
      <div className="w-full">
        <label
          htmlFor="description"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Description
        </label>
      </div>
      <div className="mt-2 w-full">
        <textarea
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6 resize-none"
          rows={3}
          onChange={(e) => setPlace({ ...place, description: e.target.value })}
        >
          {place.description}
        </textarea>
      </div>
      <button
        className="rounded-full bg-amber-400 px-6 py-2 font-semibold mt-5 text-lg hover:px-8 transition-all"
        onClick={handleCreateGem}
      >
        Share it!
      </button>
      {isError && (
        <Alert
          title={"Error!"}
          message={errorMsg}
          handleClose={() => setIsError(false)}
        />
      )}
    </div>
  );
}
