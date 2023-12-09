import * as Yup from "yup";

const userDataSchema = (t) =>
  Yup.object().shape({
    description: Yup.string().required(t("Required")),
    age: Yup.number()
      .required(t("Required"))
      .min(1, t("mininumAge"))
      .max(100, t("maximumAge")),
    height: Yup.number().required(t("Required"))
      .min(1, t("mininumHeight"))
      .max(300, t("maximumHeight")),
    weight: Yup.number().required(t("Required"))
      .min(1, t("mininumWeight"))
      .max(1000, t("maximumWeight")),
    breast_cup_id: Yup.string().required(t("Required")),
    waist: Yup.number().required(t("Required"))
      .min(1, t("mininumWaist"))
      .max(100, t("maximumWaist")),
    hip: Yup.number().required(t("Required"))
      .min(1, t("mininumHip"))
      .max(100, t("maximumHip")),
    breast_size: Yup.number().required(t("Required"))
      .min(1, t("mininumbreastsize"))
      .max(100, t("maximumbreastsize")),
    location_id: Yup.string().required(t("Required")),
    color_id: Yup.string().required(t("Required")),
  });

const adminUserDataSchema = (t) =>
  Yup.object().shape({
    description: Yup.string().required(t("Required")),
    age: Yup.number()
      .required(t("Required"))
      .min(1, t("mininumAge"))
      .max(100, t("maximumAge")),
    height: Yup.number()
      .required(t("Required"))
      .min(1, t("mininumHeight"))
      .max(300, t("maximumHeight")),
    weight: Yup.number()
      .required(t("Required"))
      .min(1, t("mininumWeight"))
      .max(1000, t("maximumWeight")),
    breast_cup_id: Yup.string().required(t("Required")),
    waist: Yup.number()
      .required(t("Required"))
      .min(1, t("mininumWaist"))
      .max(100, t("maximumWaist")),
    hip: Yup.number()
      .required(t("Required"))
      .min(1, t("mininumHip"))
      .max(100, t("maximumHip")),
    breast_size: Yup.number()
      .required(t("Required"))
      .min(1, t("mininumbreastsize"))
      .max(100, t("maximumbreastsize")),
    location_id: Yup.string().required(t("Required")),
    color_id: Yup.string().required(t("Required")),
    message_from_store: Yup.string()
      .min(10, t("should10Charac"))
      .max(240, t("should240Charac")),
  });

const profileSchema = (t) =>
  Yup.object().shape({
    fname: Yup.string().required(t("Required")),
    lname: Yup.string().required(t("Required")),
    phone: Yup.string().required(t("Required")),
  });

export { userDataSchema, profileSchema, adminUserDataSchema };
