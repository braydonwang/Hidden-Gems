import GoogleMapReact from "google-map-react";

export default function Map({ coordinates }) {
  return (
    <div className="h-full w-8/12">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB4ehgdwynN_qJyyUddak7knJ7Uh48ZzWY" }}
        defautlCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={""}
        onChildClick={""}
      ></GoogleMapReact>
    </div>
  );
}