import { Backdrop, Box, Card, CircularProgress, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import ActivityLogTable from "../../sections/activitylog/ActivityLogTable";
import { useTranslation } from "react-i18next";
import { useActivityLogTable } from "../../hooks/log/component/table/useActivityLogTable";

const ActivityLog = () => {
  const { t } = useTranslation();
  const { data, column, isError, isLoading } = useActivityLogTable();
  if (isLoading) {
    return (
      <Backdrop
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress />
      </Backdrop>
    );
  }
  return (
    <>
      <Helmet>
        <title> {t("activitylog")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("activitylog")}
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <ActivityLogTable
                data={data}
                column={column}
                isError={isError}
                isLoading={isLoading}
              />
              <Box sx={{ p: 3 }} />
            </Box>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
};

export default ActivityLog;
