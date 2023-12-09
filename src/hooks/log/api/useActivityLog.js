import { useQuery } from "react-query";
import { getActivityLog } from "../../../api/log/activitylog";

export const useGetActivityLog = () => {
  return useQuery(["getActivityLog"], () => getActivityLog(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
