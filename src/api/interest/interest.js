import { axiosInstance } from "../axiosInterceptor";

export const getAllInterest = async () => {
  const { data } = await axiosInstance.get("/interest");
  return data;
};

export const createInterest = async (formData) => {
  const { data } = await axiosInstance.post("/interest", formData);
  return data;
};

export const removeInterest = async (id) => {
  const { data } = await axiosInstance.delete(`/interest?id=${id}`);
  return data;
};

export const addInterest = async (array) => {
  const { data } = await axiosInstance.post("/user-interest", array);
  return data;
};

export const updateInterest = async (array) => {
  const { data } = await axiosInstance.put(
    `/update-interest-web?castid=${array?.id}`,
    array
  );
  return data;
};
