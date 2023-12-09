import { useFormik } from "formik";
import { useUpdatePackage } from "../api/useMisc";
import { packageSchema } from "./miscValidationSchema";
import { useTranslation } from "react-i18next";

export const usePackageEditForm = (formData) => {
  const { mutate: packageMutate } = useUpdatePackage({});
  const { t } = useTranslation();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      duration: formData?.duration,
      packageName: formData?.name,
      price: formData?.price,
      sale_price: formData?.sale_price,
      is_additional: formData?.is_additional,
      is_recommend: formData?.is_recommend,
      is_delivery_course: formData?.is_delivery_course,
      is_membership: formData?.is_membership,
    },
    validationSchema: packageSchema(t),
    onSubmit: (values) => {
      handleCreate(values);
    },
  });

  const handleCreate = (values) => {
    values = { ...values, id: formData?.id };
    packageMutate(values);
    formik.resetForm();
  };
  return {
    formik,
  };
};
