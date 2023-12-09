import { axiosInstance } from "../axiosInterceptor";

export const getSchedule = async () => {
  const { data } = await axiosInstance.get("/schedule");
  return data;
};

export const getCastSchedule = async (id, date) => {
  const { data } = await axiosInstance.get(
    `/castschedule?id=${id}&date=${date}`
  );
  return data;
};

export const createSchedule = async (value) => {
  console.log({ value });
  const { data } = await axiosInstance.post("/schedule", value);
  return data;
};

export const updateSchedule = async (value) => {
  const { data } = await axiosInstance.put(`/schedule?id=${value?.id}`, value);
  return data;
};
