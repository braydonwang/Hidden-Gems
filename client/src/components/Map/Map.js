import { useState } from "react";
import GoogleMapReact from "google-map-react";
import MapPin from "./MapPin";

export default function Map({
  places,
  coordinates,
  setCoordinates,
  setBounds,
  setPinClicked,
}) {
  const [pinHover, setPinHover] = useState(-1);

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
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        yesIWantToUseGoogleMapApiInternals
        defautlCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        options={{ clickableIcons: false }}
        onChange={(e) => handleMapChange(e)}
        onChildClick={handleChildClick}
        onChildMouseEnter={handleChildMouseEnter}
        onChildMouseLeave={handleChildMouseLeave}
      >
        {places?.map((place, ind) => (
          <MapPin
            key={ind}
            id={place.id}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            place={place}
            pinHover={pinHover}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
