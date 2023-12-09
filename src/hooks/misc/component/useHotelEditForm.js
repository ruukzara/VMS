import { useFormik } from "formik";
import { hotelSchema } from "./miscValidationSchema";
import { useUpdateHotel } from "../api/useMisc";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useHotelEditForm = () => {
  const formData = JSON.parse(localStorage.getItem("hotelData"));
  const { t } = useTranslation();
  const { mutate: hotelMutate } = useUpdateHotel({});
  const [locationName, setLocationName] = useState("");
  const [markerPosition, setMarkerPosition] = useState({
    lat: formData && Number(formData?.hotel_lat),
    lng: formData && Number(formData?.hotel_lng),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hotelname: formData && formData?.name,
      email: formData && formData?.email,
      website: formData && formData?.website,
    },
    validationSchema: hotelSchema(t),
    onSubmit: (values) => {
      handleCreate(values);
    },
  });

  const handleCreate = (values) => {
    values = {
      ...values,
      latitude: markerPosition.lat,
      longitude: markerPosition.lng,
      address: locationName,
      id: formData?.id,
    };
    hotelMutate(values);
    formik.resetForm();
  };

  const handleKeyDown = (event) => {
    // Trigger validation on keydown event
    formik.setFieldTouched(event.target.name, true, false);
    formik.validateField(event.target.name);
  };

  return {
    markerPosition,
    setMarkerPosition,
    formik,
    locationName,
    setLocationName,
    handleKeyDown,
  };
};
