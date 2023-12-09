import moment from "moment";
import { useState } from "react";
import { useGetAllCast, useGetAllShift } from "../../api/useShift";
import { useTranslation } from "react-i18next";
import { Chip } from "@mui/material";

export const useShiftAdminTable = () => {
  const [id, setId] = useState("all");
  const { t } = useTranslation();
  const [date, setDate] = useState(moment(new Date()));
  const { data, isLoading, isError, refetch } = useGetAllShift(
    id,
    moment(date).format("YYYY-MM-DD")
  );
  const { data: castData } = useGetAllCast();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    refetch();
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
      field: "castname",
      title: t("cast_name"),
      emptyValue: "-",
    },
    {
      field: "shiftdate",
      title: t("Date"),
      emptyValue: "-",
      render: (rowData) => moment(rowData.shiftdate).format("YYYY-MM-DD"),
    },
    {
      field: "shiftstarttime",
      title: t("StartTime"),
      render: (rowData) =>
        moment.utc(rowData.shiftstarttime).local().format("hh:mm A"),
    },
    {
      field: "shiftendtime",
      title: t("EndTime"),
      render: (rowData) =>
        moment(rowData.shiftendtime).local().format("hh:mm A"),
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
    data,
    column,
    isLoading,
    isError,
    setDate,
    setId,
    date,
    id,
    castData,
    handleSearch,
    open,
    handleClose,
    handleClickOpen,
    setOpen,
  };
};
