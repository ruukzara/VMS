import {
  Backdrop,
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { useManagerAttendance } from "../../hooks/attendance/component/managerAttendance/table/useManagerAttendance";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import Error from "../../components/error/Error";

const ManagerAttendance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToDetail = (id) => {
    navigate(`/admin/attendance/${id}`);
  };
  const { column, data, isLoading, isError, date, setDate } =
    useManagerAttendance();
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

        <Scrollbar>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} style={{ maxWidth: "31.25em" }}>
              <Card variant="outlined">
                <Box sx={{ flexGrow: 1 }}>
                  <StaticDatePicker
                    label="Date"
                    format="YYYY-MM-DD"
                    inputFormat="YYYY-MM-DD"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ bgcolor: "#fff" }}>
                    <CustomMaterialTable
                      isLoading={isLoading}
                      title=""
                      options={{
                        showTitle: false,
                        actionsColumnIndex: -1,
                        sorting: true,
                        filtering: true,
                      }}
                      data={data}
                      column={column}
                      onRowClick={(event, rowData) =>
                        navigateToDetail(rowData?.id)
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ p: 3 }} />
        </Scrollbar>
      </Container>
    </>
  );
};

export default ManagerAttendance;
