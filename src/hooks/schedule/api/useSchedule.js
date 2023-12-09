import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  createSchedule,
  getCastSchedule,
  getSchedule,
  updateSchedule,
} from "../../../api/schedule/schedule";
import { useTranslation } from "react-i18next";

export const useGetSchedule = () => {
  return useQuery(["getSchedule"], () => getSchedule(), {
    cacheTime: 0,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetCastSchedule = (id, date, search) => {
  return useQuery(["getCastSchedule"], () => getCastSchedule(id, date), {
    cacheTime: 0,
    enabled: id !== "" && search,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const usePostSchedule = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["postSchedule"], (value) => createSchedule(value), {
    onSuccess: (data, variables, context) => {
      toast.success(t("successSchedule"));
      queryClient?.invalidateQueries(["getSchedule"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("failSchedule"));
    },
  });
};

export const useUpdateSchedule = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["updateSchedule"], (value) => updateSchedule(value), {
    onSuccess: (data, variables, context) => {
      toast.success(t("updateSchedule"));
      queryClient?.invalidateQueries(["getSchedule"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("notUpdateSchedule"));
    },
  });
};
