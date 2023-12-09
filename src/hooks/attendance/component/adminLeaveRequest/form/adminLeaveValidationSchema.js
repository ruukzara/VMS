import * as Yup from "yup";

const adminLeaveRequestSchema = (t) =>
  Yup.object().shape({
    status: Yup.string().required(t("Required")),
  });

export { adminLeaveRequestSchema };
