import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import {
  useGetBookingDetail,
  useGetBookingStatus,
} from "../../../hooks/assignedBooking/useAssignedBooking";
import Iconify from "../../../components/iconify/Iconify";
import moment from "moment";
import BookingStatusModal from "../../../sections/booking/modal/BookingStatusModal";
import { useAllAssignedBookingForm } from "../../../hooks/adminassignedbooking/form/useAllAssignedBookingForm";
import EditIcon from "@mui/icons-material/Edit";
import { useHotelPreferenceForm } from "../../../hooks/adminassignedbooking/form/useHotelPreferenceForm";
import HotelPreferenceModal from "../../../sections/booking/modal/HotelPreferenceModal";
import { LoadingButton } from "@mui/lab";
import Error from "../../../components/error/Error";
import BlockModal from "./modal/BlockModal";
const MapLoader = React.lazy(() => import("../../attendance/detail/MapLoader"));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const AssignedBookingDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetBookingDetail(id);
  const { data: bookingStatus } = useGetBookingStatus(id);
  const { open, handleClickOpen, handleClose, formik } =
    useAllAssignedBookingForm();

  useEffect(() => {
    refetch();
  }, [refetch, id]);

  const {
    formik: hotelFormik,
    data: hotelData,
    hotelOpen,
    isHotelForm,
    handleHotelOpen,
    handleHotelClose,
    statusLoading,
    blockFormik,
    openBlock,
    handleBlockOpen,
    handleBlockClose,
  } = useHotelPreferenceForm(id);
  const navigate = useNavigate();

  const { t } = useTranslation();

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
        <title> {t("detailBooking")} </title>
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
            {t("detailBooking")}
          </Typography>
          {bookingStatus?.destination === 0 ? (
            <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
              <LoadingButton
                onClick={() => handleHotelOpen()}
                loading={statusLoading}
                variant="contained"
                disabled={
                  data?.booking_status === "Approved" ||
                  data?.booking_status === "Rejected" ||
                  data?.booking_status === "Cancelled" ||
                  data?.booking_status === "Success"
                }
                style={{ float: "right" }}
                endIcon={<EditIcon />}>
                {t("SelectDestination")}
              </LoadingButton>
              <LoadingButton
                onClick={() => handleBlockOpen()}
                variant="contained"
                loading={statusLoading}
                disabled={
                  data?.booking_status === "Approved" ||
                  data?.booking_status === "Rejected" ||
                  data?.booking_status === "Cancelled" ||
                  data?.booking_status === "Success"
                }>
                {t("Reject")}
              </LoadingButton>
            </Stack>
          ) : data?.booking_status !== "Approved" &&
            data?.booking_status !== "Rejected" &&
            data?.booking_status !== "Cancelled" && data?.booking_status !== "Success" ? (
            <>
              <Button variant="contained" onClick={() => handleClickOpen(id)}>
                {t("UpdateStatus")}
              </Button>
            </>
          ) : (
            <Button variant="contained" disabled>
              {t("UpdateStatus")}
            </Button>
          )}
        </Stack>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <Card variant="outlined">
                {bookingStatus && bookingStatus?.destination === 0 ? (
                  data?.destination_preference?.id !== null && (
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                        <Grid
                          container
                          spacing={2}
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center">
                          <Grid item lg={8} md={8} xs={10}>
                            <Typography variant="h6" pl={1}>
                              {t("DestinationPreferences")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Item>
                          <Typography variant="h6"> {t("name")}:</Typography>{" "}
                          {data?.destination_preference?.name || "-"}
                        </Item>
                        <Item>
                          <Typography variant="h6">
                            {" "}
                            {t("Location")}:{" "}
                          </Typography>
                          {data?.destination_preference?.address || "-"}
                        </Item>
                      </Grid>
                      {bookingStatus && bookingStatus?.destination === 1 && (
                        <Item>
                          <Typography variant="h6">
                            {" "}
                            {t("RoomNumber")}:{" "}
                          </Typography>
                          {data?.destination_preference?.room_number || "-"}
                        </Item>
                      )}
                    </Grid>
                  )
                ) : (
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid item lg={8} md={8} xs={10}>
                          <Typography variant="h6" pl={1}>
                            {t("DestinationPreferences")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {bookingStatus && bookingStatus?.destination !== 2 && (
                        <Item>
                          <Typography variant="h6"> {t("name")}:</Typography>{" "}
                          {data?.destination_preference?.name || "-"}
                        </Item>
                      )}
                      <Item>
                        <Typography variant="h6"> {t("Location")}: </Typography>
                        {data?.destination_preference?.address || "-"}
                      </Item>
                      {bookingStatus && bookingStatus?.destination === 1 && (
                        <Item>
                          <Typography variant="h6">
                            {t("RoomNumber")}:{" "}
                          </Typography>
                          {data?.destination_preference?.room_number || "-"}
                        </Item>
                      )}
                    </Grid>
                  </Grid>
                )}
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("BookedCast")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>{data?.castname || "-"}</Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("BookedUser")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>{data?.username || "-"}</Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("AcceptedDriver")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>
                      {data?.drivername !== " "
                        ? data?.drivername
                        : t("noBookingAccepted")}
                    </Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("BookingDate")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>
                      {moment
                        .utc(data?.booked_date)
                        .local()
                        .format("YYYY-MM-DD") || "-"}
                    </Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("bookedStatus")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>
                      {data?.booking_status === "Cancelled"
                        ? t("Cancelled")
                        : data?.booking_status === "Waiting"
                          ? t("Waiting")
                          : data?.booking_status === "Approved"
                            ? t("Approved")
                            : data?.booking_status === "Rejected"
                              ? t("Rejected")
                              : data?.booking_status === "Rejected_By_Cast"
                                ? t("Halt")
                                : data?.booking_status === "Success" ? t("Success") : t("Pending") || "-"}
                    </Item>
                  </Grid>
                </Card>
                {data?.remarks &&
                  (data?.booking_status === "Rejected_By_Cast" ||
                    data?.booking_status === "Rejected") && (
                    <Card variant="outlined">
                      <Grid item xs={12}>
                        <Typography variant="h6" pl={1}>
                          {t("Remark")}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Item>{data?.remarks || "-"}</Item>
                      </Grid>
                    </Card>
                  )}
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("Mode")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>{data?.mode || "-"}</Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("Currency")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>{data?.currency || "-"}</Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("Price")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>{data?.price || "-"}</Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("paymentStatus")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>{data?.paymentstatus || "-"}</Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("StartTime")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>
                      {moment.utc(data?.start_at).local().format("hh:mm A") ||
                        "-"}
                    </Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("EndTime")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>
                      {moment.utc(data?.end_at).local().format("hh:mm A") ||
                        "-"}
                    </Item>
                  </Grid>
                </Card>
                <Card variant="outlined">
                  <Grid item xs={12}>
                    <Typography variant="h6" pl={1}>
                      {t("SelectedPackages")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Item>
                      {data?.packages?.map((d, index) => (
                        <Chip label={d} key={index + 1} />
                      ))}
                    </Item>
                  </Grid>
                </Card>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Grid container>
                <Grid item md={12} lg={12} xs={12}>
                  <Card variant="contained">
                    <Typography variant="h6">{t("CastLocation")}</Typography>
                    <MapLoader
                      longitude={data?.cast_lng}
                      latitude={data?.cast_lat}
                    />
                  </Card>
                </Grid>
                {bookingStatus && data?.destination_preference?.id && (
                  <Grid item md={12} lg={12} xs={12} mt={2}>
                    <Card variant="contained">
                      <Typography variant="h6">{t("HotelLocation")}</Typography>
                      <MapLoader
                        longitude={data?.destination_preference?.location[0]}
                        latitude={data?.destination_preference?.location[1]}
                      />
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <BookingStatusModal
        open={open}
        formik={formik}
        handleClose={handleClose}
      />
      {isHotelForm && (
        <HotelPreferenceModal
          open={hotelOpen}
          formik={hotelFormik}
          data={hotelData}
          handleClose={handleHotelClose}
        />
      )}
      <BlockModal
        open={openBlock}
        handleClose={handleBlockClose}
        formik={blockFormik}
      />
    </div>
  );
};

export default AssignedBookingDetail;
