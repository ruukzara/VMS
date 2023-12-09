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

const AssignForm = ({ open, handleClose, formik, adminData, castData }) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    handleClose();
    formik.submitForm();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("AssignCast")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <TextField
              select
              name="admin_id"
              label={t("Manager")}
              value={formik.values.admin_id}
              onChange={formik.handleChange}
              required
              error={formik.touched.admin_id && Boolean(formik.errors.admin_id)}
              helperText={formik.touched.admin_id && formik.errors.admin_id}>
              {adminData?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option?.first_name} {option?.last_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              name="cast_id"
              label={t("cast")}
              value={formik.values.cast_id}
              onChange={formik.handleChange}
              required
              error={formik.touched.cast_id && Boolean(formik.errors.cast_id)}
              helperText={formik.touched.cast_id && formik.errors.cast_id}>
              {castData &&
                castData?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option?.first_name} {option?.last_name}
                  </MenuItem>
                ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={!formik.isValid || !formik.dirty}
            variant="contained"
            color="success"
            style={{ color: "white" }}>
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignForm;
