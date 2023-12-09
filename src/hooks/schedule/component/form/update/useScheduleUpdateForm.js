import { useState } from "react";
import { useUpdateSchedule } from "../../../api/useSchedule";
import { useFormik } from "formik";
import moment from "moment";
import { scheduleSchema } from "../create/scheduleCreateSchema";
import { useTranslation } from "react-i18next";

export const useScheduleUpdateForm = () => {
  const { t } = useTranslation();
  const { mutate } = useUpdateSchedule({});
  const [openEdit, setOpenEdit] = useState(false);
  const [data, setData] = useState();
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setData(data);
    setIsEditFormVisible(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      date: moment(data?.date),
      start_at: moment(data?.start_at),
      end_at: moment(data?.end_at),
    },
    validationSchema: scheduleSchema(t),
    enableReinitialize: openEdit,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      id: data?.id,
      date: values?.date,
      start_at: values?.start_at,
      end_at: values?.end_at,
    };
    mutate(values);
    formik.resetForm();
  };
  return {
    formik,
    openEdit,
    handleOpenEdit,
    handleCloseEdit,
    isEditFormVisible,
  };
};
