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
import { data } from "../../../utils/bookinstatus";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const BookingStatusModal = ({ open, handleClose, formik }) => {
  const [status, setStatus] = useState();
  const { t, i18n } = useTranslation();

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
        <DialogTitle>{t("chgStatus")}</DialogTitle>
        <DialogContent style={{ paddingTop: "10px" }}>
          <Stack spacing={4} mt={2}>
            <TextField
              select
              name="status"
              label={t("Status")}
              value={formik.values.status}
              onChange={(e) => {
                formik.handleChange(e);
                setStatus(e.target.value);
              }}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}>
              {data?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {i18n.languages[0] === "ja" ? option?.ja : option?.eng}
                </MenuItem>
              ))}
            </TextField>
            {(status === "Rejected") && (
              <TextField
                name="remarks"
                label={t("Remark")}
                value={formik.values.remarks}
                onChange={formik.handleChange}
                multiline
                rows={4}
                error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                helperText={
                  formik.touched.remarks && formik.errors.remarks
                }></TextField>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleDialogClose}>
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

export default BookingStatusModal;
