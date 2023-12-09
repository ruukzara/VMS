import { useQuery } from "react-query";
import {
  getAllCastBooking,
  getAllNewBooking,
  getAllNewUser,
  getCastBooking,
  getCastListBooking,
  getCastShift,
  getUnassignedCast,
} from "../../../api/dashboard/dashboard";

export const useGetAllNewUser = (date) => {
  return useQuery(["getAllNewUser"], () => getAllNewUser(date), {
    cacheTime: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetAllNewBooking = (date) => {
  return useQuery(["getAllNewBooking"], () => getAllNewBooking(date), {
    cacheTime: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useCastBooking = (date) => {
  return useQuery(["getCastBooking"], () => getCastBooking(date), {
    cacheTime: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetUnassignedCast = (enabled) => {
  return useQuery(["getUnassignedCast"], () => getUnassignedCast(), {
    cacheTime: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    enabled:enabled
  });
};

export const useCastListBooking = () => {
  return useQuery(["getCastListBooking"], () => getCastListBooking(), {
    cacheTime: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useAllCastBooking = () => {
  return useQuery(["getAllCastBooking"], () => getAllCastBooking(), {
    cacheTime: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetCastShift = (date, id) => {
  return useQuery(["getCastshit"], () => getCastShift({ date, id }), {
    cacheTime: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
