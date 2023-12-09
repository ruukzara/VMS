import { useFormik } from "formik";
import {
  useGetLeaveStatus,
  useUpdateLeaveRequest,
} from "../../../useAttendance";
import { adminLeaveRequestSchema } from "./adminLeaveValidationSchema";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useAdminLeaveRequestForm = () => {
  const { mutate } = useUpdateLeaveRequest({});
  const { data, isLoading, isError } = useGetLeaveStatus();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const handleOpen = (value) => {
    setOpen(true);
    setId(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statusData = data?.filter((d) => d.value !== "Pending");

  const formik = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: adminLeaveRequestSchema(t),
    onSubmit: (values) => {
      updateLeaveRequest(values);
    },
  });

  const updateLeaveRequest = (value) => {
    value = {
      ...value,
      id: id,
    };
    mutate(value);
    formik.resetForm();
  };

  return {
    statusData,
    isLoading,
    isError,
    updateLeaveRequest,
    formik,
    open,
    handleClose,
    handleOpen,
  };
};
