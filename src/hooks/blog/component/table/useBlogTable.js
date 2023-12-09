import moment from "moment";
import { useGetUserBlog } from "../../api/useBlog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useBlogTable = () => {
  const { data, isLoading, isError } = useGetUserBlog();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsFormVisible(true);
  };

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setFormData(data);
    setIsEditFormVisible(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const column = [
    {
      field: "id",
      title: "S.N.",
      searchable: false,
      width: 10,
      render: (rowData) => data?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "title", width: "15%", title: t("Title"), emptyValue: "-" },
    { field: "subtitle", width: "15%", title: t("SubTitle"), emptyValue: "-" },
    {
      field: "description",
      title: t("Description"),
      width: "40%",
      emptyValue: "-",
      render: (rowData) => (
        <div
          dangerouslySetInnerHTML={{
            __html:
              rowData?.description,
          }}></div>
      ),
    },
    {
      field: "created_at",
      title: t("CreatedAt"),
      emptyValue: "-",
      width: 20,
      render: (rowData) => moment.utc(rowData?.created_at).local().format("YYYY-MM-DD"),
    },
  ];

  return {
    data,
    isLoading,
    isError,
    column,
    formData,
    open,
    openEdit,
    handleClose,
    handleOpen,
    handleCloseEdit,
    handleOpenEdit,
    isFormVisible,
    isEditFormVisible,
  };
};
