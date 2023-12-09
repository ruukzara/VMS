import React from "react";
import { useNotificationTable } from "../../hooks/notification/component/table/useNotificationTable";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Error from "../../components/error/Error";

const Notification = () => {
  const { t } = useTranslation();
  const { data, isLoading, column, isError } = useNotificationTable();
  if (isLoading) {
    return (
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (isError) {
    return <Error />;
  }
  return (
    <div>
      <Helmet>
        <title>{t("notification")}</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("notification")}
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <CustomMaterialTable
                isLoading={isLoading}
                data={data}
                column={column}
              />
            </Box>
          </Scrollbar>
        </Card>
      </Container>
    </div>
  );
};

export default Notification;
