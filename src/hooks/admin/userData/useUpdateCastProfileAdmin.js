import { useState } from "react";
import { useFormik } from "formik";
import { profileSchema } from "./userDataValidationSchema";
import { useUpdateCastProfileByAdmin } from "../useAdmin";
import { useTranslation } from "react-i18next";

export const useUpdateCastProfileAdmin = (data) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const { t } = useTranslation();
  const handleProfileOpen = () => {
    setProfileOpen(true);
    setIsProfileVisible(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
    setIsProfileVisible(false);
  };
  const { mutate } = useUpdateCastProfileByAdmin({});

  const formik = useFormik({
    initialValues: {
      fname: data?.first_name,
      lname: data?.last_name,
      phone: data?.phone,
    },
    validationSchema: profileSchema(t),
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      value: values,
      id: data?.id,
    };
    mutate(values);
    formik.resetForm();
  };

  return {
    formik,
    isProfileVisible,
    profileOpen,
    handleProfileOpen,
    handleProfileClose,
  };
};
