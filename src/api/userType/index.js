import { axiosInstance } from "../axiosInterceptor";

export const getUserType = async () => {
  const response = await axiosInstance.get("/usertype");
  return response;
};
