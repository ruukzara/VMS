import { useQuery } from "react-query";
import { getUserType } from "../../api/userType";

export const useGetUserType = () => {
  return useQuery(["getUserType"], () => getUserType(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
