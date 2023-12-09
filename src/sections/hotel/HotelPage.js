import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useHotelForm } from "../../hooks/misc/component/useHotelForm";
import { useTranslation } from "react-i18next";

const HotelPage = () => {
  const { t } = useTranslation();
  const { formik, setMarkerPosition, markerPosition } = useHotelForm();
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="hotelname"
            label={t("HotelName")}
            value={formik.values.hotelname}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
            error={formik.touched.hotelname && Boolean(formik.errors.hotelname)}
            helperText={formik.touched.hotelname && formik.errors.hotelname}
          />
          <TextField
            name="address"
            label={t("Address")}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            name="email"
            label={t("Email")}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="website"
            label={t("Website")}
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
          />
          {/* {locationName && (
            <TextField
              label={t("LocationSelected")}
              value={locationName}
              InputProps={{
                readOnly: true,
              }}
              multiline
              rows={4}
            />
          )} */}
          <Button variant="contained" color="info">
            {t("SelectLocation")}
          </Button>
          {/* <MapContainer
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
            open={openMap}
            handleClose={handleCloseMap}
            setLocationName={setLocationName}
          /> */}
        </Stack>
        <Button variant="contained" color="error">
          {t("cancel")}
        </Button>
        <Button
          variant="contained"
          disabled={!formik.isValid}
          style={{ color: "#fff" }}
          color="success">
          {t("Submit")}
        </Button>
      </form>
    </div>
  );
};

export default HotelPage;
