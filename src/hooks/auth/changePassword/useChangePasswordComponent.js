import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useChangePassword } from "../useAuth";
import { changePasswordSchema } from "./changePasswordSchema";
import { useTranslation } from "react-i18next";

export const useChangePasswordComponent = () => {
  const { mutate, isLoading } = useChangePassword({});
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: changePasswordSchema(t),
    onSubmit: (values) => {
      handleChangePassword(values);
    },
  });

  const handleChangePassword = (values) => {
    const { password, repeatPassword } = values;
    if (password === repeatPassword) {
      mutate(repeatPassword);
    } else {
      toast.error(t("passwordnotmatch"));
    }
  };

  const handleKeyDown = (event) => {
    // Trigger validation on keydown event
    formik.setFieldTouched(event.target.name, true, false);
    formik.validateField(event.target.name);
  };

  return { formik, isLoading, handleKeyDown };
};
