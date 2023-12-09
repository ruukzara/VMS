import * as Yup from "yup";

const assignSchema = (t) =>
  Yup.object().shape({
    admin_id: Yup.string().required(t("Required")),
    cast_id: Yup.string().required(t("Required")),
  });

const updateManagerSchema = (t) =>
  Yup.object().shape({
    admin_id: Yup.string().required(t("Required")),
  });

export { assignSchema, updateManagerSchema };
