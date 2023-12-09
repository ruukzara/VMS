import * as Yup from "yup";

const interestMiscSchema = (t) =>
  Yup.object().shape({
    type: Yup.string().required(t("Required")),
  });

const cupSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t("Required")),
  });

const locationSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t("Required")),
    country: Yup.string().required(t("Required")),
  });

const colorSchema = (t) =>
  Yup.object().shape({
    color: Yup.string().required(t("Required")),
  });

const hotelSchema = (t) =>
  Yup.object().shape({
    hotelname: Yup.string().required(t("Required")),
    email: Yup.string().email(t("emailValid")),
    website: Yup.string(),
  });
const packageSchema = (t) =>
  Yup.object().shape({
    duration: Yup.string()
      .matches(/^[0-9]*$/, t("Onlynumbersallowed"))
      .min(0, t("durationValidation"))
      .when("is_additional", {
        is: false,
        then: Yup.string()
          .matches(/^[0-9]*$/, t("Onlynumbersallowed"))
          .min(0, t("durationValidation"))
          .test("is-valid", t("maxDuration"), (value) => {
            const num = parseInt(value);
            if (isNaN(num)) {
              return false; // Invalid number
            }
            if (num === 0) {
              return false;
            }
            if (num >= 60) {
              return true;
            }
          }),
        otherwise: Yup.string(),
      }),
    packageName: Yup.string().required(t("Required")),
    price: Yup.string()
      .matches(/^[0-9]*$/, t("Onlynumbersallowed"))
      .required(t("Required"))
      .min(0, t("priceGreate")),
    sale_price: Yup.string()
      .matches(/^[0-9]*$/, t("Onlynumbersallowed"))
      .required(t("Required"))
      .min(0, t("priceGreate")),
    is_additional: Yup.boolean().required(t("Required")),
    is_recommend: Yup.boolean().required(t("Required")),
    is_delivery_course: Yup.boolean().required(t("Required")),
    is_membership: Yup.boolean().required(t("Required")),
  });

export {
  cupSchema,
  colorSchema,
  locationSchema,
  hotelSchema,
  packageSchema,
  interestMiscSchema,
};
