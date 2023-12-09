import React from "react";
import { usePackageEditForm } from "../../../../hooks/misc/component/usePackageEditForm";
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
import { useTranslation } from "react-i18next";

const EditPackageForm = ({ open, handleClose, formData, handleKeyDown }) => {
  const { formik } = usePackageEditForm(formData);
  const { t } = useTranslation();

  const handleSubmit = () => {
    handleClose();
    formik.submitForm();
  };
  const [disable, setDisble] = React.useState(
    formik.values.is_additional || false
  );

  const handleDropdownChange = (event) => {
    const { value } = event.target;
    if (value === true) {
      formik.setFieldValue("duration", 0);
      setDisble(true);
    } else {
      setDisble(false);
    }
    formik.setFieldValue("is_additional", value);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("UpdatePackageDetail")}</DialogTitle>
        <DialogContent style={{ paddingTop: "10px" }}>
          <Stack spacing={3}>
            <TextField
              name="packageName"
              label={t("PackageName")}
              value={formik.values.packageName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={
                formik.touched.packageName && Boolean(formik.errors.packageName)
              }
              helperText={
                formik.touched.packageName && formik.errors.packageName
              }
            />
            <TextField
              name="duration"
              label={t("Duration")}
              value={formik.values.duration}
              disabled={disable}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.duration && Boolean(formik.errors.duration)}
              helperText={formik.touched.duration && formik.errors.duration}
            />
            <TextField
              name="price"
              label={t("Price")}
              value={formik.values.price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              name="sale_price"
              label={t("SalePrice")}
              value={formik.values.sale_price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
              required
              error={
                formik.touched.sale_price && Boolean(formik.errors.sale_price)
              }
              helperText={formik.touched.sale_price && formik.errors.sale_price}
            />
            <TextField
              name="is_additional"
              label={t("IsAdditional")}
              value={formik.values.is_additional}
              onBlur={formik.handleBlur}
              onChange={(e) => handleDropdownChange(e)}
              required
              select
              error={
                formik.touched.is_additional &&
                Boolean(formik.errors.is_additional)
              }
              helperText={
                formik.touched.is_additional && formik.errors.is_additional
              }>
              <MenuItem key={"true"} value={true}>
                {t("True")}
              </MenuItem>
              <MenuItem key={"false"} value={false}>
                {t("False")}
              </MenuItem>
            </TextField>
            <TextField
              name="is_recommend"
              label={t("IsRecommend")}
              value={formik.values.is_recommend}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              select
              error={
                formik.touched.is_recommend &&
                Boolean(formik.errors.is_recommend)
              }
              helperText={
                formik.touched.is_recommend && formik.errors.is_recommend
              }>
              <MenuItem key={"true"} value={true}>
                {t("True")}
              </MenuItem>
              <MenuItem key={"false"} value={false}>
                {t("False")}
              </MenuItem>
            </TextField>
            <TextField
              name="is_delivery_course"
              label={t("IsDeliveryCourse")}
              onBlur={formik.handleBlur}
              value={formik.values.is_delivery_course}
              onChange={formik.handleChange}
              required
              select
              error={
                formik.touched.is_delivery_course &&
                Boolean(formik.errors.is_delivery_course)
              }
              helperText={
                formik.touched.is_delivery_course &&
                formik.errors.is_delivery_course
              }>
              <MenuItem key={"true"} value={true}>
                {t("True")}
              </MenuItem>
              <MenuItem key={"false"} value={false}>
                {t("False")}
              </MenuItem>
            </TextField>
            <TextField
              name="is_membership"
              label={t("IsMembership")}
              value={formik.values.is_membership}
              onChange={formik.handleChange}
              required
              select
              error={
                formik.touched.is_membership &&
                Boolean(formik.errors.is_membership)
              }
              helperText={
                formik.touched.is_membership && formik.errors.is_membership
              }>
              <MenuItem key={"true"} value={true}>
                {t("True")}
              </MenuItem>
              <MenuItem key={"false"} value={false}>
                {t("False")}
              </MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            style={{ color: "#fff" }}
            color="success"
            disabled={!formik.isValid || !formik.dirty}
            onClick={() => handleSubmit()}>
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPackageForm;
