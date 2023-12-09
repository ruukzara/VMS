// @mui
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Skeleton,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useChangePayment } from "../../../hooks/assignedBooking/useAssignedBooking";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array,
};

export default function AppNewsUpdate({
  title,
  subheader,
  list,
  isLoading,
  ...other
}) {
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
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

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

  let value = {
    id: id,
    status: "Paid",
  };
  const { mutate, isLoading } = useChangePayment({});

  const handleConfirmation = () => {
    confirmAlert({
      title: t("confirmAction"),
      message: t("confirmAlert"),
      buttons: [
        {
          label: t("Yes"),
          onClick: () => {
            // Perform the mutation if the user clicks 'Yes'
            mutate(value);
          }
        },
        {
          label: t("No"),
          onClick: () => {
            // Do nothing or handle accordingly if the user clicks 'No'
          }
        }
      ]
    });
  };

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
      {paymentstatus === "Paid" && (
        <Typography
          variant="caption"
          sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
          {t("paymentStatus")}: {paymentstatus || "-"}
        </Typography>
      )}
      {booking_status === "Approved" && paymentstatus !== "Paid" && (
        <Typography
          variant="caption"
          sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
          {t("paymentStatus")}:
          <LoadingButton
            loading={isLoading}
            size="small"
            variant="contained"
            onClick={handleConfirmation}
            style={{ color: 'white', marginRight: '15px', marginLeft: '10px' }}
            color="success"
          >
            {t('Received')}
          </LoadingButton>
        </Typography>
      )}
    </Stack>
  );
}
