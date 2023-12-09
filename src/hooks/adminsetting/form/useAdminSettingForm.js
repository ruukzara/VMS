import { useState } from "react";
import { useCreateDriverShift } from "../../shift/api/useShift";
import { useFormik } from "formik";
import moment from "moment";
import { adminShiftSchema } from "./adminShiftValidationSchema";
import { useTranslation } from "react-i18next";

export const useAdminSettingForm = () => {
  const { mutate } = useCreateDriverShift({});
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setVisible(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      shiftstarttime: moment(new Date()),
      shiftendtime: moment(new Date()),
    },
    validationSchema: adminShiftSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      shiftstarttime: values?.shiftstarttime,
      shiftendtime: values?.shiftendtime,
    };
    mutate(values);
    formik.resetForm();
  };

  return {
    open,
    handleClose,
    handleOpen,
    visible,
    formik,
  };
};
