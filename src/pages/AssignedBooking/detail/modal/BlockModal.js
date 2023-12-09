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

const BlockModal = ({ open, handleClose, formik }) => {
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
        <DialogTitle>{t("chgStatus")}</DialogTitle>
        <DialogContent style={{ paddingTop: "10px" }}>
          <Stack spacing={4} mt={2}>
            <TextField
              name="remarks"
              label={t("Remark")}
              value={formik.values.remarks}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              multiline
              rows={4}
              error={formik.touched.remarks && Boolean(formik.errors.remarks)}
              helperText={
                formik.touched.remarks && formik.errors.remarks
              }></TextField>
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

export default BlockModal;
