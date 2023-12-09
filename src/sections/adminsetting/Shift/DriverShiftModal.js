import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

const DriverShiftModal = ({ open, handleClose, formik }) => {
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (formik.isValid && Object.keys(formik.errors).length === 0) {
      handleClose();
      formik.submitForm();
    }
  };

  const handleDialogClose = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleDialogClose} fullWidth={true}>
        <DialogTitle>{t("create_shift")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <TimePicker
              name="shiftstarttime"
              label={t("shiftstarttime")}
              value={formik.values.shiftstarttime}
              onChange={(newValue) => {
                const time = moment(newValue).format("HH:mm:ss");
                const existingDate = moment(formik.values.date).format(
                  "YYYY-MM-DD"
                );
                const updatedDateTime = moment(`${existingDate}T${time}`);
                formik.setFieldValue("shiftstarttime", updatedDateTime, true);
              }}
              required
            />
            {formik.errors.shiftstarttime && (
              <p style={{ color: "red" }}>{formik.errors.shiftstarttime}</p>
            )}
            <TimePicker
              name="shiftendtime"
              label={t("shiftendtime")}
              value={formik.values.shiftendtime}
              onChange={(newValue) => {
                const time = moment(newValue).format("HH:mm:ss");
                const existingDate = moment(formik.values.date).format(
                  "YYYY-MM-DD"
                );
                const updatedDateTime = moment(`${existingDate}T${time}`);
                formik.setFieldValue("shiftendtime", updatedDateTime, true);
              }}
              required
            />
            {formik.errors.shiftendtime && (
              <p style={{ color: "red" }}>{formik.errors.shiftendtime}</p>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            variant="contained"
            color="error">
            {t("cancel")}
          </Button>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            style={{ color: "#fff" }}
            disabled={!formik.isValid || !formik.dirty}
            color="success">
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DriverShiftModal;
