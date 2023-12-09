import * as Yup from "yup";

const loginSchema = (t) => {
  return Yup.object().shape({
    email: Yup.string().required(t("emailRequired")).email(t("emailValid")),
    password: Yup.string()
      .required(t("passwordRequired"))
      .min(8, t("shortPass")),
  });
};

export { loginSchema };
