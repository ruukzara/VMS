import moment from "moment";
import { useCastListBooking } from "../../dashboard/api/useDashboard";
import { useTranslation } from "react-i18next";
// import { IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";

export const useCastBookingTable = (handleOpen) => {
  const { data, isLoading, isError } = useCastListBooking();
  const { t } = useTranslation();
  const column = [
    {
      field: "id",
      title: "S.N",
      searchable: false,
      width: 30,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    {
      field: "booked_date",
      title: t("bookedDate"),
      render: (rowData) =>
        moment.utc(rowData?.booked_date).format("YYYY-MM-DD"),
    },
    {
      field: "start_at",
      title: t("startAt"),
      emptyValue: "-",
      render: (rowData) =>
        moment.utc(rowData?.start_at).local().format("hh:mm A"),
    },
    {
      field: "end_at",
      title: t("endAt"),
      emptyValue: "-",
      render: (rowData) =>
        moment.utc(rowData?.end_at).local().format("hh:mm A"),
    },
    {
      field: "price",
      title: t("Price"),
      emptyValue: "-",
    },
    {
      field: "booking_status",
      title: t("bookedStatus"),
      render: (rowData) => {
        return (
          <>
            {rowData?.booking_status === "Cancelled"
              ? t("Cancelled")
              : rowData?.booking_status === "Waiting"
                ? t("Waiting")
                : rowData?.booking_status === "Approved"
                  ? t("Approved")
                  : rowData?.booking_status === "Rejected"
                    ? t("Rejected")
                    : rowData?.booking_status === "Rejected_By_Cast"
                      ? t("Halt")
                      : rowData?.booking_status === "Success" ? t("Success") : t("Pending")}
          </>
        );
      },
      emptyValue: "-",
    },
    {
      field: "paymentstatus",
      title: t("paymentStatus"),
      width: "40px",
      emptyValue: "-",
    },
    // {
    //   title: t("Action"),
    //   sorting: false,
    //   searching: false,
    //   render: (rowData) => {
    //     return (
    //       <IconButton
    //         size="large"
    //         onClick={() => handleOpen(rowData?.id)}
    //         disabled={rowData?.booking_status === "Pending" ? true : false}>
    //         <EditIcon />
    //       </IconButton>
    //     );
    //   },
    // },
  ];
  return { data, column, isLoading, isError };
};
