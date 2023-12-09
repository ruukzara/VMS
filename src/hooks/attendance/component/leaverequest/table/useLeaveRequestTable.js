import { Chip } from "@mui/material";
import {
  useGetAllUserLeaveRequest,
  useGetLeaveStatus,
} from "../../../useAttendance";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useLeaveRequestTable = (id, type) => {
  const {
    isLoading: dataLoading,
    data,
    isError,
    isFetching: isLoading,
  } = useGetAllUserLeaveRequest(id);
  const { t } = useTranslation();
  const { data: leaveData, isLoading: leaveLoading } = useGetLeaveStatus();
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const column = [
    {
      field: "id",
      title: "S.N",
      width: 10,
      searchable: false,
      dataIndex: "id",
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
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
      emptyValue: "-",
      sorting: false,
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
    isLoading,
    column,
    isError,
    open,
    handleClickOpen,
    handleClose,
    leaveData,
    leaveLoading,
    value,
    handleChange,
    dataLoading,
  };
};
