import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "50vh",
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

const NoImage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <RootContainer>
        <img src="/assets/no-image.png" alt="noimage" loading="lazy" />
        <Heading variant="h4">{t("noimage")}</Heading>
        <ErrorMessage variant="body1">{t("noimageadded")}</ErrorMessage>
      </RootContainer>
    </div>
  );
};

export default NoImage;
