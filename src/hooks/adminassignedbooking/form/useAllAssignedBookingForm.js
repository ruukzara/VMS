import { useFormik } from "formik";
import { useState } from "react";
import { useChangeStatus } from "../../assignedBooking/useAssignedBooking";
import { bookingSchema } from "./bookingValidationSchema";
import { useTranslation } from "react-i18next";

export const useAllAssignedBookingForm = () => {
  const { mutate } = useChangeStatus({});
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [id, setId] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (bookingid) => {
    setId(bookingid);
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      status: "",
      remarks: "",
    },
    validationSchema: bookingSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      ...values,
      id,
    };
    mutate(values);
    formik.resetForm();
  };
  return {
    formik,
    open,
    handleClose,
    handleClickOpen,
  };
};
