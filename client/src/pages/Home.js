import { useEffect, useState } from "react";
import axios from "axios";

import Map from "../components/Map/Map";
import Dropdown from "../components/Search/Dropdown";
import Searchbar from "../components/Search/Searchbar";
import GemDetail from "../components/GemDetail";
import GemList from "../components/GemList";

export default function Home({ setUser, coordinates, setCoordinates }) {
  const [place, setPlace] = useState(null);
  const [places, setPlaces] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [pinClicked, setPinClicked] = useState(-1);
  const [searchQuery, setSearchQuery] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("All Categories");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    axios.get("gems").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorage());
    return () => window.removeEventListener("storage", handleStorage());
  }, [setUser]);

  useEffect(() => {
    if (pinClicked === -1) {
      setPlace(null);
      return;
    }

    for (const p of places) {
      if (p.id === pinClicked) {
        setPlace(p);
        return;
      }
    }
  }, [pinClicked, places]);

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
      <div className="flex flex-row align-center pt-8 z-0 flex-1 overflow-y-auto">
        {place ? (
          <GemDetail place={place} setPinClicked={setPinClicked} />
        ) : (
          <GemList />
        )}
        <Map
          places={places}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          setPinClicked={setPinClicked}
        />
      </div>
    </div>
  );
}
