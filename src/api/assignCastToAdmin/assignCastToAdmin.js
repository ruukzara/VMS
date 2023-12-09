import { axiosInstance } from "../axiosInterceptor";

export const getAssignedCast = async () => {
  const { data } = await axiosInstance.get("/assignedCast");
  return data;
};

export const postAssignedCast = async (value) => {
  const { data } = await axiosInstance.post("/assignedCast", value);
  return data;
};

export const getAllAssignedCast = async () => {
  const { data } = await axiosInstance.get("/adminAssignedCast");
  return data;
};

export const updateManager = async (admin_id, id) => {
  const { data } = await axiosInstance.put(
    `/assignedCast?admin_id=${admin_id}&id=${id}`
  );
  return data;
};
