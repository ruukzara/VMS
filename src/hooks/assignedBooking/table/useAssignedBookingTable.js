import moment from "moment/moment";
import { useChangeStatus, useGetAssignedBooking } from "../useAssignedBooking";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useAssignedBookingTable = () => {
  const [date, setDate] = useState(moment());
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useGetAssignedBooking(
    moment.utc(date).local().format("YYYY-MM-DD")
  );

  useEffect(() => {
    refetch();
  }, [date, refetch]);

  const { mutate } = useChangeStatus({});

  const changeStatus = (id, status) => {
    const data = { id, status };
    mutate(data);
  };

  const column = [
    {
      field: "id",
      title: "S.N",
      searchable: false,
      width: 10,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    {
      field: "booking_status",
      title: "Booking Status",
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
                      :rowData?.booking_status === "Success" ? t("Success"): t("Pending")}
          </>
        );
      },
    },
    { field: "castname", title: "Cast Selected" },
    { field: "username", title: "User" },
    {
      field: "booked_date",
      title: "Booked Date",
      render: (rowData) =>
        moment.utc(rowData?.booked_date).format("YYYY-MM-DD"),
    },
  ];

  return {
    column,
    isLoading,
    isError,
    data,
    changeStatus,
    setDate,
    date,
  };
};
