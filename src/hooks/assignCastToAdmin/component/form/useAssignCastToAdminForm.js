import { useFormik } from "formik";
import { useState } from "react";
import { usePostAssignedCast } from "../../useAssignCastToAdmin";
import { assignSchema } from "./assingCastToAdminSchema";
import { useTranslation } from "react-i18next";

export const useAssignCastToAdminForm = () => {
  const { mutate } = usePostAssignedCast({});
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setVisible(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setVisible(true);
  };

  const formik = useFormik({
    initialValues: {
      cast_id: "",
      admin_id: "",
    },
    validationSchema: assignSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    mutate(values);
    formik.resetForm();
  };
  return {
    formik,
    open,
    handleClose,
    handleClickOpen,
    visible,
  };
};
