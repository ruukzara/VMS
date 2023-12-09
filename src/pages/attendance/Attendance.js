import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Scrollbar from "../../components/scrollbar";
import { useAttendanceTable } from "../../hooks/attendance/component/table/useAttendanceTable";
import { useNavigate } from "react-router-dom";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import Error from "../../components/error/Error";

const Attendance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { column, data, isLoading, isError } = useAttendanceTable();
  const navigateToDetail = (id) => {
    navigate(`/super/attendance/${id}`);
  };
  if (isError) {
    return <Error />;
  }

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
        <title> {t("attendance")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("attendance")}
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <Box sx={{ bgcolor: "#fff" }}>
              <CustomMaterialTable
                isLoading={isLoading}
                options={{
                  sorting: true,
                  filtering: true,
                }}
                data={data}
                column={column}
                onRowClick={(event, rowData) => navigateToDetail(rowData?.id)}
              />
              <Box sx={{ p: 3 }} />
            </Box>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
};

export default Attendance;
