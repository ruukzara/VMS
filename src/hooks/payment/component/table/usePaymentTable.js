import { useTranslation } from "react-i18next";
import { useGetPayment } from "../../api/usePayment";
import moment from "moment";
import { useState } from "react";

export const usePaymentTable = () => {
  const currentDate = moment(new Date());
  const oneMonthBeforeDate = moment(new Date())
    .clone()
    .subtract(1, "months");
  const [startDate, setStartDate] = useState(oneMonthBeforeDate);
  const [endDate, setEndDate] = useState(currentDate);
  const { data, isLoading, isError, refetch } = useGetPayment(
    moment(startDate).format("YYYY-MM-DD"),
    moment(endDate).format("YYYY-MM-DD"),
  );
  const { t } = useTranslation();
  const column = [
    {
      field: "id",
      title: t("serialNumber"),
      searchable: false,
      width: 60,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    {
      field: "fullname",
      title: t("cast_name"),
      emptyValue: "-",
    },
    {
      field: "booked_date",
      title: t("Date"),
      emptyValue: "-",
      render: (rowData) => moment(rowData.booked_date).format("YYYY-MM-DD"),
    },
    {
      field: "mode",
      title: t("Mode"),
      emptyValue: "-",
    },
    {
      field: "price",
      title: t("Price"),
      emptyValue: "-",
    },
  ];

  const handleSearch = () => {
    refetch();
  };

  return {
    data,
    column,
    isLoading,
    isError,
    setStartDate,
    setEndDate,
    handleSearch,
    startDate,
    endDate,
  };
};



