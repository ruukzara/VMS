import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

const ScheduleForm = ({ open, handleClose, formik, type }) => {
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (formik.isValid && Object.keys(formik.errors).length === 0) {
      handleClose();
      // Logging values after the form is submitted
      console.log('Date:', formik.values.date);
      console.log('Start At:', formik.values.start_at);
      console.log('End At:', formik.values.end_at);
      formik.submitForm();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("schedule")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <DatePicker
              name="date"
              minDate={moment()}
              disabled={type}
              maxDate={moment().add(1, "month")}
              label={t("Date")}
              value={formik.values.date}
              onChange={(newValue) => {
                formik.setFieldValue("date", newValue, true);
              }}
              format="YYYY-MM-DD"
              required
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
            {formik.errors.date && (
              <p style={{ color: "red" }}>{formik.errors.date}</p>
            )}
            <TimePicker
              name="start_at"
              label={t("startAt")}
              value={formik.values.start_at}
              onChange={(newValue) => {
                const time = moment(newValue).format("HH:mm:ss");
                const existingDate = moment(formik.values.date).format(
                  "YYYY-MM-DD"
                );
                const updatedDateTime = moment(`${existingDate}T${time}`);
                formik.setFieldValue("start_at", updatedDateTime, true);
              }}
              required
            />
            {formik.errors.start_at && (
              <p style={{ color: "red" }}>{formik.errors.start_at}</p>
            )}
            <TimePicker
              name="end_at"
              label={t("endAt")}
              value={formik.values.end_at}
              onChange={(newValue) => {
                const time = moment(newValue).format("HH:mm:ss");
                const existingDate = moment(formik.values.date).format(
                  "YYYY-MM-DD"
                );
                const updatedDateTime = moment(`${existingDate}T${time}`);
                formik.setFieldValue("end_at", updatedDateTime, true);
              }}
              required
            />
            {formik.errors.end_at && (
              <p style={{ color: "red" }}>{formik.errors.end_at}</p>
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
    </>
  );
};

export default ScheduleForm;
