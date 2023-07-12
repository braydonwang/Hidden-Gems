import { useState } from "react";
import GoogleMapReact from "google-map-react";
import restaurantMap from "../images/restaurant-map.png";
export default function Map({ coordinates, setCoordinates, setBounds }) {
  const handleMapChange = (e) => {
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  };

  const places = [
    {
      latitude: "43.8223615",
      longitude: "-79.56610619999998",
    },
  ];

  console.log(coordinates);

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
        onChildClick={""}
      >
        <img
          src={restaurantMap}
          className="h-12 w-auto"
          alt="Restaurant"
          lat={43.8223615}
          lng={-79.5661168}
        />
      </GoogleMapReact>
    </div>
  );
}
