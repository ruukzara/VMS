import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
import Iconify from "../../../components/iconify/Iconify";
import { useUpdateBooking } from "../../../hooks/dashboard/component/useUpdateBooking";
import UpdateBookingModal from "./component/UpdateBookingModal";
import moment from "moment";

function NewsItem({ data, t }) {
  const {
    id,
    booked_date,
    currency,
    start_at,
    end_at,
    booking_status,
    paymentstatus,
    price,
  } = data;

  const { formik, open, handleOpen, handleClose } = useUpdateBooking();

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {t("bookedDate")}:{" "}
          {moment.utc(booked_date).local().format("YYYY-MM-DD")}
        </Link>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {t("bookedTime")}:{" "}
          {`${moment.utc(start_at).local().format("hh:mm A")}-${moment
            .utc(end_at)
            .local()
            .format("hh:mm A")}`}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {`${currency} ${price}`}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
        {t("bookedStatus")}:{" "}
        {booking_status === "Cancelled"
          ? t("Cancelled")
          : booking_status === "Waiting"
            ? t("Waiting")
            : booking_status === "Approved"
              ? t("Approved")
              : booking_status === "Rejected"
                ? t("Rejected")
                : booking_status === "Rejected_By_Cast"
                  ? t("Halt")
                  : booking_status === "Success" ? t("Success") : t("Pending") || "-"}
      </Typography>
      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
        {t("paymentStatus")}: {paymentstatus || "-"}
      </Typography>
      {booking_status === "Pending" && (
        <Button
          size="small"
          variant="contained"
          onClick={() => handleOpen(id)}
          style={{ color: "white", marginRight: "15px" }}
          color="success">
          {t("UpdateStatus")}
        </Button>
      )}
      <UpdateBookingModal
        open={open}
        handleClose={handleClose}
        formik={formik}
      />
    </Stack>
  );
}

const AppBooking = ({ title, subheader, list, isLoading, ...other }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {isLoading ? (
        <Skeleton variant="rounded" width={"100%"} height={150} />
      ) : (
        <>
          <Scrollbar>
            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
              {list?.length > 0 ? (
                list
                  ?.slice(0, 5)
                  ?.map((d) => <NewsItem key={d.id} data={d} t={t} />)
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap>
                  {t("noBooking")}
                </Typography>
              )}
            </Stack>
          </Scrollbar>

          <Divider />

          <Box sx={{ p: 2, textAlign: "right" }}>
            <Button
              size="small"
              color="inherit"
              onClick={() => navigate("/cast/booking")}
              endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}>
              {t("viewAll")}
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
};

export default AppBooking;
