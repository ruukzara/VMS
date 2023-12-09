import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getNotification,
  getNotificationRead,
  markAllAsRead,
  markAsRead,
} from "../../api/notification/notification";

export const useGetNotification = () => {
  return useQuery(["getNotification"], () => getNotification(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetOldNotification = () => {
  return useQuery(["getOldNotification"], () => getNotificationRead(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useMarkAllAsRead = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["markAllAsRead"], () => markAllAsRead(), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getNotification"]);
      queryClient.invalidateQueries(["getOldNotification"]);
      onSuccess && onSuccess(data, variables, context);
    },
  });
};

export const useMarkAsRead = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation(["markAsRead"], (id) => markAsRead(id), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getNotification"]);
      queryClient.invalidateQueries(["getOldNotification"]);
      onSuccess && onSuccess(data, variables, context);
    },
  });
};
