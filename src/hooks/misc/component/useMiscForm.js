import { useFormik } from "formik";
import { useState } from "react";
import {
  usePostBreastCup,
  usePostColor,
  usePostLocation,
  useSavePackage,
} from "../api/useMisc";
import {
  colorSchema,
  cupSchema,
  interestMiscSchema,
  locationSchema,
  packageSchema,
} from "./miscValidationSchema";
import { useTranslation } from "react-i18next";
import { useCreateInterest } from "../../interest/api/useInterest";

export const useMiscForm = (type) => {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate: colorMutate } = usePostColor({});
  const { mutate: locationMutate } = usePostLocation({});
  const { mutate: breastCupMutate } = usePostBreastCup({});
  const { mutate: packageMutate } = useSavePackage({});
  const { mutate: interestMutate } = useCreateInterest({});
  const formik = useFormik({
    initialValues: {
      name: "",
      country: i18n.languages[0] === "ja" ? "日本" : "Japan",
      color: "",
      duration: "",
      packageName: "",
      price: "",
      sale_price: "",
      is_additional: "",
      is_recommend: "",
      is_delivery_course: "",
      is_membership: "",
      type: "",
    },
    enableReinitialize: true,
    validationSchema:
      type === "breastCup"
        ? cupSchema(t)
        : type === "color"
        ? colorSchema(t)
        : type === "Package"
        ? packageSchema(t)
        : type === "Interest"
        ? interestMiscSchema(t)
        : locationSchema(t),
    onSubmit: (values) => {
      handleCreate(values);
    },
  });

  const handleCreate = (values) => {
    values = {
      ...values,
    };
    type === "breastCup"
      ? breastCupMutate(values)
      : type === "color"
      ? colorMutate(values)
      : type === "Package"
      ? packageMutate(values)
      : type === "Interest"
      ? interestMutate(values)
      : locationMutate(values);
    formik.resetForm();
  };

  const handleKeyDown = (event) => {
    // Trigger validation on keydown event
    formik.setFieldTouched(event.target.name, true, false);
    formik.validateField(event.target.name);
  };

  return {
    handleClickOpen,
    open,
    handleClose,
    formik,
    handleKeyDown,
  };
};
