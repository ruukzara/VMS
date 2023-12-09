import { useFormik } from "formik";
import { useForgotPassword } from "../useAuth";
import { forgotPasswordSchema } from "./forgotPasswordValidationSchema";
import { useTranslation } from "react-i18next";

export const useForgotPasswordComponent = () => {
  const { mutate, isLoading } = useForgotPassword({});
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema(t),
    onSubmit: (values) => {
      handleSend(values);
    },
  });

  const handleSend = (values) => {
    mutate(values.email);
    formik.resetForm();
  };

  const handleKeyDown = (event) => {
    // Trigger validation on keydown event
    formik.setFieldTouched(event.target.name, true, false);
    formik.validateField(event.target.name);
  };

  return {
    formik,
    isLoading,
    handleKeyDown,
  };
};
