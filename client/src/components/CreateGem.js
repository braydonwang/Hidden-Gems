import { useState } from "react";
import Searchbar from "./Search/Searchbar";

export default function CreateGem() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  const onLoad = (autoC) => setSearchQuery(autoC);

  const onPlaceChanged = () => {
    const lat = searchQuery?.getPlace()?.geometry?.location?.lat() ?? 0;
    const lng = searchQuery?.getPlace()?.geometry?.location?.lng() ?? 0;
    setCoords({ lat, lng });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mx-auto">
      <h1 className="text-3xl font-medium mt-5 mb-7">
        <span className="italic">Share your hidden gem with the world </span>🌎
      </h1>
      <Searchbar
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        handleSearch={() => {}}
        shouldShowButton={false}
      />
    </div>
  );
}
