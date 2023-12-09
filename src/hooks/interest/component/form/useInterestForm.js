import { useFormik } from "formik";
import { useState } from "react";
import { useGetAllInterest, useUpdateInterest } from "../../api/useInterest";
import { interestSchema } from "./interestFormSchema";

export const useInterestForm = (userDetail) => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { mutate } = useUpdateInterest({});
  const { data: interestData, isLoading, isError } = useGetAllInterest();

  function mapInterest() {
    let mappedData = [];

    if (userDetail?.interests !== null) {
      for (let i = 0; interestData?.length > i; i++) {
        let data = interestData?.filter(
          (d) => d?.type === userDetail?.interests[i]
        );
        mappedData.push(data[0]?.id);
      }
    }
    return mappedData;
  }

  const arrayValue = Object.values(mapInterest());

  const handleOpen = () => {
    setOpen(true);
    setIsVisible(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      interestid: arrayValue ? arrayValue : [],
    },
    validationSchema: interestSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (value) => {
    value = { ...value, id: userDetail?.id };
    mutate(value);
    formik.resetForm();
  };

  const handleKeyDown = (event) => {
    // Trigger validation on keydown event
    formik.setFieldTouched(event.target.name, true, false);
    formik.validateField(event.target.name);
  };

  return {
    open,
    handleOpen,
    handleClose,
    formik,
    interestData,
    isLoading,
    isError,
    isVisible,
    handleKeyDown,
  };
};
