import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import { useParams } from "react-router-dom";

const MapDisplayPage = () => {
  const { lat, lng } = useParams();
  
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ["places"],
  });

  const containerStyle = {
    width: "800px",
    height: "400px",
    marginTop: "10px",
  };

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: Number(lat), lng: Number(lng) }}
          zoom={13}>
          <Marker position={{ lat: Number(lat), lng: Number(lng) }} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MapDisplayPage;
