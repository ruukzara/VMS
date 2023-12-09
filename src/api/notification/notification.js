import { axiosInstance } from "../axiosInterceptor";

export const getNotification = async () => {
  const { data } = await axiosInstance.get("/notification");
  return data;
};

export const getNotificationRead = async () => {
  const { data } = await axiosInstance.get("/old-notification");
  return data;
};

export const markAllAsRead = async () => {
  const { data } = await axiosInstance.put("/notification");
  return data;
};

export const markAsRead = async (id) => {
  const { data } = await axiosInstance.put(`/mark-as-read?id=${id}`);
  return data;
};
