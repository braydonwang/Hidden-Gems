import { useState } from "react";
import GoogleMapReact from "google-map-react";
import MapPin from "./MapPin";

import CATEGORY from "../utils/CategoryData";

export default function Map({
  coordinates,
  setCoordinates,
  setBounds,
  setPinClicked,
}) {
  const [pinHover, setPinHover] = useState(-1);
  const places = [
    {
      id: 4,
      category: CATEGORY.FOOD,
      latitude: "43.8223615",
      longitude: "-79.56610619999998",
    },
    {
      id: 3,
      category: CATEGORY.ENTERTAINMENT,
      latitude: "43.797462150529526",
      longitude: "-79.56937688572738",
    },
    {
      id: 1,
      category: CATEGORY.SHOPPING,
      latitude: "43.81096611851939",
      longitude: "-79.59340947850082",
    },

    {
      id: 2,
      category: CATEGORY.PHOTOGRAPHY,
      latitude: "43.80855049523862",
      longitude: "-79.54594510777328",
    },
  ];

  const handleMapChange = (e) => {
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };

  const handleChildClick = (_, childProps) => {
    setPinClicked(childProps.id);
  };

  const handleChildMouseEnter = (_, childProps) => {
    setPinHover(childProps.id);
  };

  const handleChildMouseLeave = (_, childProps) => {
    setPinHover(-1);
  };

  return (
    <div className="w-8/12 overflow-hidden">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB4ehgdwynN_qJyyUddak7knJ7Uh48ZzWY" }}
        yesIWantToUseGoogleMapApiInternals
        defautlCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => handleMapChange(e)}
        onChildClick={handleChildClick}
        onChildMouseEnter={handleChildMouseEnter}
        onChildMouseLeave={handleChildMouseLeave}
      >
        {places.map((place, ind) => (
          <MapPin
            id={place.id}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            category={place.category}
            pinHover={pinHover}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
