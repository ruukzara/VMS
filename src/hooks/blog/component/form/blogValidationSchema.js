import * as Yup from "yup";

const blogSchema = (t) =>
  Yup.object().shape({
    title: Yup.string().required(t("Required")),
    subtitle: Yup.string().required(t("Required")),
    description: Yup.string()
      .required(t("Required"))
      .test("contains-tags-without-text", t("emptyEditor"), (value) => {
        // Check if only a tag is present without any text
        const regex = /<p><br\s*\/?><\/p>/i;
        return !regex.test(value);
      }),
  });

export { blogSchema };
