import { axiosInstance } from "../axiosInterceptor";

export const getAssignedBooking = async (date) => {
  const { data } = await axiosInstance.get(`/getCastBooking?date=${date}`);
  return data;
};

export const updateStatus = async (value) => {
  const { data } = await axiosInstance.put(
    `/changeStatusWeb/${value?.id}?status=${value?.status}`,
    value
  );
  return data;
};

export const updatePayment = async (value) => {
  const { data } = await axiosInstance.put(`/updatePaymentStatus`, value);
  return data;
};

export const updateBookingStatus = async (value) => {
  const { data } = await axiosInstance.put(
    `/update-booking-status-cast`,
    value
  );
  return data;
};

export const getAllAssignedBooking = async (date) => {
  const { data } = await axiosInstance.get(`/getAllCastBooking?date=${date}`);
  return data;
};

export const getBookingDetail = async (id) => {
  const { data } = await axiosInstance.get(`/booking/${id}`);
  return data;
};

export const getBookingStatus = async (id) => {
  const { data } = await axiosInstance.get(`/bookingStatus/${id}`);
  return data;
};

export const getBookingDetailAdmin = async (id) => {
  const { data } = await axiosInstance.get(`/adminbookingdetail/${id}`);
  return data;
};

export const getHotelPreference = async (id) => {
  const { data } = await axiosInstance.get(`/getHotelPrefer?id=${id}`);
  return data;
};

export const updateHotelPreference = async (formData) => {
  const { data } = await axiosInstance.put(
    `/selectedHotel/${formData?.id}`,
    formData
  );
  return data;
};
