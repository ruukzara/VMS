import { axiosInstance } from "../axiosInterceptor";

export const getAllNewUser = async (date) => {
  const { data } = await axiosInstance.get(`/getAllNewUser?date=${date}`);
  return data;
};

export const getAllNewBooking = async (date) => {
  const { data } = await axiosInstance.get(`/getAllNewBooking?date=${date}`);
  return data;
};

export const getUnassignedCast = async () => {
  const { data } = await axiosInstance.get(`/getUnassignedCast`);
  return data;
};

export const getCastBooking = async (date) => {
  const { data } = await axiosInstance.get(
    `/castbooking?date=${date}&status=Approved`
  );
  return data;
};

export const getCastListBooking = async () => {
  const { data } = await axiosInstance.get(`/castbooking?date=&status=`);
  return data;
};

export const getAllCastBooking = async (date) => {
  const { data } = await axiosInstance.get(`/castbooking?status=Pending`);
  return data;
};

export const getCastShift = async ({ date, id }) => {
  const { data } = await axiosInstance.get(`/castshift?date=${date}&id=${id}`);
  return data;
};
