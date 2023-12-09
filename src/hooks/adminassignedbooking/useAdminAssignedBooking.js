import { useQuery } from "react-query";
import { getAllAssignedBooking } from "../../api/assignedBooking/assignedBooking";

export const useAllGetAssignedBooking = (date) => {
  return useQuery(
    ["getAllAssignedBooking"],
    () => getAllAssignedBooking(date),
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
};
