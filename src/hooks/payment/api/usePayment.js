import { useQuery } from "react-query";
import { getPayment, getTodayPayment } from "../../../api/payment/payment";

export const useGetTodayPayment = (date, enabled) => {
  return useQuery(["getTodayPayment"], () => getTodayPayment(date), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: enabled,
  });
};

export const useGetPayment = (startdate, enddate) => {
  return useQuery(["getPayment"], () => getPayment(startdate, enddate), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
