import Axios from "axios";
import { getUser, removeUser } from "../utils/cookieHelper";

export const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 200000,
});

//add token to all request
axiosInstance.interceptors.request.use(
  function (config) {
    const { token } = getUser();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (
      (error.response &&
        error.response.data.message === "Not authorized, no token provided") ||
      (error.response &&
        error.response.data.message ===
          "No token provided, verification failed")
    ) {
      removeUser();
      localStorage.setItem("axiosError","unauthorizedAccess");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
