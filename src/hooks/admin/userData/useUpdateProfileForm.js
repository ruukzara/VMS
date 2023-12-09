import { useFormik } from "formik";
import { useUpdateProfile } from "../useAdmin";
import { profileSchema } from "./userDataValidationSchema";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useUpdateProfileForm = (data) => {
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
  const { mutate } = useUpdateProfile({});

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
    mutate(values);
    formik.resetForm();
  };

  const handleKeyDown = (event) => {
    // Trigger validation on keydown event
    formik.setFieldTouched(event.target.name, true, false);
    formik.validateField(event.target.name);
  };

  return {
    formik,
    isProfileVisible,
    profileOpen,
    handleProfileOpen,
    handleProfileClose,
    handleKeyDown,
  };
};
