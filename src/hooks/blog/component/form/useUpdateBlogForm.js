import { useFormik } from "formik";
import { blogSchema } from "./blogValidationSchema";
import { useUpdateBlog } from "../../api/useBlog";
import { useTranslation } from "react-i18next";

export const useUpdateBlogForm = (formData) => {
  const { mutate } = useUpdateBlog({});
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      title: formData ? formData?.title : "",
      subtitle: formData ? formData?.subtitle : "",
      description: formData ? formData?.description : "",
    },
    enableReinitialize: true,
    validationSchema: blogSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = { ...values, id: formData?.id };
    mutate(values);
    formik.resetForm();
  };

  return {
    formik,
  };
};
