import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { useTranslation } from "react-i18next";

const LeaveRequestModalForm = ({ open, handleClose, formik }) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    formik.submitForm();
    if (formik.isValid) {
      handleClose();
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("leaveApply")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <DatePicker
              disablePast={true}
              value={formik.values.startdate}
              onChange={(newValue) =>
                formik.setFieldValue("startdate", newValue, true)
              }
              label={t("startDate")}
              name="startdate"
              required
              // slotProps={{
              //   textField: {
              //     variant: "outlined",
              //     error:
              //       formik.touched.startdate &&
              //       Boolean(formik.errors.startdate),
              //     helperText:
              //       formik.touched.startdate && formik.errors.startdate,
              //   },
              // }}
            />
            {formik.errors.startdate && (
              <p style={{ color: "red" }}>{formik.errors.startdate}</p>
            )}
            <DatePicker
              name="enddate"
              label={t("endDate")}
              disablePast={true}
              onBlur={formik.handleBlur}
              value={formik.values.enddate}
              onChange={(newValue) =>
                formik.setFieldValue("enddate", newValue, true)
              }
              required
              error={formik.touched.enddate && Boolean(formik.errors.enddate)}
              helperText={formik.touched.enddate && formik.errors.enddate}
            />
            {formik.errors.enddate && (
              <p style={{ color: "red" }}>{formik.errors.enddate}</p>
            )}
            <TextField
              name="reason"
              label={t("Reason")}
              value={formik.values.reason}
              onChange={formik.handleChange}
              required
              error={formik.touched.reason && Boolean(formik.errors.reason)}
              helperText={
                formik.touched.reason && formik.errors.reason
              }></TextField>
          </Stack> 
        </DialogContent>
        <DialogActions>
          <Button color="error" variant={"contained"} onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button
            disabled={!formik.isValid || !formik.dirty}
            color="success"
            variant={"contained"}
            style={{ color: "white" }}
            onClick={() => handleSubmit()}>
            {t("submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LeaveRequestModalForm;
