import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapDisplay = ({ rowData }) => {
  const { hotel_lat: latitude, hotel_lng: longitude } = rowData.rowData;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ["places"],
  });
  const containerStyle = {
    width: "100%",
    height: "400px",
    marginTop: "10px",
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: Number(latitude), lng: Number(longitude) }}
          zoom={13}>
          <Marker
            position={{ lat: Number(latitude), lng: Number(longitude) }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
};

export default MapDisplay;
