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
import { useForgotPasswordComponent } from "../../../hooks/auth/forgotPassword/useForgotPasswordComponent";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";

const ForgotPasswordModal = ({ open, handleClose }) => {
  const { formik, isLoading, handleKeyDown } = useForgotPasswordComponent();
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    if (!isLoading) {
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("forgotPass")}</DialogTitle>
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogContent>
            <Stack spacing={3} mt={2}>
              <TextField
                name="email"
                label={t("email")}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyDown={(e) => {
                  handleKeyDown(e);
                  if (e.key === "Enter") {
                    e.preventDefault();
                    formik.handleSubmit();
                    if (!isLoading) {
                      handleClose();
                    }
                  }
                }}
                required
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClose()}>
              {t("cancel")}
            </Button>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              color="success"
              style={{ color: "white" }}
              disabled={!formik.isValid || !formik.dirty}
              type="submit">
              {t("submit")}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordModal;
