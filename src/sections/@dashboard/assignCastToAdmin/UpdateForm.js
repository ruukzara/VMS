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

const UpdateForm = ({ open, handleClose, formik, adminData }) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    handleClose();
    formik.submitForm();
  };

  const handleDialogClose = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleDialogClose} fullWidth={true}>
        <DialogTitle>{t("UpdateManager")}</DialogTitle>
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            disabled={!formik.isValid || !formik.dirty}
            color="success"
            style={{ color: "white" }}>
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateForm;
