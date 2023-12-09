import { useFormik } from "formik";
import { usePostUserData } from "../useAdmin";
import {
  adminUserDataSchema,
  userDataSchema,
} from "./userDataValidationSchema";
import { getUser } from "../../../utils/cookieHelper";
import { useTranslation } from "react-i18next";

export const useUserData = (id) => {
  const { mutate } = usePostUserData({});
  const { user } = getUser();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      description: "",
      age: "",
      height: "",
      weight: "",
      breast_cup_id: "",
      waist: "",
      hip: "",
      breast_size: "",
      location_id: "",
      color_id: "",
      message_from_store: "",
    },
    validationSchema:
      user?.role === "Cast" ? userDataSchema(t) : adminUserDataSchema(t),
    onSubmit: (values) => {
      handleCreateMetaData(values);
    },
  });

  const handleCreateMetaData = (values) => {
    values = {
      ...values,
      user_id: id,
    };
    mutate(values);
    formik.resetForm();
  };
  return {
    formik,
  };
};
