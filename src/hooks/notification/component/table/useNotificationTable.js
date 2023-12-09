import moment from "moment";
import { useGetOldNotification } from "../../useNotification";

export const useNotificationTable = () => {
  const { data, isLoading, isError } = useGetOldNotification();

  const column = [
    {
      field: "id",
      title: "S.N.",
      emptyValue: "-",
      searchable: false,
      width: 30,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "title", title: "Title", emptyValue: "-" },
    { field: "description", title: "Description", emptyValue: "-" },
    {
      field: "created_at",
      title: "Created At",
      render: (rowData) =>
        moment.utc(rowData?.created_at).local().format("YYYY-MM-DD hh:mm:ss"),
    },
  ];

  return {
    data,
    isLoading,
    isError,
    column,
  };
};
