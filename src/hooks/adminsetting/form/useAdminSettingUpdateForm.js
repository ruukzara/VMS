import { useFormik } from "formik";
import { useUpdateDriverShift } from "../../shift/api/useShift";
import moment from "moment";
import { adminShiftSchema } from "./adminShiftValidationSchema";
import { useState } from "react";

export const useAdminSettingUpdateForm = () => {
  const { mutate } = useUpdateDriverShift({});

  const [formData, setFormData] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const handleOpenEdit = (formdata) => {
    setOpenEdit(true);
    setFormData(formdata);
    setEditVisible(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditVisible(false);
  };

  const updateformik = useFormik({
    initialValues: {
      shiftstarttime: moment(formData?.starttime),
      shiftendtime: moment(formData?.endtime),
    },
    enableReinitialize: true,
    validationSchema: adminShiftSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      shiftstarttime: moment(values?.shiftstarttime)
        .local()
        .format("YYYY MM DD hh:mm:ss A"),
      shiftendtime: moment(values?.shiftendtime)
        .local()
        .format("YYYY MM DD hh:mm:ss A"),
      id: formData?.id,
    };
    mutate(values);
    updateformik.resetForm();
  };
  return {
    openEdit,
    editVisible,
    updateformik,
    handleOpenEdit,
    handleCloseEdit,
  };
};
