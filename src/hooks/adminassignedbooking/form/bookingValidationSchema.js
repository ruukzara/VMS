import * as Yup from "yup";

const bookingSchema = (t) =>
  Yup.object().shape({
    status: Yup.string().required(t("Required")),
    remarks: Yup.string(),
  });

const hotelSchema = (t) =>
  Yup.object().shape({
    hotelid: Yup.string().required(t("Required")),
  });

const blockSchema = (t) =>
  Yup.object().shape({
    remarks: Yup.string().required(t("Required")),
  });

export { bookingSchema, hotelSchema, blockSchema };
