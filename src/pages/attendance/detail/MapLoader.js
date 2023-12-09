import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapLoader = ({ longitude, latitude }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ["places"],
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return isLoaded ? (
    <div>
      <GoogleMap mapContainerStyle={containerStyle} zoom={13} center={center}>
        {" "}
        <Marker position={center} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(MapLoader);
