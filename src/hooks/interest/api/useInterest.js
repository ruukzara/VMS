import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  addInterest,
  createInterest,
  getAllInterest,
  removeInterest,
  updateInterest,
} from "../../../api/interest/interest";
import { useTranslation } from "react-i18next";

export const useGetAllInterest = () => {
  return useQuery(["getAllInterest"], () => getAllInterest(), {
    cacheTime: 0,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateInterest = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["createInterest"], (formData) => createInterest(formData), {
    onSuccess: (data, variables, context) => {
      toast.success(t("Successfullyaddedinterest"));
      queryClient?.invalidateQueries(["getAllInterest"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotaddinterest"));
    },
  });
};

export const useRemoveInterest = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["removeInterest"], (id) => removeInterest(id), {
    onSuccess: (data, variables, context) => {
      toast.success(t("deleteInterest"));
      queryClient?.invalidateQueries(["getAllInterest"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("couldnotdeleteinterest"));
    },
  });
};


export const useAddInterest = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["addInterest"], (array) => addInterest(array), {
    onSuccess: (data, variables, context) => {
      toast.success(t("Successfullyaddedinterest"));
      queryClient?.invalidateQueries(["getUserDetail"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotaddinterest"));
    },
  });
};

export const useUpdateInterest = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["updateInterest"], (array) => updateInterest(array), {
    onSuccess: (data, variables, context) => {
      toast.success(t("Successfullyupdatedinterest"));
      queryClient?.invalidateQueries(["getUserDetail"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotupdateinterest"));
    },
  });
};
