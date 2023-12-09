import { useFormik } from "formik";
import { useGetUserType } from "../../usertype/useUserType";
import { usePostUser } from "../useAdmin";
import { registerSchema } from "./registerValidationSchema";
import { useTranslation } from "react-i18next";

export const useRegister = () => {
  const { mutate } = usePostUser({});
  const { data } = useGetUserType();
  const { t } = useTranslation();
  const userData = data?.filter((d) => d.type !== "Admin" && d.type !== "User");
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      usertypeid: "",
      phone: "",
    },
    validationSchema: registerSchema(t),
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  const handleRegister = (values) => {
    mutate(values);
    formik.resetForm();
  };

  return {
    formik,
    userData,
  };
};
