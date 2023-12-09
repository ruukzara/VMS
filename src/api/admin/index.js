import { axiosInstance } from "../axiosInterceptor";

export const getAdmin = async () => {
  const { data } = await axiosInstance.get("/admin");
  return data;
};

export const getProfileUser = async () => {
  const { data } = await axiosInstance.get("/profile");
  return data;
};

export const createAdmin = async (value) => {
  const { data } = await axiosInstance.post("/adminRegister", value);
  return data;
};

export const createUserData = async (value) => {
  const { data } = await axiosInstance.post("/createUserMeta", value);
  return data;
};

export const updateUserData = async (value) => {
  const { data } = await axiosInstance.put("/updateUserMeta", value);
  return data;
};

export const checkMetadata = async (id) => {
  const { data } = await axiosInstance.get(`/admin/${id}`);
  return data;
};

export const getUserDetail = async (id) => {
  const { data } = await axiosInstance.get(`/user-meta/${id}`);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosInstance.delete(`/deleteUser/${id}`);
  return data;
};

export const updateProfile = async (value) => {
  const { data } = await axiosInstance.put(`/update-profile`, value);
  return data;
};

export const updateCastProfileByAdmin = async ({ value, id }) => {
  const { data } = await axiosInstance.put(
    `/admin-update-profile?id=${id}`,
    value
  );
  return data;
};

export const getUnassignedCast = async () => {
  const { data } = await axiosInstance.get(`/unassignedcast`);
  return data;
};
