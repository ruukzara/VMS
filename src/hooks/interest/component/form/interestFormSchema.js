import * as Yup from "yup";

const interestSchema = Yup.object().shape({
  interestid: Yup.array().required("Required"),
});

export { interestSchema };
