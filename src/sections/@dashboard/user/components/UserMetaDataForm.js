import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, MenuItem, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

const UserMetaDataForm = ({
  open,
  type,
  handleClose,
  formik,
  cupData,
  locationData,
  colorData,
  role,
  handleKeyDown,
}) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    formik.submitForm();
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>
          {t(type)} {t("UserMetaData")}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <TextField
              name="age"
              label={t("Age")}
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              name="height"
              label={t("Heightcm")}
              value={formik.values.height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.height && Boolean(formik.errors.height)}
              helperText={formik.touched.height && formik.errors.height}
            />
            <TextField
              name="weight"
              label={t("Weightkg")}
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
            <TextField
              name="hip"
              label={t("Hipcm")}
              value={formik.values.hip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.hip && Boolean(formik.errors.hip)}
              helperText={formik.touched.hip && formik.errors.hip}
            />
            <TextField
              name="breast_size"
              label={t("BreastSizecm")}
              value={formik.values.breast_size}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={
                formik.touched.breast_size && Boolean(formik.errors.breast_size)
              }
              helperText={
                formik.touched.breast_size && formik.errors.breast_size
              }
            />
            <TextField
              name="waist"
              label={t("Waistcm")}
              value={formik.values.waist}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.waist && Boolean(formik.errors.waist)}
              helperText={formik.touched.waist && formik.errors.waist}
            />
            <TextField
              select
              name="breast_cup_id"
              label={t("breast_cup")}
              value={formik.values.breast_cup_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={
                formik.touched.breast_cup_id &&
                Boolean(formik.errors.breast_cup_id)
              }
              helperText={
                formik.touched.breast_cup_id && formik.errors.breast_cup_id
              }>
              {cupData?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              name="location_id"
              label={t("Location")}
              value={formik.values.location_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={
                formik.touched.location_id && Boolean(formik.errors.location_id)
              }
              helperText={
                formik.touched.location_id && formik.errors.location_id
              }>
              {locationData?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              name="color_id"
              label={t("color")}
              value={formik.values.color_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              error={formik.touched.color_id && Boolean(formik.errors.color_id)}
              helperText={formik.touched.color_id && formik.errors.color_id}>
              {colorData?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.color}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name="description"
              label={t("Description")}
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            {role === "Admin" && (
              <TextField
                name="message_from_store"
                label={t("Message")}
                multiline
                rows={4}
                value={formik.values.message_from_store}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyDown={handleKeyDown}
                error={
                  formik.touched.message_from_store &&
                  Boolean(formik.errors.message_from_store)
                }
                helperText={
                  formik.touched.message_from_store &&
                  formik.errors.message_from_store
                }
              />
            )}
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

export default UserMetaDataForm;
