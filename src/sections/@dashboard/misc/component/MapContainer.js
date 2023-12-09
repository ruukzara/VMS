import React from "react";
import {
  GoogleMap,
  Marker,
  // StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const MapContainer = ({
  markerPosition,
  setMarkerPosition,
  open,
  handleClose,
  setLocationName,
}) => {
  const { t } = useTranslation();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ["places"],
  });

  const handleMapClick = (event) => {
    const { latLng } = event;
    setMarkerPosition({ lat: latLng.lat(), lng: latLng.lng() });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: latLng.lat(), lng: latLng.lng() } },
      (results, status) => {
        if (status === "OK" && results[0]) {
          setLocationName(results[0].formatted_address);
        }
      }
    );
  };

  const containerStyle = {
    width: "800px",
    height: "400px",
    marginTop: "10px",
  };

  // const [searchBox, setSearchBox] = useState(null);

  // const onLoad = (ref) => {
  //   setSearchBox(ref);
  // };

  // const onPlacesChanged = () => {
  //   const places = searchBox.getPlaces();
  //   // Do something with the places, e.g., update the map markers
  //   console.log(places);
  // };

  return (
    <Dialog scroll={"paper"} open={open} onClose={handleClose} maxWidth="md">
      <DialogContent>
        <Stack>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={markerPosition}
              zoom={13}
              onClick={handleMapClick}>
              {/* <StandaloneSearchBox
                onLoad={onLoad}
                onPlacesChanged={onPlacesChanged}>
                <input
                  type="text"
                  placeholder="Search for a place"
                  style={{
                    boxSizing: "border-box",
                    border: "1px solid transparent",
                    width: "240px",
                    height: "32px",
                    padding: "0 12px",
                    borderRadius: "3px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                    fontSize: "14px",
                    outline: "none",
                    textOverflow: "ellipses",
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px",
                    zIndex: 10,
                  }}
                />
              </StandaloneSearchBox> */}
              {markerPosition && <Marker position={markerPosition} />}
            </GoogleMap>
          ) : (
            <></>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{ color: "white" }}
          color="success"
          onClick={handleClose}>
          {t("Select")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapContainer;
