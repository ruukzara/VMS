import { useTranslation } from "react-i18next";
import { useGetAssignedCast } from "../../../assignCastToAdmin/useAssignCastToAdmin";

export const useSubAdminAssignedTable = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetAssignedCast();

  const column = [
    {
      field: "id",
      title: "S.N",
      searchable: false,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "cast", title: t("cast_name"), emptyValue: "-" },
    { field: "city", title: t("city"), emptyValue: "-" },
  ];
  return {
    column,
    data,
    t,
    isLoading,
    isError,
  };
};
