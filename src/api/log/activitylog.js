import { axiosInstance } from "../axiosInterceptor";

export const getActivityLog = async () => {
  const { data } = await axiosInstance.get("/activitylog");
  return data;
};
