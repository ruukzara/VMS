import { axiosInstance } from "../axiosInterceptor";

export const getAllAttendance = async (date, userid) => {
  const { data } = await axiosInstance.get(
    `/attendance?date=${date}&userid=${userid}`
  );
  return data;
};

export const getAllAttendanceAssignedToManager = async (date, userid) => {
  const { data } = await axiosInstance.get(
    `/subadminattendance?date=${date}&userid=${userid}`
  );
  return data;
};

export const getAttendanceDetail = async (id) => {
  const { data } = await axiosInstance.get(`/attendance/${id}`);
  return data;
};

export const getAllUserAttendance = async () => {
  const { data } = await axiosInstance.get("/userattendance");
  return data;
};

export const clockInAttendance = async (value) => {
  const { data } = await axiosInstance.post("/attendance", value);
  return data;
};

export const clockOutAttendance = async (value) => {
  const { data } = await axiosInstance.put(
    `/attendance?id=${value?.id}`,
    value
  );
  return data;
};

export const checkClockIn = async (date) => {
  const { data } = await axiosInstance.get(`/checkAttendance?date=${date}`);
  return data;
};

export const checkLeave = async (date) => {
  const { data } = await axiosInstance.get(`/checkLeave?date=${date}`);
  return data;
};

export const getAllLeaveRequest = async (id) => {
  const { data } = await axiosInstance.get(`/leave?id=${id}`);
  return data;
};

export const getAssignCastLeaveRequest = async (id) => {
  const { data } = await axiosInstance.get(`/subadminleave?id=${id}`);
  return data;
};

export const getAllUserLeaveRequest = async ({ id, type }) => {
  const { data } = await axiosInstance.get(`/userleave?id=${id}&type=${type}`);
  return data;
};

export const createLeaveRequest = async (value) => {
  const { data } = await axiosInstance.post(`/leave`, value);
  return data;
};

export const cancelLeave = async (id) => {
  const { data } = await axiosInstance.delete(`/leave?id=${id}`);
  return data;
};

export const updateLeaveRequest = async (value) => {
  const { data } = await axiosInstance.put("/leave", value);
  return data;
};

export const updateLeaveRequestBySubAdmin = async (value) => {
  const { data } = await axiosInstance.put("/subadminleave", value);
  return data;
};

export const getLeaveStatus = async () => {
  const { data } = await axiosInstance.get("/leavestatus");
  return data;
};
