import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const HotelPreferenceModal = ({ open, handleClose, formik, data }) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    handleClose();
    formik.submitForm();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("UpdateHotel")}</DialogTitle>
        <DialogContent>
          <Stack spacing={4} mt={2}>
            <TextField
              select
              name="hotelid"
              label={t("Hotel")}
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.hotelid && Boolean(formik.errors.hotelid)}
              helperText={formik.touched.hotelid && formik.errors.hotelid}>
              {data?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {t("Priority")}:{option?.priority} - {option?.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={!formik.isValid || !formik.dirty}
            style={{ color: "white" }}
            onClick={() => handleSubmit()}>
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HotelPreferenceModal;
