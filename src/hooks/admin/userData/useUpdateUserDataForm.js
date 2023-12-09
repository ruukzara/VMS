import { useFormik } from "formik";
import { useUpdateUserData } from "../useAdmin";
import {
  adminUserDataSchema,
  userDataSchema,
} from "./userDataValidationSchema";
import { useState } from "react";
import { useMiscTable } from "../../misc/component/useMiscTable";
import { getUser } from "../../../utils/cookieHelper";
import { useTranslation } from "react-i18next";

export const useUpdateUserDataForm = (userDetail) => {
  const [editOpen, setEditOpen] = useState(false);
  const [isVisibleEditMeta, setIsVisibleEditMeta] = useState(false);
  const { t } = useTranslation();
  const { user } = getUser();
  const handleOpenEditMeta = () => {
    setEditOpen(true);
    setIsVisibleEditMeta(true);
  };

  const handleCloseEditMeta = () => {
    setIsVisibleEditMeta(false);
    formik.resetForm();
  };

  const { colorData, locationData, breastCupData } = useMiscTable();

  const color =
    colorData && colorData.filter((d) => d.color === userDetail?.color)[0]?.id;
  const location =
    locationData &&
    locationData.filter((d) => d.country === userDetail?.country)[0]?.id;
  const breastcup =
    breastCupData &&
    breastCupData.filter((d) => d.name === userDetail?.breast_cup)[0]?.id;

  const { mutate } = useUpdateUserData({});
  const formik = useFormik({
    initialValues: {
      description: userDetail?.description,
      age: userDetail?.age,
      height: userDetail?.height,
      weight: userDetail?.weight,
      breast_cup_id: breastcup,
      waist: userDetail?.waist,
      hip: userDetail?.hip,
      breast_size: userDetail?.breast_size,
      location_id: location,
      color_id: color,
      message_from_store: userDetail?.message_from_store,
    },
    validationSchema:
      user?.role === "Cast" ? userDataSchema(t) : adminUserDataSchema(t),
    enableReinitialize: true,
    onSubmit: (values) => {
      handleUpdateMetaData(values);
    },
  });

  const handleUpdateMetaData = (values) => {
    values = {
      ...values,
      user_id: userDetail?.id,
    };
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
    editOpen,
    handleOpenEditMeta,
    handleCloseEditMeta,
    isVisibleEditMeta,
    handleKeyDown,
  };
};
