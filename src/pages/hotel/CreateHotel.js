import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Iconify from "../../components/iconify/Iconify";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";
import "./hotel.css";
import { useHotelForm } from "../../hooks/misc/component/useHotelForm";
import { LoadingButton } from "@mui/lab";
const steps = ["hotelInfo", "hotelLocation", "verifyData"];

const CreateHotel = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [map, setMap] = useState(/** @type google.maps.GoogleMap */(null));
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const {
    formik,
    setMarkerPosition,
    markerPosition,
    locationName,
    setLocationName,
    handleKeyDown,
  } = useHotelForm();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ["places"],
  });

  const containerStyle = {
    width: "100%",
    height: "600px",
    marginTop: "10px",
  };

  const [searchBox, setSearchBox] = useState(null);

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    setSearchValue(places[0]?.formatted_address);
    setMarkerPosition({
      lat: places[0]?.geometry?.location?.lat(),
      lng: places[0]?.geometry?.location?.lng(),
    });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        location: {
          lat: places[0]?.geometry?.location?.lat(),
          lng: places[0]?.geometry?.location?.lng(),
        },
      },
      (results, status) => {
        if (status === "OK" && results[0]) {
          setLocationName(results[0].formatted_address);
        }
      }
    );
  };

  const handleSubmit = () => {
    formik.submitForm();
    if (!formik.isSubmitting) {
      navigate("/super/misc");
    }
  };

  return (
    <div>
      <Helmet>
        <title> {t("Createhotel")} </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={3}>
          <Button
            onClick={() => navigate(-1)}
            startIcon={<Iconify icon="material-symbols:arrow-back" />}
          />
          <Typography variant="h4" gutterBottom>
            {t("Createhotel")}
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <Card variant="outlined" mt={5}>
            <Stepper activeStep={activeStep} sx={{ p: 5 }}>
              {steps.map((label, index) => {
                return (
                  <Step key={t(label)}>
                    <StepLabel>{t(label)}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 0 && (
              <div style={{ padding: "20px" }}>
                <Stack spacing={3} mb={5}>
                  <TextField
                    name="hotelname"
                    label={t("HotelName")}
                    value={formik.values.hotelname}
                    onBlur={formik.handleBlur}
                    onKeyDown={handleKeyDown}
                    onChange={formik.handleChange}
                    required
                    error={
                      formik.touched.hotelname &&
                      Boolean(formik.errors.hotelname)
                    }
                    helperText={
                      formik.touched.hotelname && formik.errors.hotelname
                    }
                  />
                  <TextField
                    name="email"
                    label={t("Email")}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    name="website"
                    label={t("Website")}
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.website && Boolean(formik.errors.website)
                    }
                    helperText={formik.touched.website && formik.errors.website}
                  />
                </Stack>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    variant="contained"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}>
                    {t("back")}
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    variant="contained"
                    disabled={!formik.isValid || !formik.dirty}
                    onClick={handleNext}>
                    {t("next")}
                  </Button>
                </Box>
              </div>
            )}
            {activeStep === 1 && (
              <div style={{ padding: "20px", overflowY: "scroll" }}>
                <Stack>
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={markerPosition}
                      zoom={13}
                      onLoad={(map) => setMap(map)}>
                      <StandaloneSearchBox
                        onLoad={onLoad}
                        onPlacesChanged={onPlacesChanged}>
                        <input
                          type="text"
                          defaultValue={searchValue}
                          placeholder={t("searchPlace")}
                          style={{
                            boxSizing: "border-box",
                            border: "1px solid transparent",
                            width: "440px",
                            height: "32px",
                            padding: "0 12px",
                            borderRadius: "3px",
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                            fontSize: "14px",
                            outline: "none",
                            textOverflow: "ellipses",
                            position: "absolute",
                            left: "38%",
                            marginLeft: "-120px",
                            zIndex: 10,
                          }}
                        />
                      </StandaloneSearchBox>
                      <IconButton
                        aria-label="location"
                        className="buttonClass"
                        onClick={() => map.panTo(markerPosition)}>
                        <BiCurrentLocation />
                      </IconButton>
                      {markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                  ) : (
                    <></>
                  )}
                </Stack>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    variant="contained"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}>
                    {t("back")}
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <Button
                    variant="contained"
                    disabled={!locationName}
                    onClick={handleNext}>
                    {t("next")}
                  </Button>
                </Box>
              </div>
            )}
            {activeStep === 2 && (
              <div style={{ padding: "20px" }}>
                <Stack spacing={3} mb={5}>
                  <TextField
                    name="hotelname"
                    label={t("HotelName")}
                    value={formik.values.hotelname}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="address"
                    label={t("Address")}
                    value={searchValue}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="email"
                    label={t("Email")}
                    value={formik.values.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    name="website"
                    label={t("Website")}
                    value={formik.values.website}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {t("LocationSelected")}
                </Typography>
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{
                      width: "100%",
                      height: "300px",
                      marginTop: "10px",
                    }}
                    center={markerPosition}
                    zoom={13}
                    onLoad={(map) => setMap(map)}>
                    <IconButton
                      aria-label="location"
                      className="buttonClassValid"
                      onClick={() => map.panTo(markerPosition)}>
                      <BiCurrentLocation />
                    </IconButton>
                    {markerPosition && <Marker position={markerPosition} />}
                  </GoogleMap>
                ) : (
                  <></>
                )}

                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    variant="contained"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}>
                    {t("back")}
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />

                  <LoadingButton
                    loading={formik.isSubmitting}
                    variant="contained"
                    onClick={() => handleSubmit()}>
                    {t("Submit")}
                  </LoadingButton>
                </Box>
              </div>
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default CreateHotel;
