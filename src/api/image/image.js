import { axiosInstance } from "../axiosInterceptor";

export const getImages = async (id) => {
  const { data } = await axiosInstance.get(`/upload?id=${id}`);
  return data;
};

export const uploadImage = async (formData) => {
  const { data } = await axiosInstance.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const uploadImageByAdmin = async (value) => {
  const { data } = await axiosInstance.post(
    `/adminupload/${value?.id}`,
    value?.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const uploadAvatar = async (value) => {
  const { data } = await axiosInstance.put(
    `/changeAvatar?id=${value?.id}`,
    value?.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const uploadProfileAvatar = async (value) => {
  const { data } = await axiosInstance.put(
    `/changeprofileAvatar?id=${value?.id}`,
    value?.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export const getProfileAvatar = async () => {
  const { data } = await axiosInstance.get(`/getProfileAvatar`);
  return data;
};

export const countImage = async (id) => {
  const { data } = await axiosInstance.get(`/countImage?id=${id}`);
  return data;
};

export const removeImage = async (url) => {
  const { data } = await axiosInstance.delete(`/upload?url=${url}`);
  return data;
};

export const removeProfileImage = async (url,type) => {
  const { data } = await axiosInstance.delete(`/changeprofileAvatar?url=${url}&type=${type}`);
  return data;
};
