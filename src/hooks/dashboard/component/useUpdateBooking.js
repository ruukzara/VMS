import { useState } from "react";
import { useChangeBookingStatus } from "../../assignedBooking/useAssignedBooking";
import { useFormik } from "formik";
import { bookingSchema } from "../../adminassignedbooking/form/bookingValidationSchema";
import { useTranslation } from "react-i18next";

export const useUpdateBooking = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const { mutate } = useChangeBookingStatus({});

  const handleOpen = (bookingid) => {
    setOpen(true);
    setId(bookingid);
  };

  const handleClose = () => {
    setOpen(false);
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
      bookingid: id,
    };
    mutate(values);
    formik.resetForm();
  };

  return {
    formik,
    open,
    handleOpen,
    handleClose,
  };
};
