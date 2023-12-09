import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import MapContainer from "./MapContainer";
import { useHotelEditForm } from "../../../../hooks/misc/component/useHotelEditForm";
import { useTranslation } from "react-i18next";

const EditHotelForm = ({ open, handleClose, formData }) => {
  const { t } = useTranslation();
  const { formik, markerPosition, setMarkerPosition } =
    useHotelEditForm(formData);
  const [openMap, setOpenMap] = React.useState(false);
  const [locationName, setLocationName] = React.useState("");

  const handleClickOpen = () => {
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const handleSubmit = () => {
    handleClose();
    formik.submitForm();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("UpdateHotelDetail")}</DialogTitle>
        <DialogContent style={{ paddingTop: "10px" }}>
          <Stack spacing={3}>
            <TextField
              name="hotelname"
              label={t("HotelName")}
              value={formik.values.hotelname}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              error={
                formik.touched.hotelname && Boolean(formik.errors.hotelname)
              }
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
            {locationName && (
              <TextField
                label={t("LocationSelected")}
                value={locationName}
                InputProps={{
                  readOnly: true,
                }}
                multiline
                rows={4}
              />
            )}
            <Button variant="contained" color="info" onClick={handleClickOpen}>
              {t("SelectLocation")}
            </Button>
            <MapContainer
              markerPosition={markerPosition}
              setMarkerPosition={setMarkerPosition}
              open={openMap}
              handleClose={handleCloseMap}
              setLocationName={setLocationName}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            disabled={!formik.isValid}
            style={{ color: "#fff" }}
            color="success"
            onClick={() => handleSubmit()}>
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditHotelForm;
