import * as Yup from "yup";

const forgotPasswordSchema = (t) =>
  Yup.object().shape({
    email: Yup.string().required(t("Required")).email(t("validEmail")),
  });

export { forgotPasswordSchema };
