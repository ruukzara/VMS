import { useTranslation } from "react-i18next";
import {
  useGetAllAssignedCast,
  useGetAllUnassignedCast,
} from "../../useAssignCastToAdmin";

export const useAssignCastToAdminTable = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetAllAssignedCast();
  const { data: castData } = useGetAllUnassignedCast();

  const column = [
    {
      field: "id",
      title: "S.N.",
      dataIndex: "id",
      searchable: false,
      width: 10,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "cast", title: t("cast_name"), width: 40, emptyValue: "-" },
    { field: "subadmin", title: t("assigned"), width: 30, emptyValue: "-" },
    { field: "city", title: t("city"), width: 30, emptyValue: "-" },
  ];

  return {
    column,
    data,
    isLoading,
    isError,
    castData,
  };
};
