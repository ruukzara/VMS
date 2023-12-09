import { useFormik } from "formik";
import { leaveRequestSchema } from "./leaveRequestValidationSchema";
import { useCreateLeaveRequest } from "../../../useAttendance";
import moment from "moment";
import { useTranslation } from "react-i18next";

export const useLeaveRequestForm = () => {
  const { mutate } = useCreateLeaveRequest({});
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      reason: "",
      startdate: moment(),
      enddate: moment(),
    },
    validationSchema: leaveRequestSchema(t),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      startdate: moment(values?.startdate).utc(),
      enddate: moment(values?.enddate).utc(),
      reason: values?.reason,
    };
    mutate(values);
    formik.resetForm();
  };
  return {
    formik,
  };
};
