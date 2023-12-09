import * as Yup from "yup";

const registerSchema = (t) =>
  Yup.object().shape({
    email: Yup.string().required(t("Required")),
    first_name: Yup.string().required(t("Required")),
    last_name: Yup.string().required(t("Required")),
    usertypeid: Yup.string().required(t("Required")),
    phone: Yup.string().required(t("Required")),
  });

export { registerSchema };
