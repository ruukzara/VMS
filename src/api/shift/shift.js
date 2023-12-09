import { axiosInstance } from "../axiosInterceptor";

export const getCastShift = async (id, date) => {
  const { data } = await axiosInstance.get(`/shift?id=${id}&date=${date}`);
  return data;
};

export const getDriverShift = async (id, date) => {
  const { data } = await axiosInstance.get(`/driver-shift`);
  return data;
};

export const getAllCast = async () => {
  const { data } = await axiosInstance.get(`/systemcast`);
  return data;
};

export const getSubAdminCastShift=async(id,date)=>{
  const { data } = await axiosInstance.get(`/subadminshift?id=${id}&date=${date}`);
  return data;
}

export const createCastShift = async (formData) => {
  const { data } = await axiosInstance.post(`/shift`, formData);
  return data;
};

export const createDriverShift = async (formData) => {
  const { data } = await axiosInstance.post(`/driver-shift`, formData);
  return data;
};

export const rejectDriverShift = async (formData) => {
  const { data } = await axiosInstance.post(`/reject-shift`, formData);
  return data;
};

export const updateDriverShift = async (formData) => {
  const { data } = await axiosInstance.put(`/driver-shift`, formData);
  return data;
};
