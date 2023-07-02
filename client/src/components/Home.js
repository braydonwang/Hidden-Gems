import { useState } from "react";

import Map from "./Map";
import Dropdown from "./Search/Dropdown";
import Searchbar from "./Search/Searchbar";
import GemDetail from "./GemDetail";

export default function Home() {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  return (
    <div>
      <form className="flex justify-center pt-10">
        <div className="flex w-6/12">
          <Dropdown />
          <Searchbar setCoordinates={setCoordinates} />
        </div>
      </form>
      <div className="flex flex-row align-center pt-8 z-0 h-full">
        <GemDetail />
        <Map coordinates={coordinates} />
      </div>
    </div>
  );
}
