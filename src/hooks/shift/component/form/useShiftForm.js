import { useState } from "react";
import { useGetCastSchedule } from "../../../schedule/api/useSchedule";
import { useFormik } from "formik";
import moment from "moment";
import { shiftSchema } from "./shiftFormValidationSchema";
import { useCreateShift, useRejectShift } from "../../api/useShift";

export const useShiftForm = () => {
  const [id, setId] = useState("");
  const [search, setSearch] = useState(false);
  const [date, setDate] = useState();
  const [selectedtime, setSelectedtime] = useState();
  const { data, isLoading, isError, refetch } = useGetCastSchedule(
    id,
    moment(date).format("YYYY-MM-DD"),
    search
  );
  const { mutate } = useCreateShift({});
  const { mutate: updateMutate } = useRejectShift({});
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(true);
    refetch();
  };

  const starttime = moment(data?.start_at);
  const endtime = moment(data?.end_at);

  const formik = useFormik({
    initialValues: {
      shiftstarttime: moment(data?.start_at),
      shiftendtime: moment(data?.end_at),
    },
    enableReinitialize: true,
    validationSchema: shiftSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    values = {
      date: data?.date,
      shiftstarttime: values?.shiftstarttime,
      shiftendtime: values?.shiftendtime,
      castid: id,
      scheduleid: data?.id,
    };
    mutate(values);
    setId("");
    setDate();
    setSearch(false);
    formik.resetForm();
  };

  const handleRejectShift = () => {
    let values = {
      date: data?.date,
      shiftstarttime: data?.start_at,
      shiftendtime: data?.end_at,
      castid: id,
      scheduleid: data?.id,
    };
    updateMutate(values);
    setId("");
    setDate();
    setSearch(false);
    formik.resetForm();
  };

  return {
    data,
    isLoading,
    isError,
    id,
    setId,
    date,
    setDate,
    formik,
    handleSearch,
    search,
    starttime,
    endtime,
    setSelectedtime,
    selectedtime,
    setSearch,
    handleRejectShift,
  };
};
