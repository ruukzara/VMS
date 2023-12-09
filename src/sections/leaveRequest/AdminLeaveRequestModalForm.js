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

const AdminLeaveRequestModalForm = ({ open, handleClose, data, formik }) => {
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
        <DialogTitle>{t("updateLeave")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <TextField
              select
              name="status"
              label={t("Status")}
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}>
              {data?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value === "Approved"
                    ? `${t("Approve")}`
                    : `${t("Reject")}`}
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
            {t("submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminLeaveRequestModalForm;
