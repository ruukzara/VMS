import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: "4rem",
  backgroundColor: "#f5f5f5",
});

const Heading = styled(Typography)({
  marginBottom: "2rem",
  textAlign: "center",
});

const ErrorMessage = styled(Typography)({
  marginBottom: "2rem",
  textAlign: "center",
});

const ReloadButton = styled(Button)({
  marginTop: "2rem",
});

const handleReload = () => {
  window.location.reload();
};

const Error = () => {
  const { t } = useTranslation();
  return (
    <div>
      <RootContainer>
        <Heading variant="h4">{t("errorOccurred")}</Heading>
        <ErrorMessage variant="body1">{t("apologize")}</ErrorMessage>
        <ReloadButton
          variant="contained"
          color="primary"
          onClick={() => handleReload()}>
          {t("ReloadPage")}
        </ReloadButton>
      </RootContainer>
    </div>
  );
};

export default Error;
