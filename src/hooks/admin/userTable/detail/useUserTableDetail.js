import { useState } from "react";
import { useMiscTable } from "../../../misc/component/useMiscTable";
import { useCheckMetaData, useGetUserDetail } from "../../useAdmin";
import { useUserData } from "../../userData/useUserData";

export const useUserTableDetail = (id) => {
  const [openMeta, setOpenMeta] = useState(false);
  const [isMetaVisible, setIsMetaVisible] = useState(false);
  const { data: checkUserMetaData } = useCheckMetaData(id);

  const { formik: formikMeta } = useUserData(id);

  const {
    data: userDetail,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserDetail(id);
  const { colorData, locationData, breastCupData } = useMiscTable();
  const handleClickOpenMeta = () => {
    setOpenMeta(true);
    setIsMetaVisible(true);
  };

  const handleClosMeta = () => {
    setOpenMeta(false);
  };

  return {
    checkUserMetaData,
    userDetail,
    openMeta,
    colorData,
    locationData,
    breastCupData,
    handleClickOpenMeta,
    handleClosMeta,
    formikMeta,
    isMetaVisible,
    userLoading,
    userError,
  };
};
