import moment from "moment";
import { useGetActivityLog } from "../../api/useActivityLog";
import { useTranslation } from "react-i18next";

export const useActivityLogTable = () => {
  const { data, isLoading, isError } = useGetActivityLog();
  const { t } = useTranslation();

  const column = [
    {
      field: "id",
      title: "S.N.",
      searchable: false,
      width: 10,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "fullname", title: t("user"), emptyValue: "-" },
    { field: "activity", title: t("Activity"), emptyValue: "-" },
    {
      field: "created_at",
      title: t("CreatedAt"),
      emptyValue: "-",
      render: (rowData) =>
        moment.utc(rowData?.created_at).local().format("YYYY-MM-DD hh:mm:ss A"),
    },
  ];
  return {
    data,
    column,
    isLoading,
    isError,
  };
};
