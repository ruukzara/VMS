import { axiosInstance } from "../axiosInterceptor";

export const login = async (email, password) => {
  const response = await axiosInstance.post("/login", { email, password });
  return response;
};

export const changePassword = async (password) => {
  const response = await axiosInstance.put("/changePassword", { password });
  return response;
};

export const forgotPassword = async (email) => {
  const response = await axiosInstance.put("/forgotPassword", { email });
  return response;
};

export const mobileAuth = async (id) => {
  const response = await axiosInstance.post(`/mobile-auth?id=${id}`);
  return response;
};
