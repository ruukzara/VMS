import moment from "moment/moment";
import { useChangeStatus } from "../../assignedBooking/useAssignedBooking";
import { useAllGetAssignedBooking } from "../useAdminAssignedBooking";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useAllAssignedBookingTable = () => {
  const [date, setDate] = useState(moment());
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = useAllGetAssignedBooking(
    moment(date).format("YYYY-MM-DD")
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
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
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
    },
    { field: "castname", title: t("selectCast") },
    { field: "username", title: t("User") },
    {
      field: "booked_date",
      title: t("bookedDate"),
      render: (rowData) => moment(rowData?.booked_date).format("YYYY-MM-DD"),
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
