import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useDeleteBreastCup,
  useDeleteColor,
  useDeleteHotel,
  useDeleteLocation,
  useDeletePackage,
  useGetBreastCup,
  useGetColor,
  useGetHotels,
  useGetLocation,
  useGetPackage,
} from "../api/useMisc";
import { Chip } from "@mui/material";
import { data } from "../../../utils/state";
import {
  useGetAllInterest,
  useRemoveInterest,
} from "../../interest/api/useInterest";

export const useMiscTable = () => {
  const { t } = useTranslation();

  let tabValue = Number(localStorage.getItem("hoteltab"));
  const [value, setValue] = useState(tabValue ? tabValue : 0);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditPackage, setOpenEditPackage] = useState(false);
  const [packageVisible, setPackageVisible] = useState(false);
  const [formData, setFormData] = useState();
  const [formDataPackage, setFormDataPackage] = useState();
  const { data: breastCupData, isLoading } = useGetBreastCup();
  const { data: interestData, isLoading: interestLoading } =
    useGetAllInterest();
  const { data: locationData } = useGetLocation();
  const { data: colorData } = useGetColor();
  const {
    data: hotelData,
    isLoading: hotelLoading,
    isError: hotelError,
  } = useGetHotels();
  const {
    data: packageData,
    isLoading: packageLoading,
    isError: packageError,
  } = useGetPackage();

  const stateData = data.filter(
    (item) =>
      locationData && !locationData?.some((element) => element.name === item.id)
  );

  const { mutate: deleteBreastCup } = useDeleteBreastCup({});
  const { mutate: deleteLocation } = useDeleteLocation({});
  const { mutate: deleteColor } = useDeleteColor({});
  const { mutate: deleteHotel } = useDeleteHotel({});
  const { mutate: deletePackage } = useDeletePackage({});
  const { mutate: deleteInterest } = useRemoveInterest({});

  const handleDeleteBreastCup = (id) => {
    deleteBreastCup(id);
  };

  const handleDeleteLocation = (id) => {
    deleteLocation(id);
  };

  const handleDeleteColor = (id) => {
    deleteColor(id);
  };

  const handleDeleteHotel = (id) => {
    deleteHotel(id);
  };

  const handleDeletePackage = (id) => {
    deletePackage(id);
  };

  const handleDeleteInterest = (id) => {
    deleteInterest(id);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.removeItem("hoteltab");
  };

  const handleOpenEdit = (tableData) => {
    setFormData(tableData);
    localStorage.setItem("latitude", tableData?.hotel_lng);
    localStorage.setItem("longitude", tableData?.hotel_lng);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenEditPackage = (tableData) => {
    setFormDataPackage(tableData);
    setOpenEditPackage(true);
    setPackageVisible(true);
  };

  const handleCloseEditPackage = () => {
    setOpenEditPackage(false);
    setPackageVisible(false);
  };

  const breastColumn = [
    {
      field: "id",
      title: "S.N",
      width: 30,
      searchable: false,
      render: (rowData) =>
        breastCupData?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "name", title: t("cup_size") },
  ];

  const interestColumn = [
    {
      field: "id",
      title: "S.N",
      width: 30,
      searchable: false,
      render: (rowData) =>
        interestData?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "type", title: t("Interest") },
  ];

  const colorColumn = [
    {
      field: "id",
      title: "S.N",
      width: 30,
      searchable: false,
      render: (rowData) =>
        colorData?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "color", title: t("colorName") },
  ];

  const locationColumn = [
    {
      field: "id",
      title: "S.N",
      searchable: false,
      width: 30,
      render: (rowData) =>
        locationData?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "name", title: t("name") },
    { field: "country", title: t("country") },
  ];

  const hotelColumn = [
    {
      field: "id",
      title: "S.N",
      searchable: false,
      width: 30,
      render: (rowData) =>
        hotelData?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "name", title: t("HotelName"), emptyValue: "-" },
    { field: "address", title: t("Address"), emptyValue: "-" },
    { field: "email", title: t("Email"), emptyValue: "-" },
    { field: "website", title: t("Website"), emptyValue: "-" },
  ];
  const packageColumn = [
    {
      field: "id",
      title: "S.N",
      searchable: false,
      width: 30,
      render: (rowData) =>
        packageData?.findIndex((x) => x?.id === rowData?.id) + 1,
    },
    { field: "name", title: t("PackageName"), emptyValue: "-" },
    { field: "price", title: t("Price"), emptyValue: "-" },
    { field: "duration", title: t("Duration"), emptyValue: "-" },
    { field: "sale_price", title: t("SalePrice"), emptyValue: "-" },
    {
      field: "is_additional",
      title: t("IsAdditional"),
      emptyValue: "-",
      render: (rowData) => (
        <Chip label={rowData?.is_additional ? "True" : "False"} />
      ),
    },
    {
      field: "is_recommend",
      title: t("IsRecommend"),
      emptyValue: "-",
      render: (rowData) => (
        <Chip label={rowData?.is_recommend ? "True" : "False"} />
      ),
    },
    {
      field: "is_delivery_course",
      title: t("IsDeliveryCourse"),
      emptyValue: "-",
      render: (rowData) => (
        <Chip label={rowData?.is_delivery_course ? "True" : "False"} />
      ),
    },
    {
      field: "is_membership",
      title: t("IsMembership"),
      emptyValue: "-",
      render: (rowData) => (
        <Chip label={rowData?.is_membership ? "True" : "False"} />
      ),
    },
  ];

  return {
    value,
    handleChange,
    breastColumn,
    colorColumn,
    locationColumn,
    colorData,
    locationData,
    breastCupData,
    handleDeleteBreastCup,
    handleDeleteLocation,
    handleDeleteColor,
    hotelData,
    hotelError,
    hotelLoading,
    hotelColumn,
    handleDeleteHotel,
    openEdit,
    handleOpenEdit,
    handleCloseEdit,
    formData,
    setFormData,
    packageColumn,
    packageData,
    packageLoading,
    packageError,
    handleDeletePackage,
    handleOpenEditPackage,
    handleCloseEditPackage,
    openEditPackage,
    formDataPackage,
    packageVisible,
    isLoading,
    stateData,
    interestColumn,
    interestData,
    interestLoading,
    handleDeleteInterest,
  };
};
