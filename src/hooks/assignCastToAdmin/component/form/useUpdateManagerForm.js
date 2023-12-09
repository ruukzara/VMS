import { useFormik } from "formik";
import { useUpdateManager } from "../../useAssignCastToAdmin";
import { useState } from "react";
import { updateManagerSchema } from "./assingCastToAdminSchema";
import { useTranslation } from "react-i18next";

export const useUpdateManagerForm = () => {
  const { mutate } = useUpdateManager({});
  const { t } = useTranslation();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [id, setId] = useState();
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleClickOpenUpdate = (data) => {
    setId(data);
    setOpenUpdate(true);
  };

  const formik = useFormik({
    initialValues: {
      admin_id: "",
    },
    validationSchema: updateManagerSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = { ...values, id };
    mutate(values);
    formik.resetForm();
  };
  return {
    formik,
    openUpdate,
    handleCloseUpdate,
    handleClickOpenUpdate,
  };
};
