import { axiosInstance } from "../axiosInterceptor";

export const getTodayPayment = async (date) => {
  const { data } = await axiosInstance.get(`/todayPayment?date=${date}`);
  return data;
};

export const getPayment = async (startdate, enddate) => {
  const { data } = await axiosInstance.get(
    `/payment?startdate=${startdate}&enddate=${enddate}`
  );
  return data;
};
