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
import ReactQuill from "react-quill";
import "./quill-custom-theme.scss";

const CreateBlogForm = ({ open, handleClose, formik,handleKeyDown }) => {
  const { t } = useTranslation();

  const handleSubmit = () => {
    handleClose();
    formik.submitForm();
  };

  const handler = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("Blog")}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={2}>
            <TextField
              name="title"
              label={t("Title")}
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              name="subtitle"
              label={t("SubTitle")}
              value={formik.values.subtitle}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
              required
              error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
              helperText={formik.touched.subtitle && formik.errors.subtitle}
            />
            <>
              <label htmlFor="description">{t("Description")}</label>
              <ReactQuill
                theme="snow"
                value={formik.values.description}
                name="description"
                style={{
                  height: "200px",
                }}
                onChange={(e) => formik.setFieldValue("description", e)}
                onBlur={() => formik.setFieldTouched("description", true, true)}
              />
            </>
            {formik.errors.description && (
              <p
                style={{
                  color: "#FF4842",
                  paddingTop: "30px",
                  fontSize: ".76rem",
                  paddingLeft: "15px",
                }}>
                {formik.errors.description}
              </p>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handler}>
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
    </>
  );
};

export default CreateBlogForm;
