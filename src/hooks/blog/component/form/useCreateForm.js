import { useFormik } from "formik";
import { blogSchema } from "./blogValidationSchema";
import { useCreateBlog } from "../../api/useBlog";
import { useTranslation } from "react-i18next";

export const useCreateForm = () => {
  const { mutate } = useCreateBlog({});
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
    },
    validationSchema: blogSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    mutate(values);
    formik.resetForm();
  };

  const handleKeyDown = (event) => {
    // Trigger validation on keydown event
    formik.setFieldTouched(event.target.name, true, false);
    formik.validateField(event.target.name);
  };

  return {
    formik,
    handleKeyDown,
  };
};
