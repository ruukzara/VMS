import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Container, Typography } from "@mui/material";
// components
// sections
import { AppNewsUpdate } from "../sections/@dashboard/app";
import { useTranslation } from "react-i18next";
import {
  useAllCastBooking,
  useCastBooking,
  useGetCastShift,
  // useGetCastShift,
} from "../hooks/dashboard/api/useDashboard";
import moment from "moment";
import AppBooking from "../sections/@dashboard/app/AppBooking";
import { getUser } from "../utils/cookieHelper";
import AppShiftUpdate from "../sections/@dashboard/app/AppShiftUpdate";

// ----------------------------------------------------------------------

export default function UserDashboard() {
  const date = moment();
  const { user } = getUser();
  const { t } = useTranslation();
  const currentDate = date.format("YYYY-MM-DD");
  const { data, isLoading } = useCastBooking(currentDate);
  const { data: allBookingData, isLoading: allBookingDataLoading } =
    useAllCastBooking();
  const { data: shiftData, isLoading: shiftDataLoading } = useGetCastShift(
    currentDate,
    user?.id
  );

  return (
    <>
      <Helmet>
        <title> {t("dashboard")} </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t("welcomeBack")}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <AppNewsUpdate
              title={t("todayBooking")}
              list={data}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={12} lg={12}>
            <AppBooking
              title={t("mybooking")}
              list={allBookingData}
              isLoading={allBookingDataLoading}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={12} lg={12}>
            <AppShiftUpdate
              title={t("todayshift")}
              list={shiftData}
              isLoading={shiftDataLoading}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
