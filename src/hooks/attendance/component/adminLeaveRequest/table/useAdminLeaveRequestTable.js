import moment from "moment";
import {
  useGetAllLeaveRequest,
  useGetLeaveStatus,
} from "../../../useAttendance";
import { Chip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useAdminLeaveRequestTable = (id, type) => {
  const { data: leaveData, isLoading: leaveLoading } = useGetLeaveStatus();
  const {
    data,
    isLoading: dataLoading,
    isError,
    isFetching: isLoading,
  } = useGetAllLeaveRequest(id);
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const column = [
    {
      field: "id",
      title: "S.N",
      dataIndex: "id",
      searchable: false,
      width: 10,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    {
      field: "fullname",
      title: t("User"),
      emptyValue: "-",
    },
    {
      field: "startdate",
      title: t("leaveStartDate"),
      emptyValue: "-",
      render: (rowData) => moment(rowData?.startdate).format("YYYY-MM-DD"),
    },
    {
      field: "enddate",
      title: t("leaveEndDate"),
      emptyValue: "-",
      render: (rowData) => moment(rowData?.enddate).format("YYYY-MM-DD"),
    },
    { field: "reason", title: t("Reason"), emptyValue: "-" },
    {
      field: "admin",
      title: type === "Approved" ? t("approvedBy") : t("rejectedBy"),
      emptyValue: "-",
      hidden: type === "Pending" && true,
    },
    {
      field: "status",
      title: t("Status"),
      sorting: false,
      emptyValue: "-",
      render: (rowData) => (
        <Chip
          label={rowData?.status}
          style={{ color: "white" }}
          color={
            rowData?.status === "Approved"
              ? "success"
              : rowData?.status === "Rejected"
              ? "error"
              : "primary"
          }
        />
      ),
    },
  ];
  return {
    data,
    column,
    isLoading,
    isError,
    leaveData,
    value,
    handleChange,
    leaveLoading,
    dataLoading,
  };
};
