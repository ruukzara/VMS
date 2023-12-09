import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Container, Typography, Skeleton } from "@mui/material";
// components
// sections
import { AppWidgetSummary } from "../sections/@dashboard/app";
import {
  useGetAllNewBooking,
  useGetAllNewUser,
  useGetUnassignedCast,
} from "../hooks/dashboard/api/useDashboard";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { getUser } from "../utils/cookieHelper";
import AppPaymentUpdate from "../sections/@dashboard/app/AppPaymentUpdate";
import { useGetTodayPayment } from "../hooks/payment/api/usePayment";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const date = moment();
  const { t } = useTranslation();
  const { user } = getUser();

  const currentDate = date.format("YYYY-MM-DD");
  const { data: newUserData, isLoading: newUserLoading } =
    useGetAllNewUser(currentDate);
  const { data: newBookingData, isLoading: newBookingLoading } =
    useGetAllNewBooking(currentDate);
  const { data: newUnassignedCast, isLoading: newUnassignedCastLoading } =
    useGetUnassignedCast(user?.role === "Admin" ? true : false);
  const { data: paymentData, isLoading: paymentLoading } = useGetTodayPayment(
    currentDate,
    user?.role === "Admin" ? true : false
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
          <Grid item xs={12} sm={6} md={3}>
            {newUserLoading ? (
              <Skeleton variant="rounded" width={210} height={220} />
            ) : (
              <AppWidgetSummary
                title={t("NewUsers")}
                total={newUserData?.totalnewuser || 0}
                color="info"
                icon={"prime:user-plus"}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {newBookingLoading ? (
              <Skeleton variant="rounded" width={210} height={220} />
            ) : (
              <AppWidgetSummary
                title={t("todayCast")}
                total={newBookingData?.totalnewbooking || 0}
                color="warning"
                icon={"mdi:user-lock-outline"}
              />
            )}
          </Grid>
          {user?.role === "Admin" && (
            <Grid item xs={12} sm={6} md={3}>
              {newUnassignedCastLoading ? (
                <Skeleton variant="rounded" width={210} height={220} />
              ) : (
                <AppWidgetSummary
                  title={t("unassignedcast")}
                  total={newUnassignedCast?.unassignedcast || 0}
                  color="error"
                  icon={"pajamas:unassignee"}
                />
              )}
            </Grid>
          )}
        </Grid>
        {user?.role === "Admin" && (
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={12} lg={12}>
              <AppPaymentUpdate
                title={t("earning")}
                list={paymentData}
                isLoading={paymentLoading}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
