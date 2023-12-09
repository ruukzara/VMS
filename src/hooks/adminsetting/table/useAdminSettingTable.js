import moment from "moment";
import { useGetDriverShift } from "../../shift/api/useShift";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Chip } from "@mui/material";

export const useAdminSettingTable = () => {
  const { data, isLoading, isError } = useGetDriverShift();
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const column = [
    {
      field: "id",
      title: "S.N",
      searchable: false,
      width: 10,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    {
      field: "shiftstarttime",
      title: t("StartTime"),
      render: (rowData) =>
        moment(rowData.starttime).local().format("hh:mm A"),
    },
    {
      field: "shiftendtime",
      title: t("EndTime"),
      render: (rowData) => moment(rowData.endtime).local().format("hh:mm A"),
    },
    {
      field: "enabled",
      title: t("Active"),
      render: (rowData) =>
        rowData?.enabled ? (
          <Chip label={t("Active")} color="success" style={{color:"white"}}/>
        ) : (
          <Chip label={t("Inactive")} color="error" />
        ),
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return {
    data,
    isLoading,
    isError,
    column,
    handleChange,
    value,
  };
};
