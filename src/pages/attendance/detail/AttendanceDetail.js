import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAttendanceDetail } from "../../../hooks/attendance/useAttendance";
import { styled } from "@mui/material/styles";
import Iconify from "../../../components/iconify/Iconify";
import MapLoader from "./MapLoader";
import moment from "moment";
import Error from "../../../components/error/Error";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const AttendanceDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data, isLoading, isError } = useAttendanceDetail(id);
  const navigate = useNavigate();

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
        <title> {t("attendance")} </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}>
          <Button
            onClick={() => navigate(-1)}
            startIcon={<Iconify icon="material-symbols:arrow-back" />}
          />
          <Typography variant="h4" gutterBottom>
            {t("detailAttendance")}
          </Typography>
          <Button disabled />
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <Card variant="outlined">
            <Grid container spacing={4}>
              <Grid item xs={4} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item>{t("name")}</Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>{data?.fullname}</Item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item>{t("ClockInDate")}</Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      {data?.clockindate
                        ? moment(data?.clockindate).format("YYYY-MM-DD")
                        : "-"}
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item>{t("ClockInTime")}</Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      {moment
                        .utc(data?.clockintime, "HH:mm:ss")
                        .local()
                        .format("HH:mm:ss") || "-"}
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item>{t("ClockOutDate")}</Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      {data?.clockoutdate
                        ? moment(data?.clockoutdate).format("YYYY-MM-DD")
                        : "-"}
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Item>{t("ClockOutTime")}</Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item>
                      {data?.clockouttime
                        ? moment
                            .utc(data?.clockouttime, "HH:mm:ss")
                            .local()
                            .format("HH:mm:ss")
                        : "-"}
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Box>
        <br />
        {data?.clockinlongitude !== null && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              <Grid item xs={6} md={6}>
                <Card variant="outlined">
                  <Item
                    sx={{
                      height: 450,
                    }}>
                    {t("ClockInLocation")}
                    <MapLoader
                      longitude={data?.clockinlongitude}
                      latitude={data?.clockinlatitude}
                    />
                  </Item>
                </Card>
              </Grid>
              <Grid item xs={6} md={6}>
                <Card variant="outlined">
                  <Item
                    sx={{
                      height: 450,
                    }}>
                    {t("ClockOutLocation")}
                    {data?.clockoutlongitude === null ? (
                      <>
                        <Box
                          component="img"
                          src="/assets/illustrations/nodata.jpg"
                          sx={{
                            height: 200,
                            mx: "auto",
                            my: { xs: 5, sm: 10 },
                          }}
                        />
                      </>
                    ) : (
                      <MapLoader
                        longitude={data?.clockoutlongitude}
                        latitude={data?.clockoutlatitude}
                      />
                    )}
                  </Item>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default AttendanceDetail;
