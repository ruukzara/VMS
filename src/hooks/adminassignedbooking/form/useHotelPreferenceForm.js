import { useFormik } from "formik";
import {
  useChangeStatus,
  useGetHotelPrefer,
  useUpdateHotelPrefer,
} from "../../assignedBooking/useAssignedBooking";
import { blockSchema, hotelSchema } from "./bookingValidationSchema";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useHotelPreferenceForm = (id) => {
  const { data, isLoading, isError } = useGetHotelPrefer(id);
  const [hotelOpen, setHotelOpen] = useState(false);
  const { mutate: changeStatus, isLoading: statusLoading } = useChangeStatus(
    {}
  );
  const [isHotelForm, setIsHotelForm] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);

  const handleBlockOpen = () => {
    setOpenBlock(true);
  };

  const handleBlockClose = () => {
    setOpenBlock(false);
  };
  const { t } = useTranslation();
  const handleHotelOpen = () => {
    setHotelOpen(true);
    setIsHotelForm(true);
  };

  const handleHotelClose = () => {
    setHotelOpen(false);
    setIsHotelForm(false);
  };

  const { mutate } = useUpdateHotelPrefer({});

  const formik = useFormik({
    initialValues: {
      hotelid: "",
    },
    validationSchema: hotelSchema(t),
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const blockFormik = useFormik({
    initialValues: {
      remarks: "",
    },
    validationSchema: blockSchema(t),
    onSubmit: (values) => {
      handleBlock(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      ...values,
      id,
    };
    let statusValue = {
      status: "Approved",
      id: id,
    };
    mutate(values);
    changeStatus(statusValue);
    formik.resetForm();
  };

  const handleBlock = (values) => {
    let statusValue = {
      ...values,
      status: "Rejected",
      id: id,
    };
    changeStatus(statusValue);
    blockFormik.resetForm();
  };

  const handleSuccess = () => {
    let statusValue = {
      status: "Success",
      id: id,
    };
    changeStatus(statusValue);
  };

  return {
    formik,
    data,
    isLoading,
    isError,
    hotelOpen,
    isHotelForm,
    handleHotelOpen,
    handleHotelClose,
    handleBlock,
    statusLoading,
    blockFormik,
    openBlock,
    handleBlockOpen,
    handleBlockClose,
    handleSuccess,
  };
};
