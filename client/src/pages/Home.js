import { useEffect, useState } from "react";
import axios from "axios";

import Map from "../components/Map/Map";
import Dropdown from "../components/Search/Dropdown";
import Searchbar from "../components/Search/Searchbar";
import GemDetail from "../components/GemDetail";
import GemList from "../components/GemList";
import MajorCities from "../components/MajorCities";
import CATEGORY from "../utils/CategoryData";

export default function Home({ user, setUser, coordinates, setCoordinates }) {
  const [place, setPlace] = useState(null);
  const [allPlaces, setAllPlaces] = useState(null);
  const [places, setPlaces] = useState([]);
  const [curPlaces, setCurPlaces] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [pinHover, setPinHover] = useState(-1);
  const [searchQuery, setSearchQuery] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("All Categories");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    axios.get("gems").then((response) => {
      setAllPlaces(response.data);
      setPlaces(response.data);
    });
  }, []);

  useEffect(() => {
    setCurPlaces(
      places.filter(
        (place) =>
          place.latitude >= bounds.sw.lat &&
          place.latitude <= bounds.ne.lat &&
          place.longitude >= bounds.sw.lng &&
          place.longitude <= bounds.ne.lng
      )
    );
  }, [bounds, places]);

  useEffect(() => {
    if (!allPlaces) {
      return;
    }

    if (currentCategory === CATEGORY.ALL_CATEGORIES) {
      setPlaces(allPlaces);
    } else {
      setPlaces(allPlaces.filter((p) => p.category === currentCategory));
    }
  }, [currentCategory, allPlaces]);

  useEffect(() => {
    const handleStorage = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorage());
    return () => window.removeEventListener("storage", handleStorage());
  }, [setUser]);

  const onLoad = (autoC) => setSearchQuery(autoC);

  const onPlaceChanged = () => {
    setLat(searchQuery?.getPlace()?.geometry?.location?.lat() ?? 0);
    setLng(searchQuery?.getPlace()?.geometry?.location?.lng() ?? 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCoordinates({ lat, lng });
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <form className="flex justify-center pt-10">
        <div className="flex w-6/12">
          <Dropdown
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
          <Searchbar
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            handleSearch={handleSearch}
            shouldShowButton={true}
          />
        </div>
      </form>
      <MajorCities setCoordinates={setCoordinates} />
      <div className="flex flex-row align-center pt-8 z-0 flex-1 overflow-y-auto">
        {place ? (
          <GemDetail
            user={user}
            place={place}
            setPlace={setPlace}
            setAllPlaces={setAllPlaces}
          />
        ) : (
          <GemList
            places={curPlaces}
            setPlace={setPlace}
            pinHover={pinHover}
            setPinHover={setPinHover}
          />
        )}
        <Map
          places={places}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          setPlace={setPlace}
          pinHover={pinHover}
          setPinHover={setPinHover}
        />
      </div>
    </div>
  );
}
