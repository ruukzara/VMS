import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Divider,
  // Backdrop,
  // CircularProgress,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// sections
import { LoginForm } from "../sections/auth/login";
import { useTranslation } from "react-i18next";
import LanguagePopover from "../layouts/dashboard/header/LanguagePopover";
import { useEffect } from "react";
import { useMobileAuth } from "../hooks/auth/useAuth";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
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

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");
  const { t } = useTranslation();
  const { mutate } = useMobileAuth({});
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobileDevice) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const from = params.get("from");
      localStorage.setItem("from", from);
      if (id) {
        mutate(id);
      }
    } else {
      localStorage.removeItem("from");
    }
  }, [mutate, isMobileDevice]);

  // if (isMobileDevice) {
  //   return (
  //     <Backdrop open={true}>
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  return (
    <>
      <Helmet>
        <title> {t("Login")} </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              {t("welcome_vms_login")}
            </Typography>
            <img src="/assets/icons/LinkedLogo.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {t("sign_in")}
              <LanguagePopover />
            </Typography>

            <Divider sx={{ my: 3 }}></Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
