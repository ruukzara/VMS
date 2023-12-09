import { useState } from "react";
import { useDeleteUser, useGetAllAdmin } from "../useAdmin";
import { useTranslation } from "react-i18next";

export const useUserTable = () => {
  const { t } = useTranslation();
  const { mutate } = useDeleteUser({});
  const [open, setOpen] = useState(false);
  const [openMeta, setOpenMeta] = useState(false);
  const [value, setValue] = useState(0);
  const { data, isLoading, isError } = useGetAllAdmin();
  const adminData = data ? data?.filter((x) => x.type === "Admin") : [];
  const castData = data ? data?.filter((x) => x.type === "Cast") : [];

  const userDataTable = data ? data?.filter((x) => x.type === "User") : [];

  const subAdminData = data ? data?.filter((x) => x.type === "Sub Admin") : [];
  const driverData = data ? data?.filter((x) => x.type === "Driver") : [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenMeta = () => {
    setOpenMeta(true);
  };

  const handleClosMeta = () => {
    setOpenMeta(false);
  };

  const column = [
    { title: "S.N", field: "sn", searchable: false },
    { field: "first_name", title: t("firstName") },
    { field: "last_name", title: t("lastName") },
    { field: "email", title: t("Email") },
  ];

  const generateDataWithSN = (data) => {
    let sn = 1;
    return data.map((item) => {
      return {
        ...item,
        sn: sn++,
      };
    });
  };

  const adminTableData = generateDataWithSN(adminData);
  const castTableData = generateDataWithSN(castData);
  const userTableData = generateDataWithSN(userDataTable);
  const subAdminTableData = generateDataWithSN(subAdminData);
  const driverTableData = generateDataWithSN(driverData);

  return {
    adminTableData,
    castTableData,
    userTableData,
    subAdminTableData,
    handleChange,
    handleClickOpen,
    handleClose,
    open,
    value,
    column,
    handleClickOpenMeta,
    handleClosMeta,
    openMeta,
    mutate,
    driverTableData,
    adminData,
    castData,
    userDataTable,
    subAdminData,
    driverData,
    isLoading,
    isError,
  };
};
