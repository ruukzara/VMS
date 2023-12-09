import { axiosInstance } from "../axiosInterceptor";

export const getColor = async () => {
  const { data } = await axiosInstance.get("/color");
  return data;
};

export const postColor = async (color) => {
  const { data } = await axiosInstance.post("/color", { color });
  return data;
};

export const deleteColor = async (id) => {
  const { data } = await axiosInstance.delete(`/color/${id}`);
  return data;
};

export const getLocation = async () => {
  const { data } = await axiosInstance.get("/location");
  return data;
};

export const postLocation = async (name, country) => {
  const { data } = await axiosInstance.post("/location", { name, country });
  return data;
};

export const deleteLocation = async (id) => {
  const { data } = await axiosInstance.delete(`/location/${id}`);
  return data;
};

export const getBreastCup = async () => {
  const { data } = await axiosInstance.get("/breastCup");
  return data;
};

export const postBreastCup = async (name) => {
  const { data } = await axiosInstance.post("/breastCup", { name });
  return data;
};

export const deleteBreastCup = async (id) => {
  const { data } = await axiosInstance.delete(`/breastCup/${id}`);
  return data;
};

export const saveHotel = async (formData) => {
  const { data } = await axiosInstance.post("/hotels", formData);
  return data;
};

export const getHotel = async () => {
  const { data } = await axiosInstance.get("/hotels");
  return data;
};

export const getHotelById = async (id) => {
  const { data } = await axiosInstance.get(`/hotels/${id}`);
  return data;
};

export const updateHotel = async (formData) => {
  const { data } = await axiosInstance.put("/hotels", formData);
  return data;
};

export const deleteHotel = async (id) => {
  const { data } = await axiosInstance.delete(`/hotels?id=${id}`);
  return data;
};

export const savePackage = async (formData) => {
  const { data } = await axiosInstance.post("/package", formData);
  return data;
};

export const getPackage = async () => {
  const { data } = await axiosInstance.get("/package");
  return data;
};

export const updatePackage = async (formData) => {
  const { data } = await axiosInstance.put("/package", formData);
  return data;
};

export const deletePackage = async (id) => {
  const { data } = await axiosInstance.delete(`/package?id=${id}`);
  return data;
};
