import { useFormik } from "formik";
import moment from "moment/moment";
import { useState } from "react";
import { usePostSchedule } from "../../../api/useSchedule";
import { scheduleSchema } from "./scheduleCreateSchema";
import { useTranslation } from "react-i18next";

export const useScheduleCreateForm = () => {
  const { mutate } = usePostSchedule({});
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsFormVisible(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogClose = () => {
    formik.resetForm();
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      date: moment(new Date()),
      start_at: moment(new Date()),
      end_at: moment(new Date()),
    },
    validationSchema: scheduleSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      date: values?.date,
      start_at: values?.start_at,
      end_at: values?.end_at,
    };
    mutate(values);
    console.log(values);
    formik.resetForm()
  };
  return {
    formik,
    open,
    handleOpen,
    handleDialogClose,
    isFormVisible,
  };
};
