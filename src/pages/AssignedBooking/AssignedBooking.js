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
import { useAssignedBookingTable } from "../../hooks/assignedBooking/table/useAssignedBookingTable";
import { useNavigate } from "react-router-dom";
import { StaticDatePicker } from "@mui/x-date-pickers";
import CustomMaterialTable from "../../components/table/CustomMaterialTable";
import Error from "../../components/error/Error";

const AssignedBooking = () => {
  const { t } = useTranslation();
  const { data, column, isLoading, isError, setDate, date } =
    useAssignedBookingTable();
  const navigate = useNavigate();

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
        <title> {t("castbooking")} </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("castbooking")}
          </Typography>
        </Stack>
        <Scrollbar>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={4}
              style={{ maxWidth: "31.25em" }}>
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
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ bgcolor: "#fff" }}>
                    <CustomMaterialTable
                      isLoading={isLoading}
                      data={data}
                      column={column}
                      onRowClick={(event, rowData) =>
                        navigate(`/admin/booking/${rowData?.id}`)
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

export default AssignedBooking;
