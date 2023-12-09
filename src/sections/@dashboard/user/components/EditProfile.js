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
import { useTranslation } from "react-i18next";

const EditProfile = ({ open, formik, handleClose, handleKeyDown }) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    handleClose();
    formik.submitForm();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("UpdateProfile")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <TextField
              name="fname"
              label={t("firstName")}
              value={formik.values.fname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.fname && Boolean(formik.errors.fname)}
              helperText={formik.touched.fname && formik.errors.fname}
            />
            <TextField
              name="lname"
              label={t("lastName")}
              value={formik.values.lname}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.lname && Boolean(formik.errors.lname)}
              helperText={formik.touched.lname && formik.errors.lname}
            />
            <TextField
              name="phone"
              label={t("Phone")}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
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

export default EditProfile;
