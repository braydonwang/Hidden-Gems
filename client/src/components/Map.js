import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import MapPin from "./MapPin";

import CATEGORY from "../utils/CategoryData";
import axios from "axios";

export default function Map({
  coordinates,
  setCoordinates,
  setBounds,
  setPinClicked,
}) {
  const [pinHover, setPinHover] = useState(-1);
  const [places, setPlaces] = useState([
    {
      id: 4,
      name: "Pizzeria Badiali",
      location: "181 Dovercourt Rd, Toronto, ON M6J 3C6, Canada", // searchQuery.getPlace().formatted_address
      category: CATEGORY.FOOD,
      rating: 4.5,
      latitude: "43.8223615",
      longitude: "-79.56610619999998",
    },
    {
      id: 3,
      name: "Lorem Ipsum",
      location:
        "Restaurant MCDD, Lorong Impiana 1, Taman Impiana 1, Teluk Intan, Perak, Malaysia",
      category: CATEGORY.ENTERTAINMENT,
      rating: 4,
      latitude: "43.797462150529526",
      longitude: "-79.56937688572738",
    },
    {
      id: 1,
      name: "Donut Shop",
      location: "Donut Falls Trailhead, Salt Lake City, UT, USA",
      category: CATEGORY.SHOPPING,
      rating: 3.5,
      latitude: "43.81096611851939",
      longitude: "-79.59340947850082",
    },

    {
      id: 2,
      name: "Lorem ipsum howl odcmo apso mdocodo",
      location:
        "SDMC Parking Central Market Punjabi Bagh, West Punjabi Bagh, Punjabi Bagh, New Delhi, Delhi, India",
      category: CATEGORY.PHOTOGRAPHY,
      rating: 2.34,
      latitude: "43.80855049523862",
      longitude: "-79.54594510777328",
    },
  ]);

  useEffect(() => {
    axios.get("gems").then((response) => {
      setPlaces(response.data);
    });
  }, []);

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
