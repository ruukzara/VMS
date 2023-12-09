import moment from "moment";
import { useGetSchedule } from "../../api/useSchedule";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Chip } from "@mui/material";

export const useScheduleTable = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetSchedule();
  const [openTable, setOpenTable] = useState(false);
  const [shiftData, setShiftData] = useState();
  const [isTableVisible, setIsTableVisible] = useState(false);
  const handleShiftTableOpen = (formData) => {
    setOpenTable(true);
    setShiftData(formData);
    setIsTableVisible(true);
  };

  const handleShiftTableClose = () => {
    setOpenTable(false);
  };

  const column = [
    {
      field: "id",
      title: "S.N.",
      width: 10,
      searchable: false,
      dataIndex: "id",
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    {
      field: "date",
      width: 20,
      title: t("Date"),
      render: (rowData) => moment.utc(rowData?.date).format("YYYY-MM-DD"),
    },
    {
      field: "start_at",
      width: 20,
      title: t("startAt"),
      render: (rowData) => moment(rowData?.start_at).format("hh:mm A"),
    },
    {
      field: "end_at",
      width: 20,
      title: t("endAt"),
      render: (rowData) => moment(rowData?.end_at).format("hh:mm A"),
    },
  ];

  const shiftColumn = [
    {
      field: "id",
      title: "S.N",
      searchable: false,
      width: 10,
      dataIndex: "id",
      render: (rowData) => 1,
    },
    {
      field: "shiftstarttime",
      title: t("shiftstarttime"),
      render: (rowData) => moment(rowData?.shiftstarttime).format("hh:mm:ss A"),
    },
    {
      field: "shiftendtime",
      title: t("shiftendtime"),
      render: (rowData) => moment(rowData?.shiftendtime).format("hh:mm:ss A"),
    },
    {
      field: "shiftstatus",
      title: t("Status"),
      render: (rowData) =>
      !rowData?.shiftstatus ? (
        <Chip label={t("Accepted")} color="success" style={{color:"white"}}/>
      ) : (
        <Chip label={t("Rejected")} color="error" />
      ),
    },
  ];

  return {
    column,
    data,
    isLoading,
    isError,
    shiftColumn,
    openTable,
    handleShiftTableOpen,
    handleShiftTableClose,
    shiftData,
    isTableVisible,
  };
};
