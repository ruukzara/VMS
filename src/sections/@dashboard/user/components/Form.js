import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, MenuItem, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const Form = ({ open, handleClose, formik, data }) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    handleClose();
    formik.submitForm();
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("Addnewuser")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <TextField
              name="first_name"
              label={t("firstName")}
              value={formik.values.first_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
            <TextField
              name="last_name"
              label={t("lastName")}
              value={formik.values.last_name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
            <TextField
              name="email"
              label={t("email")}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              name="phone"
              label={t("Phone")}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              select
              name="usertypeid"
              label={t("UserType")}
              value={formik.values.usertypeid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={
                formik.touched.usertypeid && Boolean(formik.errors.usertypeid)
              }
              helperText={
                formik.touched.usertypeid && formik.errors.usertypeid
              }>
              {data?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.type}
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
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Form;
