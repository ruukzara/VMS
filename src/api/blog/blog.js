import { axiosInstance } from "../axiosInterceptor";

export const getUserBlogs = async () => {
  const { data } = await axiosInstance.get("/user-blog");
  return data;
};

export const getSingleBlogs = async (id) => {
  const { data } = await axiosInstance.get(`/singleBlog?id=${id}`);
  return data;
};

export const createBlog = async (formData) => {
  const { data } = await axiosInstance.post("/user-blog", formData);
  return data;
};

export const updateBlog = async (formData) => {
  const { data } = await axiosInstance.put(
    `/user-blog?id=${formData.id}`,
    formData
  );
  return data;
};

export const deleteBlog = async (id) => {
  const { data } = await axiosInstance.put(`/user-delete-blog?id=${id}`);
  return data;
};
