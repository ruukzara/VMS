import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { hotelSchema } from "./miscValidationSchema";
import { useSaveHotel } from "../api/useMisc";
import { useState } from "react";

export const useHotelForm = () => {
  const { t } = useTranslation();
  const [markerPosition, setMarkerPosition] = useState({
    lat: 36.54686697549364,
    lng: 138.8312979431854,
  });
  const [locationName, setLocationName] = useState("");
  const { mutate: hotelMutate } = useSaveHotel({});

  const formik = useFormik({
    initialValues: {
      hotelname: "",
      email: "",
      website: "",
    },
    enableReinitialize: true,
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
      address:locationName
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
    formik,
    markerPosition,
    setMarkerPosition,
    locationName,
    setLocationName,
    handleKeyDown,
  };
};
