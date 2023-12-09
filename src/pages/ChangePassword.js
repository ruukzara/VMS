import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import LanguagePopover from "../layouts/dashboard/header/LanguagePopover";
import { LoadingButton } from "@mui/lab";
import { useChangePasswordComponent } from "../hooks/auth/changePassword/useChangePasswordComponent";
import Iconify from "../components/iconify/Iconify";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser, removeUser } from "../utils/cookieHelper";
import { toast } from "react-toastify";
import { bgBlur } from "../utils/cssStyles";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRootNav = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { formik, isLoading, handleKeyDown } = useChangePasswordComponent();
  const { token, isTemporaryPassword } = getUser();
  useEffect(() => {
    if (!token) {
      toast.error("Not Authorized");
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (!isTemporaryPassword) {
      navigate("/");
    }
  }, [isTemporaryPassword, navigate]);

  const logOut = (e) => {
    e.preventDefault();
    removeUser();
    toast.success(t("logoutSuccess"));
    navigate("/");
  };

  return (
    <>
      <StyledRoot>
        <Helmet>
          <title> {t("changePassword")} </title>
        </Helmet>
        <StyledRootNav>
          <StyledToolbar>
            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction="row"
              alignItems="center"
              spacing={{
                xs: 0.5,
                sm: 1,
              }}>
              <LanguagePopover />

              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={(e) => logOut(e)}>
                {" "}
                {t("lgout")}
              </Button>
            </Stack>
          </StyledToolbar>
        </StyledRootNav>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {t("changePassword")}
            </Typography>

            <Divider sx={{ my: 3 }}></Divider>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="password"
                  required
                  label={t("new_pass")}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  onKeyDown={(e) => {
                    handleKeyDown(e);
                    if (e.key === "Enter") {
                      e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                  onBlur={formik.handleChange}
                  helperText={formik.touched.password && formik.errors.password}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end">
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* {formik.errors.password && (
                  <p style={{ color: "red" }}>{formik.errors.password}</p>
                )} */}
                <TextField
                  name="repeatPassword"
                  label={t("repeat_pass")}
                  required
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleChange}
                  error={
                    formik.touched.repeatPassword &&
                    Boolean(formik.errors.repeatPassword)
                  }
                  onKeyDown={(e) => {
                    handleKeyDown(e);
                    if (e.key === "Enter") {
                      e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                  helperText={
                    formik.touched.repeatPassword &&
                    formik.errors.repeatPassword
                  }
                  type={showRepeatPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowRepeatPassword(!showRepeatPassword)
                          }
                          edge="end">
                          <Iconify
                            icon={
                              showRepeatPassword
                                ? "eva:eye-fill"
                                : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* {formik.errors.repeatPassword && (
                  <p style={{ color: "red" }}>{formik.errors.repeatPassword}</p>
                )} */}
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  mt={3}
                  disabled={!formik.isValid || !formik.dirty}>
                  {t("Submit")}
                </LoadingButton>
              </Stack>
            </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default ChangePassword;
