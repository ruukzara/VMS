import * as Yup from "yup";

const changePasswordSchema = (t) =>
  Yup.object().shape({
    password: Yup.string().required(t("Required")).min(8, t("characterLength")),
    repeatPassword: Yup.string()
      .required(t("Required"))
      .min(8, t("characterLength"))
      .oneOf([Yup.ref("password"), null], t("passwordMatch")),
  });

export { changePasswordSchema };
