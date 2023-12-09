import { useEffect, useState } from "react";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";
import { useLoginForm } from "../../../hooks/auth/component/useLogin";
import { useTranslation } from "react-i18next";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const { formik, isLoading, handleKeyDown } = useLoginForm();
  const [open, setOpen] = useState(false);
  const storage = localStorage.getItem("axiosError");

  useEffect(() => {
    if (storage) {
      toast.error(t(storage));
      localStorage.removeItem("axiosError");
    }
  }, [storage, t]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleForm = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <>
      <form onSubmit={(e) => handleForm(e)}>
        <Stack spacing={3}>
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
              }
            }}
            required
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            label={t("password")}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyDown={(e) => {
              handleKeyDown(e);
              if (e.key === "Enter") {
                e.preventDefault();
                formik.handleSubmit();
              }
            }}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}>
          <Link variant="subtitle2" underline="hover" onClick={handleOpen}>
            {t("Forgot_password")}
          </Link>
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          loading={isLoading}
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          variant="contained">
          {t("Login")}
        </LoadingButton>
      </form>

      <ForgotPasswordModal open={open} handleClose={handleClose} />
    </>
  );
}
