import { useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "./loginValidationSchema";
import { getUser, removeUser } from "../../../utils/cookieHelper";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../useAuth";
import { useTranslation } from "react-i18next";

export const useLoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isLoading } = useLogin({});
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema(t),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = (values) => {
    const { email, password } = values;
    mutate({ email, password });
  };

  const isMobileDevice = /Mobi/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobileDevice) {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        removeUser();
      }
    } else {
      const { token, user, isTemporaryPassword } = getUser();

      if (token) {
        if (isTemporaryPassword) {
          return navigate("/changePassword");
        } else if (user?.role === "Admin") {
          return navigate(`/super`);
        } else if (user?.role === "Cast") {
          return navigate(`/cast`);
        } else {
          return navigate(`/admin`);
        }
      }
    }
  }, [navigate, isMobileDevice]);

  const handleKeyDown = (event) => {
    // Trigger validation on keydown event
    formik.setFieldTouched(event.target.name, true, false);
    formik.validateField(event.target.name);
  };
  return {
    handleLogin,
    formik,
    isLoading,
    handleKeyDown,
  };
};
