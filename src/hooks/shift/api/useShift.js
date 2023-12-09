import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createCastShift,
  createDriverShift,
  getAllCast,
  getCastShift,
  getDriverShift,
  getSubAdminCastShift,
  rejectDriverShift,
  updateDriverShift,
} from "../../../api/shift/shift";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetAllShift = (id, date) => {
  return useQuery(["getShift"], () => getCastShift(id, date), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetSubAdminCastShift = (id, date) => {
  return useQuery(["getSubAdminCastShift"], () => getSubAdminCastShift(id, date), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetDriverShift = () => {
  return useQuery(["getDriverShift"], () => getDriverShift(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetAllCast = () => {
  return useQuery(["getAllCast"], () => getAllCast(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useCreateShift = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["createShift"], (formData) => createCastShift(formData), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getShift"]);
      queryClient.invalidateQueries(["getSubAdminCastShift"]);
      toast.success(t("successcreateshift"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t(err.response.data.message) || t("couldnotcreateshift"));
    },
  });
};

export const useCreateDriverShift = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["createDriverShift"], (formData) => createDriverShift(formData), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getDriverShift"]);
      toast.success(t("successcreateshift"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t(err.response.data.message) || t("couldnotcreateshift"));
    },
  });
};

export const useUpdateDriverShift = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["updateDriverShift"], (formData) => updateDriverShift(formData), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getDriverShift"]);
      toast.success(t("updateDriverShift"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t(err.response.data.message) || t("couldnotcreateshift"));
    },
  });
};

export const useRejectShift = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["rejectDriverShift"], (formData) => rejectDriverShift(formData), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getDriverShift"]);
      toast.success(t("rejectShift"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      console.log(err)
      toast.error(t(err.response.data.message) || t("couldnotcreateshift"));
    },
  });
};
